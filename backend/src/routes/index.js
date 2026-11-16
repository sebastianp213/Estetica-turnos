const express = require("express");

const { registrar } = require("../controllers/usuario.controller");
const { login } = require("../controllers/auth.controller");
const tratamientos = require("../controllers/tratamiento.controller");
const profesionales = require("../controllers/profesional.controller");
const horarios = require("../controllers/horario.controller");

const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

const reservas = require("../controllers/reserva.controller");

const router = express.Router();

// Comprobación de la API
router.get("/", (req, res) => {
  res.json({
    mensaje: "API de Estetica Turnos funcionando correctamente"
  });
});

// Registro de clientes
router.post("/usuarios/registro", registrar);

// Inicio de sesión
router.post("/auth/login", login);

// Perfil de usuario autenticado
router.get("/auth/perfil", autenticar, (req, res) => {
  res.json({
    usuario: req.usuario
  });
});

// Ruta de prueba exclusiva para administradores
router.get(
  "/auth/admin",
  autenticar,
  autorizar("ADMIN"),
  (req, res) => {
    res.json({
      mensaje: "Acceso autorizado para administradores"
    });
  }
);

// Consulta pública de tratamientos
router.get("/tratamientos", tratamientos.listar);
router.get("/tratamientos/:id", tratamientos.obtenerUno);

// Administración de tratamientos
router.post(
  "/tratamientos",
  autenticar,
  autorizar("ADMIN"),
  tratamientos.crear
);

router.put(
  "/tratamientos/:id",
  autenticar,
  autorizar("ADMIN"),
  tratamientos.modificar
);

router.patch(
  "/tratamientos/:id/desactivar",
  autenticar,
  autorizar("ADMIN"),
  tratamientos.desactivar
);

// Consulta pública de profesionales
router.get("/profesionales", profesionales.listar);
router.get("/profesionales/:id", profesionales.obtenerUno);

// Administración de profesionales
router.post(
  "/profesionales",
  autenticar,
  autorizar("ADMIN"),
  profesionales.crear
);

router.put(
  "/profesionales/:id",
  autenticar,
  autorizar("ADMIN"),
  profesionales.modificar
);

router.patch(
  "/profesionales/:id/estado",
  autenticar,
  autorizar("ADMIN"),
  profesionales.cambiarEstado
);

// Asociación de profesionales con tratamientos
router.post(
  "/profesionales/:id/tratamientos",
  autenticar,
  autorizar("ADMIN"),
  profesionales.asociarTratamiento
);

router.delete(
  "/profesionales/:id/tratamientos/:tratamientoId",
  autenticar,
  autorizar("ADMIN"),
  profesionales.quitarTratamiento
);

// Consulta pública de horarios
router.get(
  "/profesionales/:id/horarios",
  horarios.listar
);

// Administración de horarios
router.post(
  "/profesionales/:id/horarios",
  autenticar,
  autorizar("ADMIN"),
  horarios.crear
);

// Consulta de reservas según el rol
router.get(
  "/reservas",
  autenticar,
  autorizar("CLIENTE", "PROFESIONAL", "ADMIN"),
  reservas.listar
);

// Cancelación de reservas por clientes
router.patch(
  "/reservas/:id/cancelar",
  autenticar,
  autorizar("CLIENTE"),
  reservas.cancelar
);

// Cancelación de reservas por administradores
router.patch(
  "/reservas/:id/cancelar-admin",
  autenticar,
  autorizar("ADMIN"),
  reservas.cancelarAdmin
);

// Completar turnos: profesional asignado o administrador
router.patch(
  "/reservas/:id/completar",
  autenticar,
  autorizar("PROFESIONAL", "ADMIN"),
  reservas.completar
);




router.put(
  "/profesionales/:id/horarios/:horarioId",
  autenticar,
  autorizar("ADMIN"),
  horarios.modificar
);

router.delete(
  "/profesionales/:id/horarios/:horarioId",
  autenticar,
  autorizar("ADMIN"),
  horarios.eliminar
);

// Consulta pública de disponibilidad
router.get(
  "/disponibilidad",
  reservas.disponibilidad
);

// Creación de reservas para clientes autenticados
router.post(
  "/reservas",
  autenticar,
  autorizar("CLIENTE"),
  reservas.crear
);


module.exports = router;