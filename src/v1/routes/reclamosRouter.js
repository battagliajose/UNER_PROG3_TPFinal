import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';

const reclamosRouter = express.Router();
const reclamosController = new ReclamosController();

/**
 * @swagger
 * /reclamos:
 *   get: 
 *      summary: Obtener todos los reclamos
 *      tags: [Reclamos]
 *      security:
 *       - BearerAuth: []       
 *      responses:
 *       200:
 *         description: Lista de reclamos        
 */
reclamosRouter.get('/', reclamosController.getReclamo);

/**
 * @swagger
 * /reclamos/{id}:
 *   get:
 *     summary: Obtener un reclamo por ID
 *     tags: [Reclamos]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del reclamo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reclamo encontrado
 *       404:
 *         description: Reclamo no encontrado
 */
reclamosRouter.get('/:id', reclamosController.getReclamoById);

/**
 * @swagger
 * /reclamos:
 *   post:
 *     summary: Agregar un nuevo reclamo
 *     tags: [Reclamos]
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               asunto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               idReclamoEstado:
 *                 type: integer
 *               idReclamoTipo:
 *                 type: integer
 *               idUsuarioCreador:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reclamo creado
 */
reclamosRouter.post('/', reclamosController.addReclamo);

/**
 * @swagger
 * /reclamos/{id}:
 *   patch:
 *     summary: Actualizar un reclamo por ID
 *     tags: [Reclamos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del reclamo
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               asunto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               idReclamoEstado:
 *                 type: integer
 *               idReclamoTipo:
 *                 type: integer
 *               idUsuarioFinalizador:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Reclamo actualizado
 */
reclamosRouter.patch('/:id', reclamosController.updateReclamo);


export default reclamosRouter;
