import { createContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserLogin } from '../views/Login'

type User = {
  email: string | null,
  id: string | null
}

interface AuthContextInferface {
  user: User | null,
  loggedIn: boolean,
  login: (user: UserLogin) => void,
  logout: () => void,
  loginError: string | null
}

interface LoginResponse {
  success: boolean,
  user: User,
  message?: string
}

interface LogoutResponse {
  success: boolean,
  message?: string
}

const INITIAL_USER: User = {
  email: null,
  id: null
}

const INITIAL_CONTEXT: AuthContextInferface = {
  user: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
  loginError: null
}

const getSavedUser = (): User | null => {
  let result
  try {
    result = JSON.parse(localStorage.getItem('user') || '')
  } catch (error) {
    result = null
  }
  return (result !== '' ? result : null)
}

export const AuthContext = createContext<AuthContextInferface>(INITIAL_CONTEXT)

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(getSavedUser())
  const [loggedIn, setLoggedIn] = useState(user === null ? false : true)
  const [loginError, setLoginError] = useState<string | null>(null)

  const login = (user: UserLogin): void => {

    const request = new Request(`${import.meta.env['VITE_API_BASE_URL']}auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)      
    })

    fetch(request)
    .then(res => res.json())
    .then(({ success, user, message }: LoginResponse) => {
      if(success){
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        setLoggedIn(true)
        setLoginError(null)
        return <Navigate to="/"></Navigate>
      }
      else throw(message)
    })
    .catch(error => setLoginError(error))
  }
  const logout = (): void => {
    const request = new Request(`${import.meta.env['VITE_API_BASE_URL']}auth/logout`, {
      method: 'POST', credentials: 'include'
    })
    fetch(request)
    .then(res => res.json())
    .then(({ success, message }: LogoutResponse) => {
      if(success){
        setUser(INITIAL_USER)
        setLoggedIn(false)
        localStorage.removeItem('user')
        return <Navigate to="/"></Navigate>
      }
      else throw(message)
    })
    .catch(error => alert(error))
  }

  return ( 
    <AuthContext.Provider value={{ user, loggedIn, login, logout, loginError }}>
      { children }
    </AuthContext.Provider>
  )
}