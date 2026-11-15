const servicio = require("../services/horario.service");

function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

function validarDatos(datos) {
  const errores = [];

  if (!servicio.diasValidos.includes(datos.diaSemana)) {
    errores.push("El día de la semana no es válido");
  }

  const formatoHora = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

  if (
    typeof datos.horaInicio !== "string" ||
    !formatoHora.test(datos.horaInicio)
  ) {
    errores.push("La hora de inicio debe tener el formato HH:mm");
  }

  if (
    typeof datos.horaFin !== "string" ||
    !formatoHora.test(datos.horaFin)
  ) {
    errores.push("La hora de fin debe tener el formato HH:mm");
  }

  if (
    formatoHora.test(datos.horaInicio) &&
    formatoHora.test(datos.horaFin) &&
    datos.horaInicio >= datos.horaFin
  ) {
    errores.push("La hora de fin debe ser posterior a la hora de inicio");
  }

  return errores;
}

function manejarError(res, error, mensaje) {
  if (error.status) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error(mensaje, error);
  return res.status(500).json({ error: mensaje });
}

async function listar(req, res) {
  const profesionalId = validarId(req.params.id);

  if (!profesionalId) {
    return res.status(400).json({ error: "ID de profesional inválido" });
  }

  try {
    const horarios = await servicio.listarHorarios(profesionalId);
    return res.json(horarios);
  } catch (error) {
    return manejarError(res, error, "Error al consultar horarios");
  }
}

async function crear(req, res) {
  const profesionalId = validarId(req.params.id);

  if (!profesionalId) {
    return res.status(400).json({ error: "ID de profesional inválido" });
  }

  const errores = validarDatos(req.body);

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const horario = await servicio.crearHorario(
      profesionalId,
      req.body
    );

    return res.status(201).json({
      mensaje: "Horario creado correctamente",
      horario
    });
  } catch (error) {
    return manejarError(res, error, "Error al crear horario");
  }
}

async function modificar(req, res) {
  const profesionalId = validarId(req.params.id);
  const horarioId = validarId(req.params.horarioId);

  if (!profesionalId || !horarioId) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const errores = validarDatos(req.body);

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const horario = await servicio.modificarHorario(
      profesionalId,
      horarioId,
      req.body
    );

    return res.json({
      mensaje: "Horario modificado correctamente",
      horario
    });
  } catch (error) {
    return manejarError(res, error, "Error al modificar horario");
  }
}

async function eliminar(req, res) {
  const profesionalId = validarId(req.params.id);
  const horarioId = validarId(req.params.horarioId);

  if (!profesionalId || !horarioId) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    await servicio.eliminarHorario(profesionalId, horarioId);

    return res.json({
      mensaje: "Horario eliminado correctamente"
    });
  } catch (error) {
    return manejarError(res, error, "Error al eliminar horario");
  }
}

module.exports = {
  listar,
  crear,
  modificar,
  eliminar
};