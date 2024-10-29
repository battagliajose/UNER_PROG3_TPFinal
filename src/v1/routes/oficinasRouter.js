import express from 'express';
import OficinasController from '../../controllers/oficinasController.js';

const oficinasRouter = express.Router();

const oficinasController = new OficinasController();

/**
 * @swagger
 * /oficinas:
 *   get:
 *     summary: Obtener todas las oficinas
 *     tags: [Oficinas]
 *     responses:
 *       200:
 *         description: Lista de oficinas
 */
oficinasRouter.get('/', oficinasController.getOficinas);

/**
 * @swagger
 * /v1/oficinas/{id}:
 *   get:
 *     summary: Obtener una oficina por ID
 *     tags: [Oficinas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oficina
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oficina encontrada
 *       404:
 *         description: Oficina no encontrada
 */
oficinasRouter.get('/:id', oficinasController.getOficinaById);

/**
 * @swagger
 * /v1/oficinas:
 *   post:
 *     summary: Agregar una nueva oficina
 *     tags: [Oficinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la oficina
 *               direccion:
 *                 type: string
 *                 description: Dirección de la oficina
 *     responses:
 *       201:
 *         description: Oficina creada
 */
oficinasRouter.post('/', oficinasController.addOficina);

/**
 * @swagger
 * /v1/oficinas/{id}:
 *   delete:
 *     summary: Eliminar una oficina por ID
 *     tags: [Oficinas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oficina
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Oficina eliminada
 *       404:
 *         description: Oficina no encontrada
 */
oficinasRouter.delete('/:id', oficinasController.deleteOficina);

/**
 * @swagger
 * /v1/oficinas/{id}:
 *   patch:
 *     summary: Actualizar una oficina por ID
 *     tags: [Oficinas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oficina
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
 *                 description: Nombre de la oficina
 *               direccion:
 *                 type: string
 *                 description: Dirección de la oficina
 *     responses:
 *       200:
 *         description: Oficina actualizada
 *       404:
 *         description: Oficina no encontrada
 */
oficinasRouter.patch('/:id', oficinasController.updateOficina);

export default oficinasRouter;