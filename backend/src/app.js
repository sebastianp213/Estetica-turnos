
const express = require("express");

const app = express();

// Middlewares generales
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Estetica Turnos funcionando correctamente"
  });
});

module.exports = app;
