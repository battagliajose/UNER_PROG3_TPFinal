import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';
import UserTypes from '../../config/userTypes.js';

const reclamosRouter = express.Router();
const reclamosController = new ReclamosController();

/**
 * @swagger
 * /v1/reclamos:
 *   get: 
 *      summary: Obtener todos los reclamos
 *      tags: [Reclamos]
 *      security:
 *       - BearerAuth: []       
 *      responses:
 *       200:
 *         description: Lista de reclamos        
 */
reclamosRouter.get('/', autorizarUsuarios([UserTypes.ADMIN, UserTypes.EMPLEADO, UserTypes.CLIENTE]), reclamosController.getReclamos);

/**
 * @swagger
 * /v1/reclamos/informe:
 *   get: 
 *     summary: Generar un informe de reclamos en el formato especificado
 *     tags: [Reclamos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: formato
 *         schema:
 *           type: string
 *           enum: [pdf, csv]
 *         required: true
 *         description: Formato del informe (pdf o csv)
 *     responses:
 *       200:
 *         description: Informe de reclamos en el formato solicitado
 *       400:
 *         description: Formato no válido o faltante
 */
reclamosRouter.get('/informe', autorizarUsuarios([UserTypes.ADMIN]), reclamosController.informe);

/**
 * @swagger
 * /v1/reclamos/informe:
 *   get: 
 *     summary: Generar un informe de reclamos en el formato especificado
 *     tags: [Reclamos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: formato
 *         schema:
 *           type: string
 *           enum: [pdf, csv]
 *         required: true
 *         description: Formato del informe (pdf o csv)
 *     responses:
 *       200:
 *         description: Informe de reclamos en el formato solicitado
 *       400:
 *         description: Formato no válido o faltante
 */
reclamosRouter.get('/informe', autorizarUsuarios([UserTypes.ADMIN]), reclamosController.informe);

/**
 * @swagger
 * /v1/reclamos/{id}:
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
reclamosRouter.get('/:id', autorizarUsuarios([UserTypes.ADMIN, UserTypes.CLIENTE]), reclamosController.getReclamoById);

/**
 * @swagger
 * /v1/reclamos:
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
reclamosRouter.post('/', autorizarUsuarios([UserTypes.CLIENTE]), reclamosController.addReclamo);

reclamosRouter.patch('/:id/cancelar', autorizarUsuarios([UserTypes.CLIENTE]), reclamosController.cancelReclamo);

reclamosRouter.patch('/:id/cambiarEstado', autorizarUsuarios([UserTypes.EMPLEADO]), reclamosController.cambiarEstadoReclamo);

/**
 * @swagger
 * /v1/reclamos/{id}:
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
reclamosRouter.patch('/:id', autorizarUsuarios([UserTypes.ADMIN]), reclamosController.updateReclamo);

export default reclamosRouter;
