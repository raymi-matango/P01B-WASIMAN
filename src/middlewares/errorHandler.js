export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: "Ocurrió un error en el servidor",
    message: process.env.NODE_ENV === 'production' ? undefined : err.message,
  });
};
