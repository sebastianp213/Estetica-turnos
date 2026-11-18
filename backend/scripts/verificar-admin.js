require("dotenv").config();

const prisma = require("../src/config/database");

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!email) {
    throw new Error("Falta configurar ADMIN_EMAIL");
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      activo: true
    }
  });

  if (!usuario) {
    console.log("No se encontró el usuario.");
    return;
  }

  console.log("Datos del usuario:");
  console.log(usuario);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });