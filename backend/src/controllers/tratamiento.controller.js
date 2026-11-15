
const servicio = require("../services/tratamiento.service");

function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
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

  if (!parcial || datos.duracionMinutos !== undefined) {
    if (
      !Number.isInteger(datos.duracionMinutos) ||
      datos.duracionMinutos <= 0
    ) {
      errores.push("La duración debe ser un número entero mayor que cero");
    }
  }

  if (!parcial || datos.precio !== undefined) {
    if (
      typeof datos.precio !== "number" ||
      !Number.isFinite(datos.precio) ||
      datos.precio < 0
    ) {
      errores.push("El precio debe ser un número mayor o igual a cero");
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
    const tratamientos = await servicio.obtenerTratamientos();
    return res.json(tratamientos);
  } catch (error) {
    console.error("Error al consultar tratamientos:", error);
    return res.status(500).json({ error: "Error al consultar tratamientos" });
  }
}

async function obtenerUno(req, res) {
  const id = validarId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "ID de tratamiento inválido" });
  }

  try {
    const tratamiento = await servicio.obtenerTratamientoPorId(id);

    if (!tratamiento) {
      return res.status(404).json({ error: "Tratamiento no encontrado" });
    }

    return res.json(tratamiento);
  } catch (error) {
    console.error("Error al consultar tratamiento:", error);
    return res.status(500).json({ error: "Error al consultar tratamiento" });
  }
}

async function crear(req, res) {
  const errores = validarDatos(req.body);

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const tratamiento = await servicio.crearTratamiento(req.body);

    return res.status(201).json({
      mensaje: "Tratamiento creado correctamente",
      tratamiento
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error("Error al crear tratamiento:", error);
    return res.status(500).json({ error: "Error al crear tratamiento" });
  }
}

async function modificar(req, res) {
  const id = validarId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "ID de tratamiento inválido" });
  }

  const camposPermitidos = [
    "nombre",
    "descripcion",
    "duracionMinutos",
    "precio"
  ];

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
    const tratamiento = await servicio.modificarTratamiento(id, datos);

    return res.json({
      mensaje: "Tratamiento modificado correctamente",
      tratamiento
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error("Error al modificar tratamiento:", error);
    return res.status(500).json({ error: "Error al modificar tratamiento" });
  }
}

async function desactivar(req, res) {
  const id = validarId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "ID de tratamiento inválido" });
  }

  try {
    const tratamiento = await servicio.desactivarTratamiento(id);

    return res.json({
      mensaje: "Tratamiento desactivado correctamente",
      tratamiento
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error("Error al desactivar tratamiento:", error);
    return res.status(500).json({ error: "Error al desactivar tratamiento" });
  }
}

module.exports = {
  listar,
  obtenerUno,
  crear,
  modificar,
  desactivar
};
