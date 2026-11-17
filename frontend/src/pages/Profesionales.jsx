
import { useEffect, useState } from 'react'
import { obtenerProfesionales } from '../services/reservaService'

function Profesionales() {
  const [profesionales, setProfesionales] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  function cargarProfesionales() {
    setCargando(true)
    setError('')

    obtenerProfesionales()
      .then((datos) => {
        setProfesionales(
          Array.isArray(datos) ? datos : datos.profesionales || []
        )
      })
      .catch((error) => {
        setError(error.message || 'No se pudo cargar el equipo.')
      })
      .finally(() => {
        setCargando(false)
      })
  }

  useEffect(() => {
    let activo = true

    obtenerProfesionales()
      .then((datos) => {
        if (activo) {
          setProfesionales(
            Array.isArray(datos) ? datos : datos.profesionales || []
          )
        }
      })
      .catch((error) => {
        if (activo) {
          setError(error.message || 'No se pudo cargar el equipo.')
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false)
        }
      })

    return () => {
      activo = false
    }
  }, [])

  return (
    <main className="treatments-page">
      <header className="treatments-header">
        <span className="eyebrow">NUESTRO EQUIPO</span>
        <h1>Profesionales</h1>
        <p>
          Conocé a las personas que estarán a cargo de tu atención
          y descubrí qué tratamientos realizan.
        </p>
      </header>

      {cargando && (
        <p className="treatments-message" role="status">
          Cargando profesionales...
        </p>
      )}

      {!cargando && error && (
        <div className="treatments-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={cargarProfesionales}>
            Volver a intentar
          </button>
        </div>
      )}

      {!cargando && !error && profesionales.length === 0 && (
        <p className="treatments-message">
          Actualmente no hay profesionales disponibles.
        </p>
      )}

      {!cargando && !error && profesionales.length > 0 && (
        <section className="treatments-grid">
          {profesionales.map((profesional) => {
            const tratamientos = profesional.tratamientos || []

            return (
              <article className="treatment-card" key={profesional.id}>
                <span className="treatment-icon">✿</span>

                <h2>
                  {profesional.usuario?.nombre || 'Profesional'}
                </h2>

                <p className="treatment-description">
                  {profesional.descripcion ||
                    'Profesional de nuestro equipo de estética.'}
                </p>

                <div className="professional-treatments">
                  <strong>Tratamientos que realiza</strong>

                  {tratamientos.length > 0 ? (
                    <ul>
                      {tratamientos.map((asociacion) => (
                        <li key={asociacion.tratamientoId}>
                          {asociacion.tratamiento?.nombre || 'Tratamiento'}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      Todavía no tiene tratamientos asignados.
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </section>
      )}
    </main>
  )
}

export default Profesionales
