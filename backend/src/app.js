const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Estetica Turnos funcionando correctamente"
  });
});

module.exports = app;