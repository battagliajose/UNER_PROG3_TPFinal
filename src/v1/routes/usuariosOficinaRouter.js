import express from 'express';
import UsuariosOficinasController from '../../controllers/usuariosOficinasController.js';

const usuariosOficinasRouter = express.Router();

const usuariosOficinasController = new UsuariosOficinasController();

/**
 * @swagger
 * /usuariosoficinas:
 *   get:
 *     summary: Obtener todos los usuarios de oficinas
 *     tags: [UsuariosOficinas]
 *     responses:
 *       200:
 *         description: Lista de usuarios de oficinas
 */
usuariosOficinasRouter.get('/', usuariosOficinasController.getUsuariosOficinas);

/**
 * @swagger
 * /usuariosoficinas/{id}:
 *   get:
 *     summary: Obtener un usuario de oficina por ID
 *     tags: [UsuariosOficinas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario de oficina
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario de oficina encontrado
 *       404:
 *         description: Usuario de oficina no encontrado
 */
usuariosOficinasRouter.get('/:id', usuariosOficinasController.getUsuariosOficinasId);

/**
 * @swagger
 * /usuariosoficinas:
 *   post:
 *     summary: Agregar un nuevo usuario de oficina
 *     tags: [UsuariosOficinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario de oficina
 *               idOficina:
 *                 type: integer
 *                 description: ID de la oficina a la que pertenece el usuario
 *     responses:
 *       201:
 *         description: Usuario de oficina creado
 */
usuariosOficinasRouter.post('/', usuariosOficinasController.addUsuariosOficinas);

/**
 * @swagger
 * /usuariosoficinas/{id}:
 *   delete:
 *     summary: Eliminar un usuario de oficina por ID
 *     tags: [UsuariosOficinas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario de oficina
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario de oficina eliminado
 *       404:
 *         description: Usuario de oficina no encontrado
 */
usuariosOficinasRouter.delete('/:id', usuariosOficinasController.deleteUsuariosOficinas);

/**
 * @swagger
 * /usuariosoficinas/{id}:
 *   patch:
 *     summary: Actualizar un usuario de oficina por ID
 *     tags: [UsuariosOficinas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario de oficina
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
 *                 description: Nombre del usuario de oficina
 *               idOficina:
 *                 type: integer
 *                 description: ID de la oficina a la que pertenece el usuario
 *     responses:
 *       200:
 *         description: Usuario de oficina actualizado
 *       404:
 *         description: Usuario de oficina no encontrado
 */
usuariosOficinasRouter.patch('/:id', usuariosOficinasController.updateUsuariosOficinas);

export default usuariosOficinasRouter;