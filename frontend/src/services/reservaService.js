
const API_URL = import.meta.env.VITE_API_URL || '/api'

async function solicitar(endpoint, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${endpoint}`, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...opciones.headers,
    },
  })

  const datos = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(datos.error || 'No se pudo completar la operación')
  }

  return datos
}

export async function obtenerProfesionales() {
  return solicitar('/profesionales')
}

export async function obtenerDisponibilidad(
  profesionalId,
  tratamientoId,
  fecha
) {
  const parametros = new URLSearchParams({
    profesionalId,
    tratamientoId,
    fecha,
  })

  return solicitar(`/disponibilidad?${parametros}`)
}

export async function crearReserva(datos, token) {
  return solicitar('/reservas', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  })
}

export async function obtenerReservas(token) {
  return solicitar('/reservas', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function cancelarReserva(reservaId, token) {
  return solicitar(`/reservas/${reservaId}/cancelar`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function completarReserva(reservaId, token) {
  return solicitar(`/reservas/${reservaId}/completar`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
