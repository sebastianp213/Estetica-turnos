
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { usuario, autenticado, logout } = useAuth()
  const navigate = useNavigate()

  function cerrarSesion() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <span className="brand-icon">✿</span>
          <span>
            Estética <strong>Turnos</strong>
          </span>
        </Link>

        <div className="nav-links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/tratamientos">Tratamientos</NavLink>
          <NavLink to="/profesionales">Profesionales</NavLink>

          {autenticado && usuario?.rol === 'CLIENTE' && (
            <>
              <NavLink to="/reservar">Reservar</NavLink>
              <NavLink to="/mis-reservas">Mis reservas</NavLink>
            </>
          )}

          {autenticado && usuario?.rol === 'PROFESIONAL' && (
            <NavLink to="/panel-profesional">Mi agenda</NavLink>
          )}
        </div>

        <div className="nav-actions">
          {autenticado ? (
            <>
              <span className="user-greeting">
                Hola, {usuario.nombre}
              </span>

              <button
                type="button"
                className="register-button logout-button"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="login-link">
                Iniciar sesión
              </NavLink>

              <Link to="/registro" className="register-button">
                Registrarme
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
