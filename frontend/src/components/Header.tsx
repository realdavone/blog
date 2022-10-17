import './Header.scss'

import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header className=''>
      <Link className='brand' to="/">BlogTest</Link>
    </header>
  )
}
