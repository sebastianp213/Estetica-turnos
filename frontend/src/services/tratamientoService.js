
const API_URL = import.meta.env.VITE_API_URL || '/api'

export async function obtenerTratamientos() {
  const respuesta = await fetch(`${API_URL}/tratamientos`)
  const datos = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(datos.error || 'No se pudieron cargar los tratamientos')
  }

  return datos
}
