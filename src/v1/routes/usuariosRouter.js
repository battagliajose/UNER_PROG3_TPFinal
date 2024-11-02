import express from 'express';
import UsuariosController from '../../controllers/usuariosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';
import UserTypes from '../../config/userTypes.js';
import upload from '../../config/multer.js';

const usuariosRouter = express.Router();

const usuariosController = new UsuariosController();

/**
 * @swagger
 * /v1/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
usuariosRouter.get('/', autorizarUsuarios([UserTypes.ADMIN]), usuariosController.getUsuarios);

/**
 * @swagger
 * /v1/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
usuariosRouter.get('/:id', autorizarUsuarios([UserTypes.ADMIN]), usuariosController.getUsuarioById);

/**
 * @swagger
 * /v1/usuarios/{id}/oficinas:
 *   get:
 *     summary: Obtener oficinas de un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de oficinas del usuario
 *       404:
 *         description: Usuario no encontrado
 */
usuariosRouter.get('/:id/oficinas', autorizarUsuarios([UserTypes.ADMIN]), usuariosController.getOficinasUsuarioById);

/**
 * @swagger
 * /v1/usuarios:
 *   post:
 *     summary: Agregar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *     responses:
 *       201:
 *         description: Usuario creado
 */
usuariosRouter.post('/agregarEmpleado', autorizarUsuarios([UserTypes.ADMIN]), usuariosController.addEmpleado);

/**
 * @swagger
 * /v1/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
usuariosRouter.delete('/:id', autorizarUsuarios([UserTypes.ADMIN]), usuariosController.deleteUsuario);

/**
 * @swagger
 * /v1/usuarios/{id}:
 *   patch:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
usuariosRouter.patch('/:id', autorizarUsuarios([UserTypes.ADMIN, UserTypes.CLIENTE]), usuariosController.updateUsuario);

export default usuariosRouter;