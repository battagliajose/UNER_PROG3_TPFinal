import express from 'express';
import usuariosTipoController from '../../controllers/usuariosController.js';

const usuariosTipoRouter = express.Router();

const usuariosTipoController = new usuariosTipoController();

usuariosTipoRouter.get('/', usuariosTipoController.getUsuariosTipo);
usuariosTipoRouter.get('/:id', usuariosTipoController.getUsuariosTipoId);
usuariosTipoRouter.post('/', usuariosTipoController.addUsuariosTipo);
usuariosTipoRouter.delete('/:id', usuariosTipoController.deleteUsuariosTipo);
usuariosTipoRouter.patch('/:id', usuariosTipoController.updateUsuariosTipo);

export default usuariosTipoRouter;