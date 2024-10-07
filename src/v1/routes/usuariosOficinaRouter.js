import express from 'express';
import UsuariosOficinaController from '../../controllers/usuariosOficinaController.js';

const usuariosOficinaRouter = express.Router();

const usuariosOficinaController = new UsuariosOficinaController();

usuariosOficinaRouter.get('/', usuariosOficinaController.getUsuariosOficina);
usuariosOficinaRouter.get('/:id', usuariosOficinaController.getUsuariosOficinaId);
usuariosOficinaRouter.post('/', usuariosOficinaController.addUsuariosOficina);
usuariosOficinaRouter.delete('/:id', usuariosOficinaController.deleteUsuariosOficina);
usuariosOficinaRouter.patch('/:id', usuariosOficinaController.updateUsuariosOficina);

export default usuariosOficinaRouter;