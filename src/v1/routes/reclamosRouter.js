import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';

const reclamosRouter = express.Router();

const reclamosController = new ReclamosController();

reclamosRouter.get('/', reclamosController.getReclamo);
reclamosRouter.get('/:id', reclamosController.getReclamoById);
reclamosRouter.post('/', reclamosController.addReclamo);
reclamosRouter.patch('/:id', reclamosController.updateReclamo);

export default reclamosRouter;