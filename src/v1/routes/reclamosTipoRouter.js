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
    .get('/', reclamosTipoController.getReclamosTipo)
    .get('/:id', reclamosTipoController.getReclamosTipoById)
    .post('/', reclamosTipoController.addReclamosTipo)
    .delete('/:id', reclamosTipoController.deleteReclamosTipo)
    .patch('/:id', reclamosTipoController.updateReclamosTipo); 

// Exporto el router para que pueda ser utilizado en la aplicación.
export default reclamosTipoRouter; 
