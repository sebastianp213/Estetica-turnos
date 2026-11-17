
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Inicio() {
  const { usuario, autenticado } = useAuth()

  function obtenerDestino() {
    if (!autenticado) return '/login'
    if (usuario?.rol === 'CLIENTE') return '/reservar'
    if (usuario?.rol === 'PROFESIONAL') return '/panel-profesional'
    if (usuario?.rol === 'ADMIN') return '/panel-admin'

    return '/login'
  }

  function obtenerTextoBoton() {
    if (!autenticado) return 'Iniciar sesión'
    if (usuario?.rol === 'CLIENTE') return 'Reservar mi turno'
    if (usuario?.rol === 'PROFESIONAL') return 'Ir a mi agenda'
    if (usuario?.rol === 'ADMIN') return 'Ir al panel administrativo'

    return 'Iniciar sesión'
  }

  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <span className="eyebrow">
            BELLEZA · BIENESTAR · ARMONÍA
          </span>

          <h1>
            Un momento para vos.
            <span> Un espacio para renovarte.</span>
          </h1>

          <p>
            Descubrí nuestros tratamientos y encontrá el momento ideal
            para dedicarte al cuidado que merecés.
          </p>

          <div className="hero-actions">
            <Link to="/tratamientos" className="primary-button">
              Descubrir tratamientos
            </Link>

            <Link to="/profesionales" className="secondary-button">
              Conocer profesionales
            </Link>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="hero-image-placeholder">
            <span>Tu espacio de bienestar</span>
            <span className="flower-decoration">✿</span>
          </div>
        </div>
      </section>

      <section className="welcome-section">
        <span className="eyebrow">ESTÉTICA Y CUIDADO PERSONAL</span>
        <h2>Un espacio pensado para vos</h2>
        <p>
          Queremos que cada visita sea una experiencia de cuidado,
          tranquilidad y bienestar.
        </p>

        <Link to={obtenerDestino()} className="primary-button">
          {obtenerTextoBoton()}
        </Link>
      </section>

      <section className="home-cards">
        <article className="home-card">
          <span>01</span>
          <h3>Tratamientos</h3>
          <p>
            Conocé los servicios disponibles y elegí el que mejor
            se adapte a vos.
          </p>
          <Link to="/tratamientos">Ver tratamientos →</Link>
        </article>

        <article className="home-card">
          <span>02</span>
          <h3>Profesionales</h3>
          <p>
            Conocé a nuestro equipo y descubrí quién puede atenderte.
          </p>
          <Link to="/profesionales">Conocer equipo →</Link>
        </article>

        <article className="home-card">
          <span>03</span>
          <h3>Reservá tu turno</h3>
          <p>
            Elegí tu tratamiento y consultá los horarios disponibles.
          </p>
          <Link to={obtenerDestino()}>
            {obtenerTextoBoton()} →
          </Link>
        </article>
      </section>
    </main>
  )
}

export default Inicio
