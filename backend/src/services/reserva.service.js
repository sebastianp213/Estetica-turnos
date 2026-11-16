
const prisma = require("../config/database");

const INTERVALO_MINUTOS = 30;
const MAX_DIAS_ANTICIPACION = 30;
const HORAS_CANCELACION = 24;

const diasSemana = [
  "DOMINGO",
  "LUNES",
  "MARTES",
  "MIERCOLES",
  "JUEVES",
  "VIERNES",
  "SABADO"
];

function errorConEstado(mensaje, status) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

function validarFecha(fecha) {
  if (
    typeof fecha !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(fecha)
  ) {
    throw errorConEstado("La fecha debe tener formato YYYY-MM-DD", 400);
  }

  const [anio, mes, dia] = fecha.split("-").map(Number);
  const comprobacion = new Date(Date.UTC(anio, mes - 1, dia));

  if (comprobacion.toISOString().substring(0, 10) !== fecha) {
    throw errorConEstado("La fecha indicada no es válida", 400);
  }

  return { anio, mes, dia };
}

function validarHora(hora) {
  if (
    typeof hora !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(hora)
  ) {
    throw errorConEstado("La hora debe tener formato HH:mm", 400);
  }

  const [horas, minutos] = hora.split(":").map(Number);
  return horas * 60 + minutos;
}

function obtenerDiaSemana(fecha) {
  const { anio, mes, dia } = validarFecha(fecha);
  return diasSemana[new Date(Date.UTC(anio, mes - 1, dia)).getUTCDay()];
}

function convertirFechaHora(fecha, hora) {
  return new Date(`${fecha}T${hora}:00-03:00`);
}

function minutosDeHorario(horario) {
  return horario.getUTCHours() * 60 + horario.getUTCMinutes();
}

function formatearHora(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;

  return `${String(horas).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}

function validarAnticipacion(inicio) {
  const ahora = new Date();
  const limite = new Date(
    ahora.getTime() + MAX_DIAS_ANTICIPACION * 24 * 60 * 60 * 1000
  );

  if (inicio <= ahora) {
    throw errorConEstado("No se pueden reservar horarios pasados", 400);
  }

  if (inicio > limite) {
    throw errorConEstado(
      "Solo se pueden reservar turnos dentro de los próximos 30 días",
      400
    );
  }
}

async function obtenerContexto(tx, profesionalId, tratamientoId, fecha) {
  const profesional = await tx.profesional.findFirst({
    where: {
      id: profesionalId,
      activo: true,
      usuario: { activo: true }
    }
  });

  if (!profesional) {
    throw errorConEstado("Profesional no encontrado o inactivo", 404);
  }

  const tratamiento = await tx.tratamiento.findFirst({
    where: {
      id: tratamientoId,
      activo: true
    }
  });

  if (!tratamiento) {
    throw errorConEstado("Tratamiento no encontrado o inactivo", 404);
  }

  const asociacion = await tx.profesionalTratamiento.findUnique({
    where: {
      profesionalId_tratamientoId: {
        profesionalId,
        tratamientoId
      }
    }
  });

  if (!asociacion) {
    throw errorConEstado(
      "El profesional no está habilitado para realizar ese tratamiento",
      400
    );
  }

  const horario = await tx.horarioAtencion.findUnique({
    where: {
      profesionalId_diaSemana: {
        profesionalId,
        diaSemana: obtenerDiaSemana(fecha)
      }
    }
  });

  return { profesional, tratamiento, horario };
}

async function obtenerDisponibilidad(datos) {
  const { profesionalId, tratamientoId, fecha } = datos;

  validarFecha(fecha);

  const inicioDia = convertirFechaHora(fecha, "00:00");

  const limite = new Date(
    Date.now() + MAX_DIAS_ANTICIPACION * 24 * 60 * 60 * 1000
  );

  if (inicioDia > limite) {
    throw errorConEstado(
      "La fecha supera los 30 días de anticipación permitidos",
      400
    );
  }

  const { tratamiento, horario } = await obtenerContexto(
    prisma,
    profesionalId,
    tratamientoId,
    fecha
  );

  if (!horario) {
    return [];
  }

  const horaInicio = minutosDeHorario(horario.horaInicio);
  const horaFin = minutosDeHorario(horario.horaFin);
  const duracion = tratamiento.duracionMinutos;

  const siguienteDia = new Date(
    inicioDia.getTime() + 24 * 60 * 60 * 1000
  );

  const reservas = await prisma.reserva.findMany({
    where: {
      profesionalId,
      estado: "CONFIRMADO",
      inicio: { lt: siguienteDia },
      fin: { gt: inicioDia }
    },
    select: {
      inicio: true,
      fin: true
    }
  });

  const disponibles = [];
  const ahora = new Date();

  for (
    let minuto = horaInicio;
    minuto + duracion <= horaFin;
    minuto += INTERVALO_MINUTOS
  ) {
    const hora = formatearHora(minuto);
    const fin = formatearHora(minuto + duracion);

    const inicioDate = convertirFechaHora(fecha, hora);
    const finDate = convertirFechaHora(fecha, fin);

    if (inicioDate <= ahora || inicioDate > limite) {
      continue;
    }

    const ocupado = reservas.some((reserva) =>
      inicioDate < reserva.fin && finDate > reserva.inicio
    );

    if (!ocupado) {
      disponibles.push({
        horaInicio: hora,
        horaFin: fin
      });
    }
  }

  return disponibles;
}

async function crearReserva(clienteId, datos) {
  const { profesionalId, tratamientoId, fecha, horaInicio } = datos;

  validarFecha(fecha);
  const minutoInicio = validarHora(horaInicio);

  const inicio = convertirFechaHora(fecha, horaInicio);

  validarAnticipacion(inicio);

  return prisma.$transaction(async (tx) => {
    await tx.$queryRaw`
      SELECT id
      FROM profesionales
      WHERE id = ${profesionalId}
      FOR UPDATE
    `;

    const { tratamiento, horario } = await obtenerContexto(
      tx,
      profesionalId,
      tratamientoId,
      fecha
    );

    if (!horario) {
      throw errorConEstado(
        "El profesional no tiene horario de atención ese día",
        409
      );
    }

    const horaAtencionInicio = minutosDeHorario(horario.horaInicio);
    const horaAtencionFin = minutosDeHorario(horario.horaFin);

    const minutoFin = minutoInicio + tratamiento.duracionMinutos;

    if (
      minutoInicio < horaAtencionInicio ||
      minutoFin > horaAtencionFin
    ) {
      throw errorConEstado(
        "El turno debe estar completamente dentro del horario de atención",
        400
      );
    }

    const fin = new Date(
      inicio.getTime() + tratamiento.duracionMinutos * 60 * 1000
    );

    const superpuesta = await tx.reserva.findFirst({
      where: {
        profesionalId,
        estado: "CONFIRMADO",
        inicio: { lt: fin },
        fin: { gt: inicio }
      }
    });

    if (superpuesta) {
      throw errorConEstado(
        "El horario seleccionado ya no está disponible",
        409
      );
    }

    return tx.reserva.create({
      data: {
        clienteId,
        profesionalId,
        tratamientoId,
        inicio,
        fin,
        precioAplicado: tratamiento.precio,
        estado: "CONFIRMADO"
      },
      include: {
        profesional: {
          include: {
            usuario: {
              select: { nombre: true }
            }
          }
        },
        tratamiento: true
      }
    });
  });
}

// Datos que se muestran al consultar una reserva.
const incluirDetalles = {
  cliente: {
    select: {
      id: true,
      nombre: true,
      email: true
    }
  },
  profesional: {
    include: {
      usuario: {
        select: {
          id: true,
          nombre: true,
          email: true
        }
      }
    }
  },
  tratamiento: true
};

// T28: consulta de reservas según el rol.
async function listarReservas(usuario) {
  let where = {};

  if (usuario.rol === "CLIENTE") {
    where.clienteId = usuario.id;
  } else if (usuario.rol === "PROFESIONAL") {
    const profesional = await prisma.profesional.findUnique({
      where: { usuarioId: usuario.id }
    });

    if (!profesional) {
      throw errorConEstado("No existe un perfil profesional asociado", 403);
    }

    where.profesionalId = profesional.id;
  } else if (usuario.rol !== "ADMIN") {
    throw errorConEstado("No tienes permisos para consultar reservas", 403);
  }

  return prisma.reserva.findMany({
    where,
    include: incluirDetalles,
    orderBy: {
      inicio: "asc"
    }
  });
}

// T29: cancelación por parte del cliente.
async function cancelarReservaCliente(reservaId, clienteId) {
  const reserva = await prisma.reserva.findUnique({
    where: { id: reservaId }
  });

  if (!reserva || reserva.clienteId !== clienteId) {
    throw errorConEstado("Reserva no encontrada", 404);
  }

  if (reserva.estado !== "CONFIRMADO") {
    throw errorConEstado(
      "Solo se pueden cancelar reservas confirmadas",
      409
    );
  }

  const horasRestantes =
    (reserva.inicio.getTime() - Date.now()) / (60 * 60 * 1000);

  if (horasRestantes < HORAS_CANCELACION) {
    throw errorConEstado(
      "La cancelación debe realizarse con al menos 24 horas de anticipación",
      400
    );
  }

  const resultado = await prisma.reserva.updateMany({
    where: {
      id: reservaId,
      clienteId,
      estado: "CONFIRMADO"
    },
    data: {
      estado: "CANCELADO"
    }
  });

  if (resultado.count === 0) {
    throw errorConEstado(
      "La reserva ya fue modificada y no se puede cancelar",
      409
    );
  }

  return prisma.reserva.findUnique({
    where: { id: reservaId },
    include: incluirDetalles
  });
}

// T30: cancelación administrativa, sin límite de 24 horas.
async function cancelarReservaAdmin(reservaId) {
  const reserva = await prisma.reserva.findUnique({
    where: { id: reservaId }
  });

  if (!reserva) {
    throw errorConEstado("Reserva no encontrada", 404);
  }

  if (reserva.estado !== "CONFIRMADO") {
    throw errorConEstado(
      "Solo se pueden cancelar reservas confirmadas",
      409
    );
  }

  const resultado = await prisma.reserva.updateMany({
    where: {
      id: reservaId,
      estado: "CONFIRMADO"
    },
    data: {
      estado: "CANCELADO"
    }
  });

  if (resultado.count === 0) {
    throw errorConEstado(
      "La reserva ya fue modificada y no se puede cancelar",
      409
    );
  }

  return prisma.reserva.findUnique({
    where: { id: reservaId },
    include: incluirDetalles
  });
}

// T31 y T32: completar una reserva.
async function completarReserva(reservaId, usuario) {
  const reserva = await prisma.reserva.findUnique({
    where: { id: reservaId },
    include: {
      profesional: true
    }
  });

  if (!reserva) {
    throw errorConEstado("Reserva no encontrada", 404);
  }

  if (
    usuario.rol === "PROFESIONAL" &&
    reserva.profesional.usuarioId !== usuario.id
  ) {
    throw errorConEstado(
      "Solo el profesional asignado puede completar esta reserva",
      403
    );
  }

  if (reserva.estado !== "CONFIRMADO") {
    throw errorConEstado(
      "Solo se pueden completar reservas confirmadas",
      409
    );
  }

  const resultado = await prisma.reserva.updateMany({
    where: {
      id: reservaId,
      estado: "CONFIRMADO"
    },
    data: {
      estado: "COMPLETADO"
    }
  });

  if (resultado.count === 0) {
    throw errorConEstado(
      "La reserva ya fue modificada y no se puede completar",
      409
    );
  }

  return prisma.reserva.findUnique({
    where: { id: reservaId },
    include: incluirDetalles
  });
}

module.exports = {
  obtenerDisponibilidad,
  crearReserva,
  listarReservas,
  cancelarReservaCliente,
  cancelarReservaAdmin,
  completarReserva
};
