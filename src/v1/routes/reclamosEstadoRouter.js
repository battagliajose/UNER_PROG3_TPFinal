// Importo el módulo Express para manejar las rutas y el servidor.
import express from 'express'; 
// Importo el controlador que maneja la lógica de los reclamos de estado.
import ReclamosEstadoController from '../../controllers/reclamosEstadoController.js'; 

// Creo un nuevo router para gestionar las rutas de reclamos de estado.
const reclamosEstadoRouter = express.Router(); 

// Instancio el controlador para manejar las solicitudes.
const reclamosEstadoController = new ReclamosEstadoController(); 

// Defino la rutas GET, POST, DELETE y PATCH para los CRUD

reclamosEstadoRouter

/**
 * @swagger
 * /reclamosestado:
 *   get:
 *     summary: Obtener todos los estados de reclamos
 *     tags: [ReclamosEstado]
 *     responses:
 *       200:
 *         description: Lista de estados de reclamos
 */
    .get('/', reclamosEstadoController.getReclamosEstado)
 /**
 * @swagger
 * /reclamosestado/{id}:
 *   get:
 *     summary: Obtener un estado de reclamo por ID
 *     tags: [ReclamosEstado]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estado de reclamo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado de reclamo encontrado
 *       404:
 *         description: Estado de reclamo no encontrado
 */   
    .get('/:id', reclamosEstadoController.getReclamosEstadoById)
 /**
 * @swagger
 * /reclamosestado/{id}:
 *   post:
 *     summary: Agregar un nuevo reclamo estado
 *     tags: [ReclamosEstado]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estado de reclamo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado de reclamo encontrado
 *       404:
 *         description: Estado de reclamo no encontrado
 */   
    .post('/', reclamosEstadoController.addReclamosEstado) 

 /**
 * @swagger
 * /reclamosestado/{id}:
 *   delete:
 *     summary: Eliminar un estado de reclamo por ID
 *     tags: [ReclamosEstado]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estado de reclamo
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Estado de reclamo eliminado
 *       404:
 *         description: Estado de reclamo no encontrado
 */    
    .delete('/:id', reclamosEstadoController.deleteReclamosEstado)
 
 /**
 * @swagger
 * /reclamosestado/{id}:
 *   patch:
 *     summary: Actualizar un estado de reclamo por ID
 *     tags: [ReclamosEstado]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estado de reclamo
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
 *                 description: Nombre del estado de reclamo
 *     responses:
 *       200:
 *         description: Estado de reclamo actualizado
 *       404:
 *         description: Estado de reclamo no encontrado
 */       
    .patch('/:id', reclamosEstadoController.updateReclamosEstado); 

// Exporto el router para que pueda ser utilizado en la aplicación.
export default reclamosEstadoRouter; 

