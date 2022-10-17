import { useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Nav.scss'

export const Nav = () => {
  const { loggedIn, user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <nav>
      <div className="container">
        <div className="left">
          <NavLink to="/" end>
            <span>&#8962;</span>
            <span>Domov</span>
          </NavLink>
          <NavLink to="/hashtags">
            <span>&#35;</span>
            <span>Hastagy</span>
          </NavLink>
          <NavLink to="/about">
            <span>&#35;</span>
            <span>O mne</span>
          </NavLink>
        </div>
        <div className="right">
          {loggedIn
          ?
          <>
          <span className='user-mail'>{user?.email}</span>
          <button className='add' onClick={() => navigate('/posts/new')}>+</button>
          <button className='logout' onClick={logout}>logout</button>
          </>
          :
          <button className='login' onClick={() => navigate('/login')}>Login</button>}
        </div>
      </div>
    </nav>
  )
}
