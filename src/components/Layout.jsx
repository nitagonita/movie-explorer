import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

export default function Layout() {
  return (
    <div className="app">
      <NavBar />
      <main className="container" aria-live="polite">
        <Outlet />
      </main>
      <footer className="footer">© {new Date().getFullYear()} Movie Explorer</footer>
    </div>
  )
}
