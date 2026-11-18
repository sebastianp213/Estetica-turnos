
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { obtenerTratamientos } from '../services/tratamientoService'
import {
  obtenerProfesionales,
  obtenerDisponibilidad,
  crearReserva,
} from '../services/reservaService'

function obtenerFechaLocal(fecha) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')

  return `${anio}-${mes}-${dia}`
}

// Fechas calculadas fuera del componente.
const hoy = obtenerFechaLocal(new Date())

const maximo = obtenerFechaLocal(
  new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
)

function Reservas() {
  const { usuario, autenticado, token, cargando } = useAuth()
  const navigate = useNavigate()

  const [tratamientos, setTratamientos] = useState([])
  const [profesionales, setProfesionales] = useState([])
  const [tratamientoId, setTratamientoId] = useState('')
  const [profesionalId, setProfesionalId] = useState('')
  const [fecha, setFecha] = useState('')
  const [horarios, setHorarios] = useState([])
  const [horaInicio, setHoraInicio] = useState('')

  const [cargandoDatos, setCargandoDatos] = useState(true)
  const [consultando, setConsultando] = useState(false)
  const [guardando, setGuardando] = useState(false)

  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  // Redirigir si no inició sesión.
  useEffect(() => {
    if (!cargando && !autenticado) {
      navigate('/login')
    }
  }, [cargando, autenticado, navigate])

  // Cargar tratamientos y profesionales.
  useEffect(() => {
    async function cargarDatos() {
      try {
        const [listaTratamientos, listaProfesionales] = await Promise.all([
          obtenerTratamientos(),
          obtenerProfesionales(),
        ])

        setTratamientos(listaTratamientos)
        setProfesionales(listaProfesionales)
      } catch (error) {
        setError(error.message)
      } finally {
        setCargandoDatos(false)
      }
    }

    cargarDatos()
  }, [])

  // Filtrar profesionales habilitados para el tratamiento.
  const profesionalesDisponibles = profesionales.filter((profesional) =>
    profesional.tratamientos?.some(
      (asociacion) =>
        Number(asociacion.tratamientoId) === Number(tratamientoId)
    )
  )

  // Cambiar tratamiento.
  function cambiarTratamiento(valor) {
    setTratamientoId(valor)
    setProfesionalId('')
    setFecha('')
    setHorarios([])
    setHoraInicio('')
    setError('')
    setExito('')
  }

  // Cambiar profesional.
  function cambiarProfesional(valor) {
    setProfesionalId(valor)
    setFecha('')
    setHorarios([])
    setHoraInicio('')
    setError('')
    setExito('')
  }

  // Consultar disponibilidad.
  async function consultarHorarios() {
    if (!tratamientoId || !profesionalId || !fecha) return

    setConsultando(true)
    setError('')
    setExito('')
    setHorarios([])
    setHoraInicio('')

    try {
      const respuesta = await obtenerDisponibilidad(
        profesionalId,
        tratamientoId,
        fecha
      )

      setHorarios(respuesta.horariosDisponibles)
    } catch (error) {
      setError(error.message)
    } finally {
      setConsultando(false)
    }
  }

  // Confirmar reserva.
  async function confirmarReserva(evento) {
    evento.preventDefault()

    if (!horaInicio) return

    setError('')
    setExito('')
    setGuardando(true)

    try {
      const respuesta = await crearReserva(
        {
          profesionalId: Number(profesionalId),
          tratamientoId: Number(tratamientoId),
          fecha,
          horaInicio,
        },
        token
      )

      setExito(
        `¡Turno confirmado! Tu reserva es la número ${respuesta.reserva.id}.`
      )

      setHorarios([])
      setHoraInicio('')
      setFecha('')
      setProfesionalId('')
      setTratamientoId('')
    } catch (error) {
      setError(error.message)
    } finally {
      setGuardando(false)
    }
  }

  if (cargando || cargandoDatos) {
    return <main className="simple-page">Cargando...</main>
  }

  if (!autenticado) {
    return null
  }

  if (usuario.rol !== 'CLIENTE') {
    return (
      <main className="simple-page">
        <h1>Reservas</h1>
        <p>Esta sección está disponible para clientes.</p>
      </main>
    )
  }

  return (
    <main className="booking-page">
      <header className="booking-header">
        <span className="eyebrow">TU MOMENTO DE BIENESTAR</span>

        <h1>Reservá tu turno</h1>

        <p>
          Elegí el tratamiento, profesional, fecha y horario que prefieras.
        </p>
      </header>

      <form className="booking-card" onSubmit={confirmarReserva}>
        <div className="booking-field">
          <label htmlFor="tratamiento">1. Tratamiento</label>

          <select
            id="tratamiento"
            value={tratamientoId}
            onChange={(e) => cambiarTratamiento(e.target.value)}
            required
          >
            <option value="">Seleccioná un tratamiento</option>

            {tratamientos.map((tratamiento) => (
              <option key={tratamiento.id} value={tratamiento.id}>
                {tratamiento.nombre} — $
                {Number(tratamiento.precio).toLocaleString('es-AR')}
                {' '}({tratamiento.duracionMinutos} min)
              </option>
            ))}
          </select>
        </div>

        <div className="booking-field">
          <label htmlFor="profesional">2. Profesional</label>

          <select
            id="profesional"
            value={profesionalId}
            onChange={(e) => cambiarProfesional(e.target.value)}
            disabled={!tratamientoId}
            required
          >
            <option value="">Seleccioná un profesional</option>

            {profesionalesDisponibles.map((profesional) => (
              <option key={profesional.id} value={profesional.id}>
                {profesional.usuario.nombre}
              </option>
            ))}
          </select>

          {tratamientoId && profesionalesDisponibles.length === 0 && (
            <small>
              No hay profesionales habilitados para este tratamiento.
            </small>
          )}
        </div>

        <div className="booking-field">
          <label htmlFor="fecha">3. Fecha</label>

          <input
            id="fecha"
            type="date"
            value={fecha}
            min={hoy}
            max={maximo}
            onChange={(e) => {
              setFecha(e.target.value)
              setHorarios([])
              setHoraInicio('')
              setError('')
              setExito('')
            }}
            disabled={!profesionalId}
            required
          />
        </div>

        <button
          type="button"
          className="primary-button booking-search"
          onClick={consultarHorarios}
          disabled={
            !tratamientoId ||
            !profesionalId ||
            !fecha ||
            consultando
          }
        >
          {consultando
            ? 'Consultando...'
            : 'Consultar horarios disponibles'}
        </button>

        {horarios.length > 0 && (
          <div className="booking-field">
            <label>4. Elegí un horario</label>

            <div className="time-slots">
              {horarios.map((horario) => (
                <button
                  key={horario.horaInicio}
                  type="button"
                  className={`time-slot ${
                    horaInicio === horario.horaInicio ? 'selected' : ''
                  }`}
                  onClick={() => setHoraInicio(horario.horaInicio)}
                >
                  {horario.horaInicio}
                </button>
              ))}
            </div>
          </div>
        )}

        {horarios.length === 0 &&
          fecha &&
          profesionalId &&
          !consultando && (
            <p className="booking-note">
              Consultá los horarios disponibles para esta fecha.
            </p>
          )}

        {error && <p className="form-error">{error}</p>}

        {exito && (
          <p className="form-success">
            {exito}
            <br />
            <Link to="/mis-reservas">Ver mis reservas</Link>
          </p>
        )}

        <button
          type="submit"
          className="primary-button booking-confirm"
          disabled={!horaInicio || guardando}
        >
          {guardando ? 'Confirmando...' : 'Confirmar reserva'}
        </button>
      </form>
    </main>
  )
}

export default Reservas
