
function autorizar(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        error: "Debes iniciar sesión"
      });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        error: "No tienes permisos para realizar esta operación"
      });
    }

    next();
  };
}

module.exports = autorizar;
