import express from 'express';
import { getOficinas, getOficinaById, addOficina, deleteOficina} from '../controller/oficinasController.js';

const oficinasRouter = express.Router();

oficinasRouter.get('/', getOficinas);
oficinasRouter.get('/:id', getOficinaById);
oficinasRouter.post('/', addOficina);
oficinasRouter.delete('/:id', deleteOficina);

export default oficinasRouter;