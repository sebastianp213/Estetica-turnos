
import { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { obtenerReservas, completarReserva } from '../services/reservaService'

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
}

function formatearHora(fecha) {
  return new Date(fecha).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Argentina/Buenos_Aires',
  })
}

function PanelProfesional() {
  const { usuario, autenticado, token, cargando } = useAuth()

  const [reservas, setReservas] = useState([])
  const [cargandoReservas, setCargandoReservas] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [completandoId, setCompletandoId] = useState(null)

  useEffect(() => {
    if (cargando || !autenticado || usuario?.rol !== 'PROFESIONAL') {
      return
    }

    let cancelado = false

    async function cargarReservas() {
      setCargandoReservas(true)
      setError('')

      try {
        const respuesta = await obtenerReservas(token)

        if (!cancelado) {
          setReservas(respuesta.reservas)
        }
      } catch (error) {
        if (!cancelado) {
          setError(error.message)
        }
      } finally {
        if (!cancelado) {
          setCargandoReservas(false)
        }
      }
    }

    cargarReservas()

    return () => {
      cancelado = true
    }
  }, [cargando, autenticado, usuario?.rol, token])

  async function manejarCompletado(reservaId) {
    setError('')
    setMensaje('')
    setCompletandoId(reservaId)

    try {
      await completarReserva(reservaId, token)

      setReservas((actuales) =>
        actuales.map((reserva) =>
          reserva.id === reservaId
            ? { ...reserva, estado: 'COMPLETADO' }
            : reserva
        )
      )

      setMensaje('El turno se marcó como completado correctamente.')
    } catch (error) {
      setError(error.message)
    } finally {
      setCompletandoId(null)
    }
  }

  if (cargando) {
    return <main className="simple-page">Cargando agenda...</main>
  }

  if (!autenticado || usuario?.rol !== 'PROFESIONAL') {
    return (
      <main className="simple-page">
        <h1>Panel profesional</h1>
        <p>Esta sección está disponible para profesionales.</p>
      </main>
    )
  }

  if (cargandoReservas) {
    return <main className="simple-page">Cargando agenda...</main>
  }

  const confirmadas = reservas.filter(
    (reserva) => reserva.estado === 'CONFIRMADO'
  ).length

  const completadas = reservas.filter(
    (reserva) => reserva.estado === 'COMPLETADO'
  ).length

  return (
    <main className="professional-page">
      <header className="professional-header">
        <span className="eyebrow">GESTIÓN DE TURNOS</span>
        <h1>Mi agenda</h1>
        <p>
          Bienvenido/a, {usuario.nombre}. Aquí podés consultar tus turnos.
        </p>
      </header>

      <section className="professional-stats">
        <article>
          <strong>{reservas.length}</strong>
          <span>Turnos en total</span>
        </article>

        <article>
          <strong>{confirmadas}</strong>
          <span>Confirmados</span>
        </article>

        <article>
          <strong>{completadas}</strong>
          <span>Completados</span>
        </article>
      </section>

      {error && <p className="form-error">{error}</p>}
      {mensaje && <p className="form-success">{mensaje}</p>}

      <section className="professional-bookings">
        <h2>Mis turnos</h2>

        {reservas.length === 0 ? (
          <div className="empty-bookings">
            <span>✿</span>
            <h2>No tenés turnos asignados</h2>
            <p>Cuando tengas reservas, aparecerán en esta sección.</p>
          </div>
        ) : (
          <div className="bookings-list">
            {reservas.map((reserva) => (
              <article className="booking-history-card" key={reserva.id}>
                <div className="booking-history-top">
                  <div>
                    <span className="booking-number">
                      RESERVA N.º {reserva.id}
                    </span>
                    <h2>{reserva.tratamiento.nombre}</h2>
                  </div>

                  <span
                    className={`booking-status status-${reserva.estado.toLowerCase()}`}
                  >
                    {reserva.estado}
                  </span>
                </div>

                <p className="booking-professional">
                  Cliente: {reserva.cliente.nombre}
                </p>

                <div className="booking-history-details">
                  <div>
                    <strong>Fecha</strong>
                    <span>{formatearFecha(reserva.inicio)}</span>
                  </div>

                  <div>
                    <strong>Horario</strong>
                    <span>
                      {formatearHora(reserva.inicio)} a{' '}
                      {formatearHora(reserva.fin)}
                    </span>
                  </div>

                  <div>
                    <strong>Duración</strong>
                    <span>{reserva.tratamiento.duracionMinutos} minutos</span>
                  </div>

                  <div>
                    <strong>Precio</strong>
                    <span>
                      ${Number(reserva.precioAplicado).toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>

                {reserva.estado === 'CONFIRMADO' && (
                  <button
                    type="button"
                    className="complete-booking-button"
                    onClick={() => manejarCompletado(reserva.id)}
                    disabled={completandoId === reserva.id}
                  >
                    {completandoId === reserva.id
                      ? 'Completando...'
                      : 'Marcar como completado'}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default PanelProfesional
