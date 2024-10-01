import express from 'express';
import usuariosController from '../controller/usuariosController.js';

const usuariosRouter = express.Router();

usuariosRouter.get('/', usuariosController.getUsuarios);
usuariosRouter.get('/:id', usuariosController.getUsuarioById);
usuariosRouter.post('/', usuariosController.addUsuario);
usuariosRouter.delete('/:id', usuariosController.deleteUsuario);
usuariosRouter.patch('/:id', usuariosController.updateUsuario);

export default usuariosRouter;