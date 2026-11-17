
const express = require("express");

const { registrar } = require("../controllers/usuario.controller");
const { login } = require("../controllers/auth.controller");
const tratamientos = require("../controllers/tratamiento.controller");
const profesionales = require("../controllers/profesional.controller");
const horarios = require("../controllers/horario.controller");
const reservas = require("../controllers/reserva.controller");
const admin = require("../controllers/admin.controller");

const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

const router = express.Router();

// Comprobación de la API
router.get("/", (req, res) => {
  res.json({
    mensaje: "API de Estetica Turnos funcionando correctamente"
  });
});

// Registro e inicio de sesión
router.post("/usuarios/registro", registrar);
router.post("/auth/login", login);

// Perfil autenticado
router.get("/auth/perfil", autenticar, (req, res) => {
  res.json({ usuario: req.usuario });
});

// Ruta de prueba para administradores
router.get(
  "/auth/admin",
  autenticar,
  autorizar("ADMIN"),
  (req, res) => {
    res.json({ mensaje: "Acceso autorizado para administradores" });
  }
);

// Consultas públicas de tratamientos
router.get("/tratamientos", tratamientos.listar);
router.get("/tratamientos/:id", tratamientos.obtenerUno);

// Administración de tratamientos
router.get(
  "/admin/tratamientos",
  autenticar,
  autorizar("ADMIN"),
  admin.listarTratamientos
);

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

router.patch(
  "/admin/tratamientos/:id/estado",
  autenticar,
  autorizar("ADMIN"),
  admin.cambiarEstadoTratamiento
);

// Consultas públicas de profesionales
router.get("/profesionales", profesionales.listar);
router.get("/profesionales/:id", profesionales.obtenerUno);

// Administración de profesionales
router.get(
  "/admin/profesionales",
  autenticar,
  autorizar("ADMIN"),
  admin.listarProfesionales
);

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

// Horarios
router.get("/profesionales/:id/horarios", horarios.listar);

router.post(
  "/profesionales/:id/horarios",
  autenticar,
  autorizar("ADMIN"),
  horarios.crear
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

// Reservas
router.get(
  "/reservas",
  autenticar,
  autorizar("CLIENTE", "PROFESIONAL", "ADMIN"),
  reservas.listar
);

router.post(
  "/reservas",
  autenticar,
  autorizar("CLIENTE"),
  reservas.crear
);

router.patch(
  "/reservas/:id/cancelar",
  autenticar,
  autorizar("CLIENTE"),
  reservas.cancelar
);

router.patch(
  "/reservas/:id/cancelar-admin",
  autenticar,
  autorizar("ADMIN"),
  reservas.cancelarAdmin
);

router.patch(
  "/reservas/:id/completar",
  autenticar,
  autorizar("PROFESIONAL", "ADMIN"),
  reservas.completar
);

// Disponibilidad pública
router.get("/disponibilidad", reservas.disponibilidad);

module.exports = router;
