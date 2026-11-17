
const API_URL = import.meta.env.VITE_API_URL || "/api";

async function solicitar(ruta, opciones = {}, token) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers
    }
  });

  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(datos.error || datos.mensaje || "Error en la solicitud");
  }

  return datos;
}

// Tratamientos
export function obtenerTratamientosAdmin(token) {
  return solicitar("/admin/tratamientos", {}, token);
}

export function crearTratamiento(datos, token) {
  return solicitar(
    "/tratamientos",
    { method: "POST", body: JSON.stringify(datos) },
    token
  );
}

export function modificarTratamiento(id, datos, token) {
  return solicitar(
    `/tratamientos/${id}`,
    { method: "PUT", body: JSON.stringify(datos) },
    token
  );
}

export function cambiarEstadoTratamiento(id, activo, token) {
  return solicitar(
    `/admin/tratamientos/${id}/estado`,
    { method: "PATCH", body: JSON.stringify({ activo }) },
    token
  );
}

// Profesionales
export function obtenerProfesionalesAdmin(token) {
  return solicitar("/admin/profesionales", {}, token);
}

export function crearProfesional(datos, token) {
  return solicitar(
    "/profesionales",
    { method: "POST", body: JSON.stringify(datos) },
    token
  );
}

export function modificarProfesional(id, datos, token) {
  return solicitar(
    `/profesionales/${id}`,
    { method: "PUT", body: JSON.stringify(datos) },
    token
  );
}

export function cambiarEstadoProfesional(id, activo, token) {
  return solicitar(
    `/profesionales/${id}/estado`,
    {
      method: "PATCH",
      body: JSON.stringify({ activo })
    },
    token
  );
}

export function asociarTratamiento(profesionalId, tratamientoId, token) {
  return solicitar(
    `/profesionales/${profesionalId}/tratamientos`,
    {
      method: "POST",
      body: JSON.stringify({ tratamientoId })
    },
    token
  );
}

export function quitarTratamiento(profesionalId, tratamientoId, token) {
  return solicitar(
    `/profesionales/${profesionalId}/tratamientos/${tratamientoId}`,
    { method: "DELETE" },
    token
  );
}

// Horarios
export function crearHorario(profesionalId, datos, token) {
  return solicitar(
    `/profesionales/${profesionalId}/horarios`,
    { method: "POST", body: JSON.stringify(datos) },
    token
  );
}

export function modificarHorario(profesionalId, horarioId, datos, token) {
  return solicitar(
    `/profesionales/${profesionalId}/horarios/${horarioId}`,
    { method: "PUT", body: JSON.stringify(datos) },
    token
  );
}

export function eliminarHorario(profesionalId, horarioId, token) {
  return solicitar(
    `/profesionales/${profesionalId}/horarios/${horarioId}`,
    { method: "DELETE" },
    token
  );
}

// Reservas
export function obtenerReservasAdmin(token) {
  return solicitar("/reservas", {}, token);
}

export function cancelarReservaAdmin(reservaId, token) {
  return solicitar(
    `/reservas/${reservaId}/cancelar-admin`,
    { method: "PATCH" },
    token
  );
}

export function completarReservaAdmin(reservaId, token) {
  return solicitar(
    `/reservas/${reservaId}/completar`,
    { method: "PATCH" },
    token
  );
}
