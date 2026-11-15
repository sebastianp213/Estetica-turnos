
const jwt = require("jsonwebtoken");
const prisma = require("../config/database");

async function autenticar(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Se requiere un token de autenticación"
      });
    }

    const token = authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(payload.sub)
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        activo: true
      }
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        error: "Usuario inexistente o inactivo"
      });
    }

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado"
    });
  }
}

module.exports = autenticar;
