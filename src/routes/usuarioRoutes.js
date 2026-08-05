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

/**
 * @swagger
 * /usuarios/buscar:
 *   get:
 *     summary: Buscar usuarios por ciudad
 *     description: Retorna todos los usuarios que tengan al menos una dirección en la ciudad indicada. La búsqueda no distingue mayúsculas/minúsculas.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: ciudad
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la ciudad a buscar
 *         example: Barranquilla
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Parámetro ciudad faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/buscar', buscarUsuariosPorCiudad);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un usuario con nombre, email, edad opcional y direcciones opcionales.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *           example:
 *             nombre: "Jhan Acuña"
 *             email: "jhan.acuna@example.com"
 *             edad: 28
 *             direcciones:
 *               - calle: "Av. Arequipa 1234"
 *                 ciudad: "Barranquilla"
 *                 pais: "Colombia"
 *                 codigo_postal: "15001"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación o campos requeridos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: El email ya está registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', crearUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener lista de usuarios
 *     description: Retorna todos los usuarios con paginación opcional.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Número de página
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista paginada de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginacionUsuarios'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', obtenerUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Retorna los datos de un usuario específico según su ID de MongoDB.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario (ObjectId de MongoDB)
 *         example: 64a1f2e3b4c5d6e7f8a9b0c1
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: ID de usuario inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', obtenerUsuarioPorId);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario existente. Solo se actualizan los campos enviados.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *         example: 64a1f2e3b4c5d6e7f8a9b0c1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *           example:
 *             nombre: "Jhan Carlos Acuña Actualizado"
 *             email: "Jhan.nuevo@example.com"
 *             edad: 29
 *             direcciones:
 *               - calle: "Nueva Calle 456"
 *                 ciudad: "Arequipa"
 *                 pais: "Colombia"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación o ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: El email ya está registrado por otro usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', actualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina permanentemente un usuario de la base de datos.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a eliminar
 *         example: 64a1f2e3b4c5d6e7f8a9b0c1
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Usuario eliminado correctamente"
 *       400:
 *         description: ID de usuario inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', eliminarUsuario);

export default router;