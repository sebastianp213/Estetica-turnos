
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");

const app = express();

// Seguridad HTTP
app.use(helmet());

// Configuración CORS
const origenesPermitidos = [
  "http://localhost:5173",
  "https://estetica-turnos-z6fw.onrender.com",
];

app.use(
  cors({
    origin: origenesPermitidos,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Limitar tamaño de las peticiones JSON
app.use(express.json({ limit: "10kb" }));

// Limitador general de API
const limiteGeneral = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Demasiadas solicitudes. Intentá nuevamente más tarde.",
  },
});

// Limitador para inicio de sesión
const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Demasiados intentos de inicio de sesión. Esperá 15 minutos.",
  },
});

// Limitador para registro
const limiteRegistro = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Se alcanzó el límite de registros. Intentá nuevamente más tarde.",
  },
});

// Aplicar limitadores
app.use("/api", limiteGeneral);
app.use("/api/auth/login", limiteLogin);
app.use("/api/usuarios/registro", limiteRegistro);

// Rutas de API
app.use("/api", routes);

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Estetica Turnos funcionando correctamente",
  });
});

// Rutas inexistentes
app.use((req, res) => {
  return res.status(404).json({
    error: "La ruta solicitada no existe",
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error("Error interno:", error);

  if (res.headersSent) {
    return next(error);
  }

  // Errores de CORS
  if (error.message === "Origen no permitido por CORS") {
    return res.status(403).json({
      error: "Origen no autorizado",
    });
  }

  // Errores de solicitudes mal formadas
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "La solicitud contiene datos inválidos",
    });
  }

  // Peticiones demasiado grandes
  if (error.type === "entity.too.large") {
    return res.status(413).json({
      error: "La solicitud es demasiado grande",
    });
  }

  return res.status(500).json({
    error: "Ocurrió un error interno del servidor",
  });
});

module.exports = app;
