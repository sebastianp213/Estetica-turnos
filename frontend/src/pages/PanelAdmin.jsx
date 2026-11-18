
import { useCallback, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import * as admin from '../services/adminService'
import './PanelAdmin.css'

const DIAS = [
  'LUNES',
  'MARTES',
  'MIERCOLES',
  'JUEVES',
  'VIERNES',
  'SABADO',
  'DOMINGO',
]

const PESTANAS = [
  { id: 'tratamientos', nombre: 'Tratamientos' },
  { id: 'profesionales', nombre: 'Profesionales' },
  { id: 'horarios', nombre: 'Horarios' },
  { id: 'reservas', nombre: 'Reservas' },
]

function PanelAdmin() {
  const { usuario, token, cargando: cargandoAuth } = useAuth()

  const [pestana, setPestana] = useState('tratamientos')
  const [tratamientos, setTratamientos] = useState([])
  const [profesionales, setProfesionales] = useState([])
  const [reservas, setReservas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [guardando, setGuardando] = useState(false)

  const [tratamientoEditando, setTratamientoEditando] = useState(null)
  const [profesionalEditando, setProfesionalEditando] = useState(null)
  const [profesionalHorario, setProfesionalHorario] = useState('')
  const [horarioEditando, setHorarioEditando] = useState(null)

  const [formTratamiento, setFormTratamiento] = useState({
    nombre: '',
    descripcion: '',
    duracionMinutos: '',
    precio: '',
  })

  const [formProfesional, setFormProfesional] = useState({
    nombre: '',
    email: '',
    password: '',
    descripcion: '',
  })

  const [formHorario, setFormHorario] = useState({
    diaSemana: 'LUNES',
    horaInicio: '09:00',
    horaFin: '17:00',
  })

  const cargarDatos = useCallback(async () => {
    if (!token) return

    

    try {
      const [datosTratamientos, datosProfesionales, datosReservas] =
        await Promise.all([
          admin.obtenerTratamientosAdmin(token),
          admin.obtenerProfesionalesAdmin(token),
          admin.obtenerReservasAdmin(token),
        ])

      setTratamientos(
        Array.isArray(datosTratamientos)
          ? datosTratamientos
          : datosTratamientos.tratamientos || []
      )

      setProfesionales(
        Array.isArray(datosProfesionales)
          ? datosProfesionales
          : datosProfesionales.profesionales || []
      )

      setReservas(
        Array.isArray(datosReservas)
          ? datosReservas
          : datosReservas.reservas || []
      )
    } catch (err) {
      setError(err.message || 'No se pudieron cargar los datos')
    } finally {
      setCargando(false)
    }
  }, [token])

  useEffect(() => {
  let activo = true

  async function cargarInicial() {
    if (!token) {
      setCargando(false)
      return
    }

    try {
      const [datosTratamientos, datosProfesionales, datosReservas] =
        await Promise.all([
          admin.obtenerTratamientosAdmin(token),
          admin.obtenerProfesionalesAdmin(token),
          admin.obtenerReservasAdmin(token),
        ])

      if (!activo) return

      setTratamientos(
        Array.isArray(datosTratamientos)
          ? datosTratamientos
          : datosTratamientos.tratamientos || []
      )

      setProfesionales(
        Array.isArray(datosProfesionales)
          ? datosProfesionales
          : datosProfesionales.profesionales || []
      )

      setReservas(
        Array.isArray(datosReservas)
          ? datosReservas
          : datosReservas.reservas || []
      )
    } catch (err) {
      if (activo) {
        setError(err.message || 'No se pudieron cargar los datos')
      }
    } finally {
      if (activo) {
        setCargando(false)
      }
    }
  }

  cargarInicial()

  return () => {
    activo = false
  }
}, [token])

  if (cargandoAuth) {
    return <main className="admin-page"><p>Cargando...</p></main>
  }

  if (!usuario || usuario.rol !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  function mostrarMensaje(texto) {
    setMensaje(texto)
    setError('')
  }

  function manejarError(err) {
    setError(err.message || 'Ocurrió un error')
    setMensaje('')
  }

  async function ejecutarAccion(accion, texto) {
    setGuardando(true)
    setError('')
    setMensaje('')

    try {
      await accion()
      await cargarDatos()
      mostrarMensaje(texto)
    } catch (err) {
      manejarError(err)
    } finally {
      setGuardando(false)
    }
  }

  function editarTratamiento(tratamiento) {
    setTratamientoEditando(tratamiento.id)
    setFormTratamiento({
      nombre: tratamiento.nombre || '',
      descripcion: tratamiento.descripcion || '',
      duracionMinutos: tratamiento.duracionMinutos,
      precio: tratamiento.precio,
    })
  }

  function limpiarTratamiento() {
    setTratamientoEditando(null)
    setFormTratamiento({
      nombre: '',
      descripcion: '',
      duracionMinutos: '',
      precio: '',
    })
  }

  async function guardarTratamiento(evento) {
    evento.preventDefault()

    const datos = {
      nombre: formTratamiento.nombre.trim(),
      descripcion: formTratamiento.descripcion.trim(),
      duracionMinutos: Number(formTratamiento.duracionMinutos),
      precio: Number(formTratamiento.precio),
    }

    await ejecutarAccion(async () => {
      if (tratamientoEditando) {
        await admin.modificarTratamiento(tratamientoEditando, datos, token)
      } else {
        await admin.crearTratamiento(datos, token)
      }
      limpiarTratamiento()
    }, tratamientoEditando
      ? 'Tratamiento actualizado correctamente'
      : 'Tratamiento creado correctamente')
  }

  function editarProfesional(profesional) {
    setProfesionalEditando(profesional.id)
    setFormProfesional({
      nombre: profesional.usuario?.nombre || '',
      email: profesional.usuario?.email || '',
      password: '',
      descripcion: profesional.descripcion || '',
    })
  }

  function limpiarProfesional() {
    setProfesionalEditando(null)
    setFormProfesional({
      nombre: '',
      email: '',
      password: '',
      descripcion: '',
    })
  }

  async function guardarProfesional(evento) {
    evento.preventDefault()

    const datos = {
      nombre: formProfesional.nombre.trim(),
      email: formProfesional.email.trim(),
      descripcion: formProfesional.descripcion.trim(),
    }

    if (!profesionalEditando) {
      datos.password = formProfesional.password
    }

    await ejecutarAccion(async () => {
      if (profesionalEditando) {
        await admin.modificarProfesional(profesionalEditando, datos, token)
      } else {
        await admin.crearProfesional(datos, token)
      }
      limpiarProfesional()
    }, profesionalEditando
      ? 'Profesional actualizado correctamente'
      : 'Profesional creado correctamente')
  }

  function seleccionarHorario(profesionalId) {
    setProfesionalHorario(profesionalId)
    setHorarioEditando(null)
    setFormHorario({
      diaSemana: 'LUNES',
      horaInicio: '09:00',
      horaFin: '17:00',
    })
  }

  function editarHorario(horario) {
    setHorarioEditando(horario)
    setFormHorario({
      diaSemana: horario.diaSemana,
      horaInicio: horario.horaInicio,
      horaFin: horario.horaFin,
    })
  }

  async function guardarHorario(evento) {
    evento.preventDefault()

    const datos = { ...formHorario }

    await ejecutarAccion(async () => {
      if (horarioEditando) {
        await admin.modificarHorario(
          Number(profesionalHorario),
          horarioEditando.id,
          datos,
          token
        )
      } else {
        await admin.crearHorario(
          Number(profesionalHorario),
          datos,
          token
        )
      }

      setHorarioEditando(null)
      setFormHorario({
        diaSemana: 'LUNES',
        horaInicio: '09:00',
        horaFin: '17:00',
      })
    }, 'Horario guardado correctamente')
  }

  const profesionalSeleccionado = profesionales.find(
    (profesional) => String(profesional.id) === String(profesionalHorario)
  )

  const reservasOrdenadas = [...reservas].sort(
    (a, b) => new Date(b.inicio) - new Date(a.inicio)
  )

  return (
    <main className="admin-page">
      <header className="admin-header">
        <span className="admin-eyebrow">GESTIÓN DEL CENTRO</span>
        <h1>Panel de administración</h1>
        <p>Administrá los tratamientos, profesionales, horarios y reservas.</p>
      </header>

      <section className="admin-stats">
        <article>
          <strong>{tratamientos.length}</strong>
          <span>Tratamientos</span>
        </article>
        <article>
          <strong>{profesionales.filter((p) => p.activo).length}</strong>
          <span>Profesionales activos</span>
        </article>
        <article>
          <strong>{reservas.filter((r) => r.estado === 'CONFIRMADO').length}</strong>
          <span>Reservas confirmadas</span>
        </article>
      </section>

      <nav className="admin-tabs">
        {PESTANAS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={pestana === item.id ? 'active' : ''}
            onClick={() => {
              setPestana(item.id)
              setMensaje('')
              setError('')
            }}
          >
            {item.nombre}
          </button>
        ))}
      </nav>

      {error && <div className="admin-alert admin-error">{error}</div>}
      {mensaje && <div className="admin-alert admin-success">{mensaje}</div>}

      {cargando ? (
        <div className="admin-empty">Cargando información...</div>
      ) : (
        <>
          {pestana === 'tratamientos' && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Tratamientos</h2>
                  <p>Creá, modificá y activá o desactivá los servicios.</p>
                </div>
              </div>

              <form className="admin-form" onSubmit={guardarTratamiento}>
                <h3>{tratamientoEditando ? 'Editar tratamiento' : 'Nuevo tratamiento'}</h3>

                <div className="admin-form-grid">
                  <label>
                    Nombre
                    <input
                      required
                      maxLength="100"
                      value={formTratamiento.nombre}
                      onChange={(e) => setFormTratamiento({
                        ...formTratamiento,
                        nombre: e.target.value,
                      })}
                    />
                  </label>

                  <label>
                    Duración (minutos)
                    <input
                      required
                      type="number"
                      min="1"
                      value={formTratamiento.duracionMinutos}
                      onChange={(e) => setFormTratamiento({
                        ...formTratamiento,
                        duracionMinutos: e.target.value,
                      })}
                    />
                  </label>

                  <label>
                    Precio
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      value={formTratamiento.precio}
                      onChange={(e) => setFormTratamiento({
                        ...formTratamiento,
                        precio: e.target.value,
                      })}
                    />
                  </label>

                  <label className="admin-full-field">
                    Descripción
                    <textarea
                      rows="3"
                      value={formTratamiento.descripcion}
                      onChange={(e) => setFormTratamiento({
                        ...formTratamiento,
                        descripcion: e.target.value,
                      })}
                    />
                  </label>
                </div>

                <div className="admin-form-actions">
                  <button className="admin-primary-button" disabled={guardando}>
                    {guardando ? 'Guardando...' : tratamientoEditando ? 'Guardar cambios' : 'Crear tratamiento'}
                  </button>
                  {tratamientoEditando && (
                    <button type="button" className="admin-secondary-button" onClick={limpiarTratamiento}>
                      Cancelar edición
                    </button>
                  )}
                </div>
              </form>

              <div className="admin-list">
                {tratamientos.map((tratamiento) => (
                  <article className="admin-item" key={tratamiento.id}>
                    <div className="admin-item-main">
                      <div>
                        <span className={`admin-state ${tratamiento.activo ? 'is-active' : 'is-inactive'}`}>
                          {tratamiento.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        <h3>{tratamiento.nombre}</h3>
                        <p>{tratamiento.descripcion || 'Sin descripción'}</p>
                        <small>
                          {tratamiento.duracionMinutos} minutos · ${Number(tratamiento.precio).toLocaleString('es-AR')}
                        </small>
                      </div>
                    </div>
                    <div className="admin-item-actions">
                      <button className="admin-secondary-button" onClick={() => editarTratamiento(tratamiento)}>
                        Editar
                      </button>
                      <button
                        className="admin-secondary-button"
                        disabled={guardando}
                        onClick={() => ejecutarAccion(
                          () => admin.cambiarEstadoTratamiento(
                            tratamiento.id,
                            !tratamiento.activo,
                            token
                          ),
                          tratamiento.activo ? 'Tratamiento desactivado' : 'Tratamiento activado'
                        )}
                      >
                        {tratamiento.activo ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </article>
                ))}
                {tratamientos.length === 0 && (
                  <div className="admin-empty">Todavía no hay tratamientos registrados.</div>
                )}
              </div>
            </section>
          )}

          {pestana === 'profesionales' && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Profesionales</h2>
                  <p>Administrá los datos y el estado de cada profesional.</p>
                </div>
              </div>

              <form className="admin-form" onSubmit={guardarProfesional}>
                <h3>{profesionalEditando ? 'Editar profesional' : 'Nuevo profesional'}</h3>

                <div className="admin-form-grid">
                  <label>
                    Nombre
                    <input
                      required
                      maxLength="100"
                      value={formProfesional.nombre}
                      onChange={(e) => setFormProfesional({
                        ...formProfesional,
                        nombre: e.target.value,
                      })}
                    />
                  </label>

                  <label>
                    Email
                    <input
                      required
                      type="email"
                      value={formProfesional.email}
                      onChange={(e) => setFormProfesional({
                        ...formProfesional,
                        email: e.target.value,
                      })}
                    />
                  </label>

                  {!profesionalEditando && (
                    <label>
                      Contraseña inicial
                      <input
                        required
                        minLength="8"
                        type="password"
                        value={formProfesional.password}
                        onChange={(e) => setFormProfesional({
                          ...formProfesional,
                          password: e.target.value,
                        })}
                      />
                    </label>
                  )}

                  <label className="admin-full-field">
                    Descripción
                    <textarea
                      rows="3"
                      value={formProfesional.descripcion}
                      onChange={(e) => setFormProfesional({
                        ...formProfesional,
                        descripcion: e.target.value,
                      })}
                    />
                  </label>
                </div>

                <div className="admin-form-actions">
                  <button className="admin-primary-button" disabled={guardando}>
                    {guardando ? 'Guardando...' : profesionalEditando ? 'Guardar cambios' : 'Crear profesional'}
                  </button>
                  {profesionalEditando && (
                    <button type="button" className="admin-secondary-button" onClick={limpiarProfesional}>
                      Cancelar edición
                    </button>
                  )}
                </div>
                
              </form>

              <div className="admin-list">
                {profesionales.map((profesional) => (
                  <article className="admin-item" key={profesional.id}>
                    <div className="admin-item-main">
                      <div>
                        <span className={`admin-state ${profesional.activo ? 'is-active' : 'is-inactive'}`}>
                          {profesional.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        <h3>{profesional.usuario?.nombre}</h3>
                        <p>{profesional.usuario?.email}</p>
                        <small>{profesional.descripcion || 'Sin descripción'}</small>
                        <p className="admin-associated">
                          Tratamientos: {profesional.tratamientos?.length
                            ? profesional.tratamientos.map((item) => item.tratamiento?.nombre).filter(Boolean).join(', ')
                            : 'Sin tratamientos asociados'}
                        </p>
                      </div>
                    </div>
                    <div className="admin-item-actions">
                      <button className="admin-secondary-button" onClick={() => editarProfesional(profesional)}>
                        Editar
                      </button>
                      <button
                        className="admin-secondary-button"
                        disabled={guardando}
                        onClick={() => ejecutarAccion(
                          () => admin.cambiarEstadoProfesional(
                            profesional.id,
                            !profesional.activo,
                            token
                          ),
                          profesional.activo ? 'Profesional desactivado' : 'Profesional activado'
                        )}
                      >
                        {profesional.activo ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </article>
                ))}
                {profesionales.length === 0 && (
                  <div className="admin-empty">Todavía no hay profesionales registrados.</div>
                )}
              </div>
            </section>
          )}

          {pestana === 'horarios' && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Horarios de atención</h2>
                  <p>Configurá los días y bloques de atención de cada profesional.</p>
                </div>
              </div>

              <label className="admin-select-field">
                Profesional
                <select
                  value={profesionalHorario}
                  onChange={(e) => seleccionarHorario(e.target.value)}
                >
                  <option value="">Seleccionar profesional</option>
                  {profesionales.filter((p) => p.activo).map((profesional) => (
                    <option key={profesional.id} value={profesional.id}>
                      {profesional.usuario?.nombre}
                    </option>
                  ))}
                </select>
              </label>

              {profesionalSeleccionado && (
                <>
                  <form className="admin-form" onSubmit={guardarHorario}>
                    <h3>{horarioEditando ? 'Editar horario' : 'Agregar horario'}</h3>

                    <div className="admin-form-grid">
                      <label>
                        Día
                        <select
                          value={formHorario.diaSemana}
                          onChange={(e) => setFormHorario({
                            ...formHorario,
                            diaSemana: e.target.value,
                          })}
                        >
                          {DIAS.map((dia) => (
                            <option key={dia} value={dia}>{dia}</option>
                          ))}
                        </select>
                      </label>

                      <label>
                        Hora de inicio
                        <input
                          type="time"
                          required
                          value={formHorario.horaInicio}
                          onChange={(e) => setFormHorario({
                            ...formHorario,
                            horaInicio: e.target.value,
                          })}
                        />
                      </label>

                      <label>
                        Hora de fin
                        <input
                          type="time"
                          required
                          value={formHorario.horaFin}
                          onChange={(e) => setFormHorario({
                            ...formHorario,
                            horaFin: e.target.value,
                          })}
                        />
                      </label>
                    </div>

                    <div className="admin-form-actions">
                      <button className="admin-primary-button" disabled={guardando}>
                        {guardando ? 'Guardando...' : horarioEditando ? 'Guardar cambios' : 'Agregar horario'}
                      </button>
                      {horarioEditando && (
                        <button
                          type="button"
                          className="admin-secondary-button"
                          onClick={() => setHorarioEditando(null)}
                        >
                          Cancelar edición
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="admin-list">
                    {(profesionalSeleccionado.horarios || []).map((horario) => (
                      <article className="admin-item" key={horario.id}>
                        <div>
                          <h3>{horario.diaSemana}</h3>
                          <p>{horario.horaInicio} a {horario.horaFin}</p>
                        </div>
                        <div className="admin-item-actions">
                          <button className="admin-secondary-button" onClick={() => editarHorario(horario)}>
                            Editar
                          </button>
                          <button
                            className="admin-secondary-button admin-danger-button"
                            disabled={guardando}
                            onClick={() => {
                              if (window.confirm('¿Eliminar este horario?')) {
                                ejecutarAccion(
                                  () => admin.eliminarHorario(
                                    profesionalSeleccionado.id,
                                    horario.id,
                                    token
                                  ),
                                  'Horario eliminado correctamente'
                                )
                              }
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </article>
                    ))}
                    {(profesionalSeleccionado.horarios || []).length === 0 && (
                      <div className="admin-empty">Este profesional todavía no tiene horarios.</div>
                    )}
                  </div>
                </>
              )}
            </section>
          )}

          {pestana === 'reservas' && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Reservas</h2>
                  <p>Consultá todas las reservas y gestioná su estado.</p>
                </div>
              </div>

              <div className="admin-list">
                {reservasOrdenadas.map((reserva) => (
                  <article className="admin-item admin-reservation" key={reserva.id}>
                    <div className="admin-item-main">
                      <div>
                        <span className={`booking-status status-${reserva.estado?.toLowerCase()}`}>
                          {reserva.estado}
                        </span>
                        <h3>{reserva.tratamiento?.nombre || 'Tratamiento'}</h3>
                        <p>
                          Cliente: {reserva.cliente?.nombre || 'Sin datos'} · Profesional: {reserva.profesional?.usuario?.nombre || 'Sin datos'}
                        </p>
                        <small>
                          {new Date(reserva.inicio).toLocaleString('es-AR', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                          {' · '}
                          ${Number(reserva.precioAplicado).toLocaleString('es-AR')}
                        </small>
                      </div>
                    </div>

                    {reserva.estado === 'CONFIRMADO' && (
                      <div className="admin-item-actions">
                        <button
                          className="admin-secondary-button"
                          disabled={guardando}
                          onClick={() => {
                            if (window.confirm('¿Cancelar esta reserva?')) {
                              ejecutarAccion(
                                () => admin.cancelarReservaAdmin(reserva.id, token),
                                'Reserva cancelada correctamente'
                              )
                            }
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          className="admin-primary-button"
                          disabled={guardando}
                          onClick={() => {
                            if (window.confirm('¿Marcar esta reserva como completada?')) {
                              ejecutarAccion(
                                () => admin.completarReservaAdmin(reserva.id, token),
                                'Reserva completada correctamente'
                              )
                            }
                          }}
                        >
                          Completar
                        </button>
                      </div>
                    )}
                  </article>
                ))}
                {reservas.length === 0 && (
                  <div className="admin-empty">Todavía no hay reservas registradas.</div>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default PanelAdmin
