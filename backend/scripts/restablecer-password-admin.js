
require("dotenv").config();

const bcrypt = require("bcryptjs");
const prisma = require("../src/config/database");

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Faltan ADMIN_EMAIL o ADMIN_PASSWORD");
  }

  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!usuario || usuario.rol !== "ADMIN") {
    throw new Error("No se encontró una cuenta administradora con ese correo");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { passwordHash }
  });

  console.log("Contraseña del administrador restablecida correctamente.");
}

main()
  .catch((error) => {
    console.error("Error:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
