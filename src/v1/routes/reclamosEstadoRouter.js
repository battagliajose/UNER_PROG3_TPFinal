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
    .get('/', reclamosEstadoController.getReclamosEstado)
    .get('/:id', reclamosEstadoController.getReclamosEstadoById)
    .post('/', reclamosEstadoController.addReclamosEstado) 
    .delete('/:id', reclamosEstadoController.deleteReclamosEstado)
    .patch('/:id', reclamosEstadoController.updateReclamosEstado); 

// Exporto el router para que pueda ser utilizado en la aplicación.
export default reclamosEstadoRouter; 

