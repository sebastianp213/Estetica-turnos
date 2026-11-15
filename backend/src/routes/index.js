
const express = require("express");
const { registrar } = require("../controllers/usuario.controller");

const router = express.Router();

// Ruta de prueba de la API
router.get("/", (req, res) => {
  res.json({
    mensaje: "API de Estetica Turnos funcionando correctamente"
  });
});

// Registro de clientes
router.post("/usuarios/registro", registrar);

module.exports = router;
