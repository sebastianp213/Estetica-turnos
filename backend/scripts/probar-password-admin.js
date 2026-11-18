require("dotenv").config();

const prisma = require("../src/config/database");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!email) {
    throw new Error("Falta ADMIN_EMAIL");
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!usuario) {
    console.log("Usuario inexistente");
    return;
  }

  rl.question("Ingresá la contraseña que estás intentando usar: ", async (password) => {
    try {
      const coincide = await bcrypt.compare(password, usuario.passwordHash);

      console.log("\nResultado:");
      console.log("Email:", usuario.email);
      console.log("Activo:", usuario.activo);
      console.log("Password válida:", coincide ? "SÍ" : "NO");

    } catch (error) {
      console.error("Error al verificar:", error);
    } finally {
      rl.close();
      await prisma.$disconnect();
    }
  });
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  rl.close();
});