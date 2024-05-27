export const estaAutenticado = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    res.status(401).json({ error: "Usuario no autenticado" });
  }
};
