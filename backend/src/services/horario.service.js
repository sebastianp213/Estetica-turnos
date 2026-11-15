const prisma = require("../config/database");

const diasValidos = [
  "LUNES",
  "MARTES",
  "MIERCOLES",
  "JUEVES",
  "VIERNES",
  "SABADO",
  "DOMINGO"
];

function errorConEstado(mensaje, status) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

function convertirHora(hora) {
  const [horas, minutos] = hora.split(":").map(Number);
  return new Date(Date.UTC(1970, 0, 1, horas, minutos, 0));
}

function formatearHorario(horario) {
  return {
    ...horario,
    horaInicio: horario.horaInicio.toISOString().substring(11, 16),
    horaFin: horario.horaFin.toISOString().substring(11, 16)
  };
}

async function verificarProfesional(profesionalId) {
  const profesional = await prisma.profesional.findFirst({
    where: {
      id: profesionalId,
      activo: true
    }
  });

  if (!profesional) {
    throw errorConEstado("Profesional no encontrado o inactivo", 404);
  }
}

async function listarHorarios(profesionalId) {
  await verificarProfesional(profesionalId);

  const horarios = await prisma.horarioAtencion.findMany({
    where: { profesionalId },
    orderBy: { diaSemana: "asc" }
  });

  return horarios.map(formatearHorario);
}

async function crearHorario(profesionalId, datos) {
  await verificarProfesional(profesionalId);

  try {
    const horario = await prisma.horarioAtencion.create({
      data: {
        profesionalId,
        diaSemana: datos.diaSemana,
        horaInicio: convertirHora(datos.horaInicio),
        horaFin: convertirHora(datos.horaFin)
      }
    });

    return formatearHorario(horario);
  } catch (error) {
    if (error.code === "P2002") {
      throw errorConEstado(
        "El profesional ya tiene un horario configurado para ese día",
        409
      );
    }

    throw error;
  }
}

async function modificarHorario(profesionalId, horarioId, datos) {
  await verificarProfesional(profesionalId);

  const existente = await prisma.horarioAtencion.findFirst({
    where: {
      id: horarioId,
      profesionalId
    }
  });

  if (!existente) {
    throw errorConEstado("Horario no encontrado", 404);
  }

  try {
    const horario = await prisma.horarioAtencion.update({
      where: { id: horarioId },
      data: {
        diaSemana: datos.diaSemana,
        horaInicio: convertirHora(datos.horaInicio),
        horaFin: convertirHora(datos.horaFin)
      }
    });

    return formatearHorario(horario);
  } catch (error) {
    if (error.code === "P2002") {
      throw errorConEstado(
        "El profesional ya tiene un horario configurado para ese día",
        409
      );
    }

    throw error;
  }
}

async function eliminarHorario(profesionalId, horarioId) {
  await verificarProfesional(profesionalId);

  const existente = await prisma.horarioAtencion.findFirst({
    where: {
      id: horarioId,
      profesionalId
    }
  });

  if (!existente) {
    throw errorConEstado("Horario no encontrado", 404);
  }

  return prisma.horarioAtencion.delete({
    where: { id: horarioId }
  });
}

module.exports = {
  diasValidos,
  listarHorarios,
  crearHorario,
  modificarHorario,
  eliminarHorario
};