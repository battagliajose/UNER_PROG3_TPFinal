import express from 'express';
import UsuariosTipoController from '../../controllers/usuariosTipoController.js';

const usuariosTipoRouter = express.Router();

const usuariosTipoController = new UsuariosTipoController();

usuariosTipoRouter.get('/', usuariosTipoController.getUsuariosTipo);
usuariosTipoRouter.get('/:id', usuariosTipoController.getUsuariosTipoId);
usuariosTipoRouter.post('/', usuariosTipoController.addUsuariosTipo);
usuariosTipoRouter.delete('/:id', usuariosTipoController.deleteUsuariosTipo);
usuariosTipoRouter.patch('/:id', usuariosTipoController.updateUsuariosTipo);

export default usuariosTipoRouter;