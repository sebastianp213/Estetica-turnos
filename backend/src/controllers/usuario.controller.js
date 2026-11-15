
const { registrarCliente } = require("../services/usuario.service");

async function registrar(req, res) {
  try {
    const { nombre, email, password } = req.body;

    // Validar que se hayan enviado todos los campos
    if (!nombre || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios"
      });
    }

    // Validar tipos de datos
    if (
      typeof nombre !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        error: "Los datos enviados no son válidos"
      });
    }

    // Validar nombre
    if (nombre.trim().length === 0 || nombre.trim().length > 100) {
      return res.status(400).json({
        error: "El nombre debe tener entre 1 y 100 caracteres"
      });
    }

    // Validar correo electrónico
    const emailNormalizado = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
      return res.status(400).json({
        error: "El correo electrónico no es válido"
      });
    }

    // Validar contraseña
    if (password.length < 8) {
      return res.status(400).json({
        error: "La contraseña debe tener al menos 8 caracteres"
      });
    }

    const usuario = await registrarCliente(
      nombre,
      emailNormalizado,
      password
    );

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario
    });

  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        error: error.message
      });
    }

    console.error("Error al registrar usuario:", error);

    return res.status(500).json({
      error: "Ocurrió un error al registrar el usuario"
    });
  }
}

module.exports = {
  registrar
};
