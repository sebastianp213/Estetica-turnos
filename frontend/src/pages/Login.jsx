
import { Link } from 'react-router-dom'

function Login() {
  return (
    <main className="simple-page">
      <span className="eyebrow">BIENVENIDO/A</span>
      <h1>Iniciar sesión</h1>
      <p>Accedé a tu cuenta para gestionar tus turnos.</p>
      <p>¿Todavía no tenés cuenta? <Link to="/registro">Registrate aquí</Link></p>
    </main>
  )
}

export default Login
