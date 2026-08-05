import { Router } from 'express';

import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuariosPorCiudad,
} from '../controllers/usuarioController.js';

const router = Router();

// IMPORTANTE: /buscar debe ir ANTES de /:id, si no Express
// interpretaría "buscar" como si fuera un ID.
router.get('/buscar', buscarUsuariosPorCiudad);

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;
