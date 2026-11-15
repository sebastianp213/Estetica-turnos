
const prisma = require("../config/database");

async function obtenerTratamientos() {
  return prisma.tratamiento.findMany({
    where: {
      activo: true
    },
    orderBy: {
      nombre: "asc"
    }
  });
}

async function obtenerTratamientoPorId(id) {
  return prisma.tratamiento.findFirst({
    where: {
      id,
      activo: true
    }
  });
}

async function crearTratamiento(datos) {
  try {
    return await prisma.tratamiento.create({
      data: {
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion?.trim() || null,
        duracionMinutos: datos.duracionMinutos,
        precio: datos.precio
      }
    });
  } catch (error) {
    if (error.code === "P2002") {
      const conflicto = new Error("Ya existe un tratamiento con ese nombre");
      conflicto.status = 409;
      throw conflicto;
    }

    throw error;
  }
}

async function modificarTratamiento(id, datos) {
  const tratamiento = await prisma.tratamiento.findUnique({
    where: { id }
  });

  if (!tratamiento) {
    const error = new Error("Tratamiento no encontrado");
    error.status = 404;
    throw error;
  }

  try {
    return await prisma.tratamiento.update({
      where: { id },
      data: {
        ...(datos.nombre !== undefined && { nombre: datos.nombre.trim() }),
        ...(datos.descripcion !== undefined && {
          descripcion: datos.descripcion?.trim() || null
        }),
        ...(datos.duracionMinutos !== undefined && {
          duracionMinutos: datos.duracionMinutos
        }),
        ...(datos.precio !== undefined && { precio: datos.precio })
      }
    });
  } catch (error) {
    if (error.code === "P2002") {
      const conflicto = new Error("Ya existe un tratamiento con ese nombre");
      conflicto.status = 409;
      throw conflicto;
    }

    throw error;
  }
}

async function desactivarTratamiento(id) {
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
    data: {
      activo: false
    }
  });
}

module.exports = {
  obtenerTratamientos,
  obtenerTratamientoPorId,
  crearTratamiento,
  modificarTratamiento,
  desactivarTratamiento
};
