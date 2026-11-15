
const prisma = require("./src/config/database");

async function probarConexion() {
  try {
    await prisma.$connect();

    const resultado = await prisma.$queryRaw`SELECT 1 AS conexion`;

    console.log("¡Conexión exitosa con MariaDB!");
    console.log(resultado);
  } catch (error) {
    console.error("Error al conectar con MariaDB:");
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

probarConexion();
