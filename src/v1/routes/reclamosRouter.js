import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';

const reclamosRouter = express.Router();

const reclamosController = new ReclamosController();

reclamosRouter.get('/', reclamosController.getAllReclamos);
reclamosRouter.get('/:id', reclamosController.getReclamoById);
reclamosRouter.post('/', reclamosController.createReclamo);
reclamosRouter.delete('/:id', reclamosController.deleteReclamo);
reclamosRouter.patch('/:id', reclamosController.updateReclamo);

export default reclamosRouter;