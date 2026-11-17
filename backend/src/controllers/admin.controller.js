
const servicio = require("../services/admin.service");

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

async function listarTratamientos(req, res) {
  try {
    const tratamientos = await servicio.listarTratamientosAdmin();
    return res.json(tratamientos);
  } catch (error) {
    return manejarError(res, error, "Error al consultar tratamientos");
  }
}

async function listarProfesionales(req, res) {
  try {
    const profesionales = await servicio.listarProfesionalesAdmin();
    return res.json(profesionales);
  } catch (error) {
    return manejarError(res, error, "Error al consultar profesionales");
  }
}

async function cambiarEstadoTratamiento(req, res) {
  const id = validarId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "ID de tratamiento inválido" });
  }

  if (typeof req.body.activo !== "boolean") {
    return res.status(400).json({
      error: "El campo activo debe ser true o false"
    });
  }

  try {
    const tratamiento = await servicio.cambiarEstadoTratamiento(
      id,
      req.body.activo
    );

    return res.json({
      mensaje: "Estado del tratamiento actualizado correctamente",
      tratamiento
    });
  } catch (error) {
    return manejarError(res, error, "Error al cambiar el estado del tratamiento");
  }
}

module.exports = {
  listarTratamientos,
  listarProfesionales,
  cambiarEstadoTratamiento
};
