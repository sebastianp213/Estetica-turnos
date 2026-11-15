
require("dotenv").config();

const bcrypt = require("bcryptjs");
const prisma = require("../src/config/database");

async function main() {
  const nombre = process.env.ADMIN_NOMBRE;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!nombre || !email || !password) {
    throw new Error(
      "Debes configurar ADMIN_NOMBRE, ADMIN_EMAIL y ADMIN_PASSWORD"
    );
  }

  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  const existente = await prisma.usuario.findUnique({
    where: { email }
  });

  if (existente) {
    throw new Error(
      "Ese correo ya está registrado. No se modificó su rol."
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const administrador = await prisma.usuario.create({
    data: {
      nombre: nombre.trim(),
      email,
      passwordHash,
      rol: "ADMIN"
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true
    }
  });

  console.log("Administrador creado correctamente:");
  console.log(administrador);
}

main()
  .catch((error) => {
    console.error("No se pudo crear el administrador:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
