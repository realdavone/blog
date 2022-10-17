import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export type UserLogin = {
  email: string,
  password: string
}

import './Login.scss'

export const Login = () => {
  const [user, setUser] = useState<UserLogin>({ email: '', password: '' })
  const { login, loginError } = useContext(AuthContext)

  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      login(user)      
    } catch (error) {
      console.log(error) 
    }
  }

  return (
    <main className="login">
      <h1>Login</h1>
      <form onSubmit={submitLogin}>
        <input type="email" placeholder="Email" name="email" onChange={setProperty} required autoComplete="email"/>
        <input type="password" placeholder="Heslo" name="password" onChange={setProperty} required autoComplete="current-password"/>
        {loginError && <span className="login-error">{loginError}</span>}
        <button type="submit">Login</button>
      </form>
    </main>
  )
}
