import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const nav = useNavigate()
  return (
    <nav className="nav">
      <div className="container nav-row">
        <button className="logo" onClick={()=>nav('/')}>🎬 Movie Explorer</button>

        <ul className="menu">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/search">Search</NavLink></li>
          <li><NavLink to="/favourites">Favourites</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
