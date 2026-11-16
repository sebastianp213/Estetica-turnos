
import { useEffect, useState } from 'react'
import { obtenerTratamientos } from '../services/tratamientoService'

function Tratamientos() {
  const [tratamientos, setTratamientos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarTratamientos() {
      try {
        const datos = await obtenerTratamientos()
        setTratamientos(datos)
      } catch (error) {
        setError(error.message)
      } finally {
        setCargando(false)
      }
    }

    cargarTratamientos()
  }, [])

  function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(Number(precio))
  }

  return (
    <main className="treatments-page">
      <header className="treatments-header">
        <span className="eyebrow">CUIDADO Y BIENESTAR</span>
        <h1>Nuestros tratamientos</h1>
        <p>
          Descubrí nuestros servicios y encontrá el tratamiento
          ideal para dedicarte un momento de cuidado.
        </p>
      </header>

      {cargando && (
        <p className="treatments-message">
          Cargando tratamientos...
        </p>
      )}

      {error && (
        <p className="treatments-error">{error}</p>
      )}

      {!cargando && !error && tratamientos.length === 0 && (
        <p className="treatments-message">
          Actualmente no hay tratamientos disponibles.
        </p>
      )}

      {!cargando && !error && tratamientos.length > 0 && (
        <section className="treatments-grid">
          {tratamientos.map((tratamiento) => (
            <article className="treatment-card" key={tratamiento.id}>
              <span className="treatment-icon">✿</span>

              <h2>{tratamiento.nombre}</h2>

              <p className="treatment-description">
                {tratamiento.descripcion || 'Un momento dedicado a tu bienestar.'}
              </p>

              <div className="treatment-details">
                <span>
                  <strong>Duración</strong>
                  {tratamiento.duracionMinutos} minutos
                </span>

                <span>
                  <strong>Precio</strong>
                  {formatearPrecio(tratamiento.precio)}
                </span>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default Tratamientos
