
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError('')

    try {
      setCargando(true)

      await login(email, password)

      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="eyebrow">BIENVENIDO/A</span>
        <h1>Iniciar sesión</h1>
        <p>Ingresá a tu cuenta para gestionar tus turnos.</p>

        <form onSubmit={manejarEnvio} className="auth-form">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="primary-button" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="auth-alternative">
          ¿Todavía no tenés cuenta? <Link to="/registro">Registrate aquí</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
