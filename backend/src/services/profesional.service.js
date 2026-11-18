const prisma = require("../config/database");
const bcrypt = require("bcryptjs");

function errorConEstado(mensaje, status) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

async function listarProfesionales() {
  return prisma.profesional.findMany({
    where: { activo: true },
    include: {
      usuario: {
        select: {
          id: true,
          nombre: true
        }
      },
      tratamientos: {
        where: {
          tratamiento: { activo: true }
        },
        include: {
          tratamiento: true
        }
      },
      horarios: true
    },
    orderBy: {
      id: "asc"
    }
  });
}

async function obtenerProfesionalPorId(id) {
  return prisma.profesional.findFirst({
    where: {
      id,
      activo: true
    },
    include: {
      usuario: {
        select: {
          id: true,
          nombre: true
        }
      },
      tratamientos: {
        where: {
          tratamiento: { activo: true }
        },
        include: {
          tratamiento: true
        }
      },
      horarios: true
    }
  });
}

async function crearProfesional(datos) {
  return prisma.$transaction(async (tx) => {
    const cantidad = await tx.profesional.count();

    if (cantidad >= 2) {
      throw errorConEstado(
        "El centro ya tiene registrados los dos profesionales permitidos",
        409
      );
    }

    const existente = await tx.usuario.findUnique({
      where: { email: datos.email }
    });

    if (existente) {
      throw errorConEstado("El email ya está registrado", 409);
    }

    const passwordHash = await bcrypt.hash(datos.password, 10);

    const usuario = await tx.usuario.create({
      data: {
        nombre: datos.nombre.trim(),
        email: datos.email.trim().toLowerCase(),
        passwordHash,
        rol: "PROFESIONAL"
      }
    });

    const profesional = await tx.profesional.create({
      data: {
        usuarioId: usuario.id,
        descripcion: datos.descripcion?.trim() || null
      },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true
          }
        }
      }
    });

    return profesional;
  });
}

async function modificarProfesional(id, datos) {
  const profesional = await prisma.profesional.findUnique({
    where: { id },
    include: { usuario: true }
  });

  if (!profesional) {
    throw errorConEstado("Profesional no encontrado", 404);
  }

  if (datos.email !== undefined) {
    const email = datos.email.trim().toLowerCase();

    const existente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (existente && existente.id !== profesional.usuarioId) {
      throw errorConEstado("El email ya está registrado", 409);
    }
  }

  return prisma.$transaction(async (tx) => {
    await tx.usuario.update({
      where: { id: profesional.usuarioId },
      data: {
        ...(datos.nombre !== undefined && {
          nombre: datos.nombre.trim()
        }),
        ...(datos.email !== undefined && {
          email: datos.email.trim().toLowerCase()
        })
      }
    });

    return tx.profesional.update({
      where: { id },
      data: {
        ...(datos.descripcion !== undefined && {
          descripcion: datos.descripcion?.trim() || null
        })
      },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true
          }
        }
      }
    });
  });
}

async function cambiarEstadoProfesional(id, activo) {
  const profesional = await prisma.profesional.findUnique({
    where: { id }
  });

  if (!profesional) {
    throw errorConEstado("Profesional no encontrado", 404);
  }

  return prisma.$transaction(async (tx) => {
    await tx.usuario.update({
      where: { id: profesional.usuarioId },
      data: { activo }
    });

    return tx.profesional.update({
      where: { id },
      data: { activo }
    });
  });
}

async function asociarTratamiento(profesionalId, tratamientoId) {
  const profesional = await prisma.profesional.findUnique({
    where: { id: profesionalId }
  });

  if (!profesional || !profesional.activo) {
    throw errorConEstado("Profesional no encontrado o inactivo", 404);
  }

  const tratamiento = await prisma.tratamiento.findUnique({
    where: { id: tratamientoId }
  });

  if (!tratamiento || !tratamiento.activo) {
    throw errorConEstado("Tratamiento no encontrado o inactivo", 404);
  }

  try {
    return await prisma.profesionalTratamiento.create({
      data: {
        profesionalId,
        tratamientoId
      },
      include: {
        tratamiento: true
      }
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw errorConEstado(
        "El profesional ya tiene asociado ese tratamiento",
        409
      );
    }

    throw error;
  }
}

async function quitarTratamiento(profesionalId, tratamientoId) {
  const asociacion = await prisma.profesionalTratamiento.findUnique({
    where: {
      profesionalId_tratamientoId: {
        profesionalId,
        tratamientoId
      }
    }
  });

  if (!asociacion) {
    throw errorConEstado("La asociación no existe", 404);
  }

  return prisma.profesionalTratamiento.delete({
    where: {
      profesionalId_tratamientoId: {
        profesionalId,
        tratamientoId
      }
    }
  });
}

module.exports = {
  listarProfesionales,
  obtenerProfesionalPorId,
  crearProfesional,
  modificarProfesional,
  cambiarEstadoProfesional,
  asociarTratamiento,
  quitarTratamiento
};