export const estaAutenticado = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    res.status(401).json({ error: "Usuario no autenticado" });
  }
};

export const estaAutorizado = (req, res, next) => {
  const usuarioId = req.session.userId;
  const perfilId = parseInt(req.params.id);

  if (usuarioId === perfilId) {
    return next();
  } else {
    res
      .status(403)
      .json({ error: "No tienes permiso para realizar esta acción" });
  }
};

export const estaAutenticadoBueno = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
};
