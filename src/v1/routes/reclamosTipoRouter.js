// Importo el módulo Express para manejar las rutas y el servidor.
import express from 'express'; 
// Importo el controlador que maneja la lógica de los tipos de reclamo.
import ReclamosTipoController from '../../controllers/reclamosTipoController.js'; 

// Creo un nuevo router para gestionar las rutas de tipos de reclamo.
const reclamosTipoRouter = express.Router(); 

// Instancio el controlador para manejar las solicitudes.
const reclamosTipoController = new ReclamosTipoController(); 

// Defino la rutas GET, POST, DELETE y PATCH para los CRUD
reclamosTipoRouter.get('/', reclamosTipoController.getReclamosTipo); 
reclamosTipoRouter.get('/:id', reclamosTipoController.getReclamosTipoById);
reclamosTipoRouter.post('/', reclamosTipoController.addReclamosTipo); 
reclamosTipoRouter.delete('/:id', reclamosTipoController.deleteReclamosTipo);
reclamosTipoRouter.patch('/:id', reclamosTipoController.updateReclamosTipo); 

// Exporto el router para que pueda ser utilizado en la aplicación.
export default reclamosTipoRouter; 
