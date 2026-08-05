// Middleware para rutas no definidas
export const rutaNoEncontrada = (req, res, next) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

// Middleware genérico de manejo de errores (por si algo no se captura en el controlador)
export const manejadorDeErrores = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor' });
};
