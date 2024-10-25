import express from 'express';
import UsuariosTipoController from '../../controllers/usuariosTipoController.js';

const usuariosTipoRouter = express.Router();

const usuariosTipoController = new UsuariosTipoController();

/**
 * @swagger
 * /usuariostipo:
 *   get:
 *     summary: Obtener todos los tipos de usuarios
 *     tags: [UsuariosTipo]
 *     responses:
 *       200:
 *         description: Lista de tipos de usuarios
 */
usuariosTipoRouter.get('/', usuariosTipoController.getUsuariosTipo);

/**
 * @swagger
 * /usuariostipo/{id}:
 *   get:
 *     summary: Obtener un tipo de usuario por ID
 *     tags: [UsuariosTipo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del tipo de usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de usuario encontrado
 *       404:
 *         description: Tipo de usuario no encontrado
 */
usuariosTipoRouter.get('/:id', usuariosTipoController.getUsuariosTipoId);

/**
 * @swagger
 * /usuariostipo:
 *   post:
 *     summary: Agregar un nuevo tipo de usuario
 *     tags: [UsuariosTipo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del tipo de usuario
 *     responses:
 *       201:
 *         description: Tipo de usuario creado
 */
usuariosTipoRouter.post('/', usuariosTipoController.addUsuariosTipo);

/**
 * @swagger
 * /usuariostipo/{id}:
 *   delete:
 *     summary: Eliminar un tipo de usuario por ID
 *     tags: [UsuariosTipo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del tipo de usuario
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tipo de usuario eliminado
 *       404:
 *         description: Tipo de usuario no encontrado
 */
usuariosTipoRouter.delete('/:id', usuariosTipoController.deleteUsuariosTipo);

/**
 * @swagger
 * /usuariostipo/{id}:
 *   patch:
 *     summary: Actualizar un tipo de usuario por ID
 *     tags: [UsuariosTipo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del tipo de usuario
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
 *                 description: Nombre del tipo de usuario
 *     responses:
 *       200:
 *         description: Tipo de usuario actualizado
 *       404:
 *         description: Tipo de usuario no encontrado
 */
usuariosTipoRouter.patch('/:id', usuariosTipoController.updateUsuariosTipo);

export default usuariosTipoRouter;