import 'dotenv/config';
import express from 'express';

import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import { rutaNoEncontrada, manejadorDeErrores } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Ruta de salud / raíz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de usuarios funcionando correctamente' });
});

// Rutas de la API
app.use('/usuarios', usuarioRoutes);

// Manejo de rutas no encontradas y errores
app.use(rutaNoEncontrada);
app.use(manejadorDeErrores);

// Conexión a la base de datos y arranque del servidor
const iniciarServidor = async () => {
  await conectarDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

iniciarServidor();
