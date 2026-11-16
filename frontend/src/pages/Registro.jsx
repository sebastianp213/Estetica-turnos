
import { Link } from 'react-router-dom'

function Registro() {
  return (
    <main className="simple-page">
      <span className="eyebrow">CREÁ TU CUENTA</span>
      <h1>Registrarse</h1>
      <p>Creá tu cuenta para comenzar a reservar turnos.</p>
      <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
    </main>
  )
}

export default Registro
