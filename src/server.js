import 'dotenv/config';
import express from 'express';

import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import { swaggerUi, swaggerSpec } from './config/swagger.js'; 
import { rutaNoEncontrada, manejadorDeErrores } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());


// Ruta de salud / raíz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de usuarios funcionando correctamente' });
});

// Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/usuarios', usuarioRoutes);

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
