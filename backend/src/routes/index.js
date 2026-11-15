
const express = require("express");

const { registrar } = require("../controllers/usuario.controller");
const { login } = require("../controllers/auth.controller");
const tratamientos = require("../controllers/tratamiento.controller");

const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

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

module.exports = router;
