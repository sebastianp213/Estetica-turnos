
const { iniciarSesion } = require("../services/auth.service");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: "Email y contraseña son obligatorios"
      });
    }

    const resultado = await iniciarSesion(email, password);

    if (!resultado) {
      return res.status(401).json({
        error: "Credenciales incorrectas o usuario inactivo"
      });
    }

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      ...resultado
    });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    return res.status(500).json({
      error: "Ocurrió un error al iniciar sesión"
    });
  }
}

module.exports = {
  login
};
