import express from 'express';
import oficinasController from '../controller/oficinasController.js';

const oficinasRouter = express.Router();

oficinasRouter.get('/', oficinasController.getOficinas);
oficinasRouter.get('/:id', oficinasController.getOficinaById);
oficinasRouter.post('/', oficinasController.addOficina);
oficinasRouter.delete('/:id', oficinasController.deleteOficina);

export default oficinasRouter;