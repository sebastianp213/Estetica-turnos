
const prisma = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function iniciarSesion(email, password) {
  const emailNormalizado = email.trim().toLowerCase();

  const usuario = await prisma.usuario.findUnique({
    where: {
      email: emailNormalizado
    }
  });

  if (!usuario || !usuario.activo) {
    return null;
  }

  const passwordValida = await bcrypt.compare(
    password,
    usuario.passwordHash
  );

  if (!passwordValida) {
    return null;
  }

  const token = jwt.sign(
    {
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    {
      subject: String(usuario.id),
      expiresIn: process.env.JWT_EXPIRES_IN || "2h"
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  };
}

module.exports = {
  iniciarSesion
};
