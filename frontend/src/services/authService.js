const API_URL = import.meta.env.VITE_API_URL || '/api'

async function realizarSolicitud(endpoint, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${endpoint}`, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...opciones.headers,
    },
  })

  const datos = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(datos.error || 'Ocurrió un error en la solicitud')
  }

  return datos
}

export async function registrarUsuario(datos) {
  return realizarSolicitud('/usuarios/registro', {
    method: 'POST',
    body: JSON.stringify(datos),
  })
}

export async function iniciarSesion(email, password) {
  return realizarSolicitud('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function obtenerPerfil(token) {
  return realizarSolicitud('/auth/perfil', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}