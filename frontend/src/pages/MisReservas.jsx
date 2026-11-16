
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  obtenerReservas,
  cancelarReserva,
} from '../services/reservaService'

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

function formatearPrecio(precio) {
  return Number(precio).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })
}

function puedeCancelar(reserva) {
  const horasRestantes =
    (new Date(reserva.inicio).getTime() - Date.now()) /
    (60 * 60 * 1000)

  return reserva.estado === 'CONFIRMADO' && horasRestantes >= 24
}

function MisReservas() {
  const { usuario, autenticado, token, cargando } = useAuth()
  const navigate = useNavigate()

  const [reservas, setReservas] = useState([])
  const [cargandoReservas, setCargandoReservas] = useState(true)
  const [error, setError] = useState('')
  const [cancelandoId, setCancelandoId] = useState(null)

  useEffect(() => {
    if (!cargando && !autenticado) {
      navigate('/login')
    }
  }, [cargando, autenticado, navigate])

  useEffect(() => {
    if (cargando || !autenticado || usuario?.rol !== 'CLIENTE') {
      return
    }

    async function cargarReservas() {
      try {
        const respuesta = await obtenerReservas(token)
        setReservas(respuesta.reservas)
      } catch (error) {
        setError(error.message)
      } finally {
        setCargandoReservas(false)
      }
    }

    cargarReservas()
  }, [cargando, autenticado, usuario, token])

  async function manejarCancelacion(reservaId) {
    const confirmar = window.confirm(
      '¿Estás seguro de que querés cancelar este turno?'
    )

    if (!confirmar) return

    setError('')
    setCancelandoId(reservaId)

    try {
      await cancelarReserva(reservaId, token)

      setReservas((reservasActuales) =>
        reservasActuales.map((reserva) =>
          reserva.id === reservaId
            ? { ...reserva, estado: 'CANCELADO' }
            : reserva
        )
      )
    } catch (error) {
      setError(error.message)
    } finally {
      setCancelandoId(null)
    }
  }

  if (cargando || cargandoReservas) {
    return <main className="simple-page">Cargando reservas...</main>
  }

  if (!autenticado) {
    return null
  }

  if (usuario.rol !== 'CLIENTE') {
    return (
      <main className="simple-page">
        <h1>Mis reservas</h1>
        <p>Esta sección está disponible para clientes.</p>
      </main>
    )
  }

  return (
    <main className="my-bookings-page">
      <header className="my-bookings-header">
        <span className="eyebrow">TU HISTORIAL</span>
        <h1>Mis reservas</h1>
        <p>Consultá y administrá tus turnos.</p>
        <Link to="/reservar" className="primary-button">
          Reservar un nuevo turno
        </Link>
      </header>

      {error && <p className="form-error">{error}</p>}

      {reservas.length === 0 ? (
        <section className="empty-bookings">
          <span>✿</span>
          <h2>Todavía no tenés reservas</h2>
          <p>Cuando reserves un turno, aparecerá en esta sección.</p>
          <Link to="/reservar">Reservar ahora</Link>
        </section>
      ) : (
        <section className="bookings-list">
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
                Profesional: {reserva.profesional.usuario.nombre}
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
                  <span>{formatearPrecio(reserva.precioAplicado)}</span>
                </div>
              </div>

              {puedeCancelar(reserva) && (
                <button
                  type="button"
                  className="cancel-booking-button"
                  onClick={() => manejarCancelacion(reserva.id)}
                  disabled={cancelandoId === reserva.id}
                >
                  {cancelandoId === reserva.id
                    ? 'Cancelando...'
                    : 'Cancelar turno'}
                </button>
              )}

              {reserva.estado === 'CONFIRMADO' &&
                !puedeCancelar(reserva) && (
                  <p className="booking-cancel-note">
                    Para cancelar este turno debés hacerlo con al menos
                    24 horas de anticipación.
                  </p>
                )}
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default MisReservas
