
const prisma = require("../config/database");
const bcrypt = require("bcryptjs");

async function registrarCliente(nombre, email, password) {
  const emailNormalizado = email.trim().toLowerCase();

  const usuarioExistente = await prisma.usuario.findUnique({
    where: {
      email: emailNormalizado
    }
  });

  if (usuarioExistente) {
    const error = new Error("El correo electrónico ya está registrado");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const nuevoUsuario = await prisma.usuario.create({
    data: {
      nombre: nombre.trim(),
      email: emailNormalizado,
      passwordHash,
      rol: "CLIENTE"
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      activo: true,
      createdAt: true
    }
  });

  return nuevoUsuario;
}

module.exports = {
  registrarCliente
};
