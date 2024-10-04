import express from 'express';
import OficinasController from '../../controllers/oficinasController.js';

const oficinasRouter = express.Router();

const oficinasController = new OficinasController();

oficinasRouter.get('/', oficinasController.getOficinas);
oficinasRouter.get('/:id', oficinasController.getOficinaById);
oficinasRouter.post('/', oficinasController.addOficina);
oficinasRouter.delete('/:id', oficinasController.deleteOficina);
oficinasRouter.patch('/:id', oficinasController.updateOficina);

export default oficinasRouter;