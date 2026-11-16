
const servicio = require("../services/reserva.service");

function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

function responderError(res, error, mensajeGenerico) {
  if (error.status) {
    return res.status(error.status).json({
      error: error.message
    });
  }

  console.error(mensajeGenerico, error);

  return res.status(500).json({
    error: mensajeGenerico
  });
}

async function disponibilidad(req, res) {
  const profesionalId = validarId(req.query.profesionalId);
  const tratamientoId = validarId(req.query.tratamientoId);
  const fecha = req.query.fecha;

  if (!profesionalId || !tratamientoId) {
    return res.status(400).json({
      error: "Debes indicar un profesional y un tratamiento válidos"
    });
  }

  try {
    const horarios = await servicio.obtenerDisponibilidad({
      profesionalId,
      tratamientoId,
      fecha
    });

    return res.json({
      profesionalId,
      tratamientoId,
      fecha,
      horariosDisponibles: horarios
    });
  } catch (error) {
    return responderError(
      res,
      error,
      "Error al consultar la disponibilidad"
    );
  }
}

async function crear(req, res) {
  const profesionalId = validarId(req.body.profesionalId);
  const tratamientoId = validarId(req.body.tratamientoId);

  if (!profesionalId || !tratamientoId) {
    return res.status(400).json({
      error: "Debes indicar un profesional y un tratamiento válidos"
    });
  }

  if (
    typeof req.body.fecha !== "string" ||
    typeof req.body.horaInicio !== "string"
  ) {
    return res.status(400).json({
      error: "Debes indicar la fecha y la hora de inicio"
    });
  }

  try {
    const reserva = await servicio.crearReserva(
      req.usuario.id,
      {
        profesionalId,
        tratamientoId,
        fecha: req.body.fecha,
        horaInicio: req.body.horaInicio
      }
    );

    return res.status(201).json({
      mensaje: "Reserva creada correctamente",
      reserva
    });
  } catch (error) {
    return responderError(res, error, "Error al crear la reserva");
  }
}

// T28
async function listar(req, res) {
  try {
    const reservas = await servicio.listarReservas(req.usuario);

    return res.json({
      reservas
    });
  } catch (error) {
    return responderError(res, error, "Error al consultar las reservas");
  }
}

// T29
async function cancelar(req, res) {
  const reservaId = validarId(req.params.id);

  if (!reservaId) {
    return res.status(400).json({
      error: "El ID de la reserva no es válido"
    });
  }

  try {
    const reserva = await servicio.cancelarReservaCliente(
      reservaId,
      req.usuario.id
    );

    return res.json({
      mensaje: "Reserva cancelada correctamente",
      reserva
    });
  } catch (error) {
    return responderError(res, error, "Error al cancelar la reserva");
  }
}

// T30
async function cancelarAdmin(req, res) {
  const reservaId = validarId(req.params.id);

  if (!reservaId) {
    return res.status(400).json({
      error: "El ID de la reserva no es válido"
    });
  }

  try {
    const reserva = await servicio.cancelarReservaAdmin(reservaId);

    return res.json({
      mensaje: "Reserva cancelada por administración",
      reserva
    });
  } catch (error) {
    return responderError(res, error, "Error al cancelar la reserva");
  }
}

// T31 y T32
async function completar(req, res) {
  const reservaId = validarId(req.params.id);

  if (!reservaId) {
    return res.status(400).json({
      error: "El ID de la reserva no es válido"
    });
  }

  try {
    const reserva = await servicio.completarReserva(
      reservaId,
      req.usuario
    );

    return res.json({
      mensaje: "Turno marcado como completado",
      reserva
    });
  } catch (error) {
    return responderError(res, error, "Error al completar el turno");
  }
}

module.exports = {
  disponibilidad,
  crear,
  listar,
  cancelar,
  cancelarAdmin,
  completar
};
