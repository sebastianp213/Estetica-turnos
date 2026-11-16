
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <span className="brand-icon">✿</span>
          <span>Estética <strong>Turnos</strong></span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/tratamientos">Tratamientos</NavLink>
          <NavLink to="/profesionales">Profesionales</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="register-button">
            Registrarme
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
