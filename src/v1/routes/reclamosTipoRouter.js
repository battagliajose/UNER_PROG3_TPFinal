// Importo el módulo Express para manejar las rutas y el servidor.
import express from 'express'; 
// Importo el controlador que maneja la lógica de los tipos de reclamo.
import ReclamosTipoController from '../../controllers/reclamosTipoController.js'; 

// Creo un nuevo router para gestionar las rutas de tipos de reclamo.
const reclamosTipoRouter = express.Router(); 

// Instancio el controlador para manejar las solicitudes.
const reclamosTipoController = new ReclamosTipoController(); 

// Defino la rutas GET, POST, DELETE y PATCH para los CRUD
reclamosTipoRouter
/**
 * @swagger
 * /reclamostipo:
 *   get:
 *     summary: Obtener todos los tipos de reclamo
 *     tags: [ReclamosTipo]
 *     responses:
 *       200:
 *         description: Lista de tipos de reclamo
 */
    .get('/', reclamosTipoController.getReclamosTipo)
 /**
 * @swagger
 * /reclamostipo/{id}:
 *   get:
 *     summary: Obtener un tipo de reclamo por ID
 *     tags: [ReclamosTipo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del tipo de reclamo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de reclamo encontrado
 *       404:
 *         description: Tipo de reclamo no encontrado
 */   
    .get('/:id', reclamosTipoController.getReclamosTipoById)
 /**
 * @swagger
 * /reclamostipo:
 *   post:
 *     summary: Agregar un nuevo tipo de reclamo
 *     tags: [ReclamosTipo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del tipo de reclamo
 *     responses:
 *       201:
 *         description: Tipo de reclamo creado
 */    
    .post('/', reclamosTipoController.addReclamosTipo)
   
 /**
 * @swagger
 * /reclamostipo/{id}:
 *   delete:
 *     summary: Eliminar un tipo de reclamo por ID
 *     tags: [ReclamosTipo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del tipo de reclamo
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tipo de reclamo eliminado
 *       404:
 *         description: Tipo de reclamo no encontrado
 */   
    .delete('/:id', reclamosTipoController.deleteReclamosTipo)

 /**
 * @swagger
 * /reclamostipo/{id}:
 *   patch:
 *     summary: Actualizar un tipo de reclamo por ID
 *     tags: [ReclamosTipo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del tipo de reclamo
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
 *                 description: Nombre del tipo de reclamo
 *     responses:
 *       200:
 *         description: Tipo de reclamo actualizado
 *       404:
 *         description: Tipo de reclamo no encontrado
 */   
    .patch('/:id', reclamosTipoController.updateReclamosTipo); 

// Exporto el router para que pueda ser utilizado en la aplicación.
export default reclamosTipoRouter; 
