import { useContext } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { GuardedRoute } from "./components/GuardedRoute"

import { Header } from "./components/Header"
import { Nav } from './components/Nav'
import { AuthContext } from "./context/AuthContext"
import { About } from "./views/About"
import { Hashtags } from "./views/Hashtags"
import { Home } from "./views/Home"
import { Login } from "./views/Login"
import { Posts } from "./views/Posts"

function App() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <div className="App">
      <Router>
        <Header />
        <Nav />
        <main className="content container">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="posts/*" element={ <Posts /> } />
            <Route path="hashtags/*" element={ <Hashtags /> } />
            <Route path="about" element={ <About /> } />
            <Route path="login" element={
              <GuardedRoute auth={!loggedIn} redirectTo={'/'}>
                <Login />
              </GuardedRoute>
            } />
            <Route path="*" element={<div>404</div>}/>
          </Routes>
        </main>
      </Router>
    </div>
  )
}



export default App