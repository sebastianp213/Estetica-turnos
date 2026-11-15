
const express = require("express");

const { registrar } = require("../controllers/usuario.controller");
const { login } = require("../controllers/auth.controller");

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

// Ruta protegida para cualquier usuario autenticado
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

module.exports = router;
