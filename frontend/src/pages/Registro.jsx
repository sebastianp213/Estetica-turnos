
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../services/authService'

function Registro() {
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
  })

  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }))
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError('')
    setMensaje('')

    if (formulario.password !== formulario.confirmarPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formulario.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    try {
      setCargando(true)

      await registrarUsuario({
        nombre: formulario.nombre,
        email: formulario.email,
        password: formulario.password,
      })

      setMensaje('Cuenta creada correctamente. Ahora podés iniciar sesión.')

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error) {
      setError(error.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="eyebrow">CREÁ TU CUENTA</span>
        <h1>Registrarse</h1>
        <p>Completá tus datos para comenzar a reservar turnos.</p>

        <form onSubmit={manejarEnvio} className="auth-form">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formulario.nombre}
            onChange={manejarCambio}
            maxLength={100}
            autoComplete="name"
            required
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formulario.email}
            onChange={manejarCambio}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formulario.password}
            onChange={manejarCambio}
            minLength={8}
            autoComplete="new-password"
            required
          />

          <label htmlFor="confirmarPassword">Confirmar contraseña</label>
          <input
            id="confirmarPassword"
            name="confirmarPassword"
            type="password"
            value={formulario.confirmarPassword}
            onChange={manejarCambio}
            autoComplete="new-password"
            required
          />

          {error && <p className="form-error" role="alert">{error}</p>}
          {mensaje && <p className="form-success" role="status">{mensaje}</p>}

          <button type="submit" className="primary-button" disabled={cargando}>
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-alternative">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </section>
    </main>
  )
}

export default Registro
