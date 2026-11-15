const servicio = require("../services/profesional.service");

function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

function manejarError(res, error, mensaje) {
  if (error.status) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error(mensaje, error);
  return res.status(500).json({ error: mensaje });
}

function validarDatos(datos, parcial = false) {
  const errores = [];

  if (!parcial || datos.nombre !== undefined) {
    if (
      typeof datos.nombre !== "string" ||
      datos.nombre.trim().length < 1 ||
      datos.nombre.trim().length > 100
    ) {
      errores.push("El nombre debe tener entre 1 y 100 caracteres");
    }
  }

  if (!parcial || datos.email !== undefined) {
    if (
      typeof datos.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())
    ) {
      errores.push("Debes ingresar un email válido");
    }
  }

  if (!parcial || datos.password !== undefined) {
    if (
      typeof datos.password !== "string" ||
      datos.password.length < 8
    ) {
      errores.push("La contraseña debe tener al menos 8 caracteres");
    }
  }

  if (
    datos.descripcion !== undefined &&
    datos.descripcion !== null &&
    typeof datos.descripcion !== "string"
  ) {
    errores.push("La descripción debe ser un texto");
  }

  return errores;
}

async function listar(req, res) {
  try {
    return res.json(await servicio.listarProfesionales());
  } catch (error) {
    return manejarError(res, error, "Error al consultar profesionales");
  }
}

async function obtenerUno(req, res) {
  const id = validarId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "ID de profesional inválido" });
  }

  try {
    const profesional = await servicio.obtenerProfesionalPorId(id);

    if (!profesional) {
      return res.status(404).json({ error: "Profesional no encontrado" });
    }

    return res.json(profesional);
  } catch (error) {
    return manejarError(res, error, "Error al consultar profesional");
  }
}

async function crear(req, res) {
  const errores = validarDatos(req.body);

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const profesional = await servicio.crearProfesional(req.body);

    return res.status(201).json({
      mensaje: "Profesional creado correctamente",
      profesional
    });
  } catch (error) {
    return manejarError(res, error, "Error al crear profesional");
  }
}

async function modificar(req, res) {
  const id = validarId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "ID de profesional inválido" });
  }

  const camposPermitidos = ["nombre", "email", "descripcion"];

  const datos = Object.fromEntries(
    Object.entries(req.body).filter(([campo]) =>
      camposPermitidos.includes(campo)
    )
  );

  if (Object.keys(datos).length === 0) {
    return res.status(400).json({
      error: "Debes enviar al menos un campo válido para modificar"
    });
  }

  const errores = validarDatos(datos, true);

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const profesional = await servicio.modificarProfesional(id, datos);

    return res.json({
      mensaje: "Profesional modificado correctamente",
      profesional
    });
  } catch (error) {
    return manejarError(res, error, "Error al modificar profesional");
  }
}

async function cambiarEstado(req, res) {
  const id = validarId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "ID de profesional inválido" });
  }

  if (typeof req.body.activo !== "boolean") {
    return res.status(400).json({
      error: "El campo activo debe ser true o false"
    });
  }

  try {
    const profesional = await servicio.cambiarEstadoProfesional(
      id,
      req.body.activo
    );

    return res.json({
      mensaje: "Estado del profesional actualizado correctamente",
      profesional
    });
  } catch (error) {
    return manejarError(res, error, "Error al cambiar estado del profesional");
  }
}

async function asociarTratamiento(req, res) {
  const profesionalId = validarId(req.params.id);
  const tratamientoId = validarId(req.body.tratamientoId);

  if (!profesionalId || !tratamientoId) {
    return res.status(400).json({
      error: "El ID del profesional o del tratamiento es inválido"
    });
  }

  try {
    const asociacion = await servicio.asociarTratamiento(
      profesionalId,
      tratamientoId
    );

    return res.status(201).json({
      mensaje: "Tratamiento asociado correctamente",
      asociacion
    });
  } catch (error) {
    return manejarError(res, error, "Error al asociar tratamiento");
  }
}

async function quitarTratamiento(req, res) {
  const profesionalId = validarId(req.params.id);
  const tratamientoId = validarId(req.params.tratamientoId);

  if (!profesionalId || !tratamientoId) {
    return res.status(400).json({
      error: "El ID del profesional o del tratamiento es inválido"
    });
  }

  try {
    await servicio.quitarTratamiento(profesionalId, tratamientoId);

    return res.json({
      mensaje: "Tratamiento quitado correctamente"
    });
  } catch (error) {
    return manejarError(res, error, "Error al quitar tratamiento");
  }
}

module.exports = {
  listar,
  obtenerUno,
  crear,
  modificar,
  cambiarEstado,
  asociarTratamiento,
  quitarTratamiento
};