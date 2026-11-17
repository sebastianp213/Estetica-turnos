
const prisma = require("../config/database");

async function listarTratamientosAdmin() {
  return prisma.tratamiento.findMany({
    orderBy: { nombre: "asc" }
  });
}

async function listarProfesionalesAdmin() {
  return prisma.profesional.findMany({
    include: {
      usuario: {
        select: {
          id: true,
          nombre: true,
          email: true,
          activo: true
        }
      },
      tratamientos: {
        include: {
          tratamiento: true
        }
      },
      horarios: true
    },
    orderBy: { id: "asc" }
  });
}

async function cambiarEstadoTratamiento(id, activo) {
  const tratamiento = await prisma.tratamiento.findUnique({
    where: { id }
  });

  if (!tratamiento) {
    const error = new Error("Tratamiento no encontrado");
    error.status = 404;
    throw error;
  }

  return prisma.tratamiento.update({
    where: { id },
    data: { activo }
  });
}

module.exports = {
  listarTratamientosAdmin,
  listarProfesionalesAdmin,
  cambiarEstadoTratamiento
};
