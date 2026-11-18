const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const { PrismaClient } = require("@prisma/client");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("No se encuentra configurada la variable DATABASE_URL");
}

const databaseConfig = new URL(databaseUrl);

const requiereSSL =
  databaseConfig.searchParams.get("ssl-mode")?.toUpperCase() === "REQUIRED";

const adapter = new PrismaMariaDb({
  host: databaseConfig.hostname,
  port: Number(databaseConfig.port || 3306),
  user: decodeURIComponent(databaseConfig.username),
  password: decodeURIComponent(databaseConfig.password),
  database: decodeURIComponent(databaseConfig.pathname.replace(/^\/+/, "")),

  // Configuración del pool
  connectionLimit: 5,
  acquireTimeout: 10000,
  connectTimeout: 10000,

  // Conexión TLS para Enzonic
  ...(requiereSSL && {
    ssl: {
      servername: databaseConfig.hostname,
    },
  }),

  // Logging de errores, sin volcar paquetes de red
  logger: {
    error: (error) => {
      console.error("ERROR DEL ADAPTADOR MARIA DB:", error);
    },

    warning: (info) => {
      console.warn("ADVERTENCIA MARIA DB:", info);
    },
  },
});

const prisma = new PrismaClient({
  adapter,
});

module.exports = prisma;