import express from 'express';
import UsuariosController from '../../controllers/usuariosController.js';

const usuariosRouter = express.Router();

const usuariosController = new UsuariosController();

usuariosRouter.get('/', usuariosController.getUsuarios);
usuariosRouter.get('/:id', usuariosController.getUsuarioById);
usuariosRouter.get('/:id/oficinas', usuariosController.getOficinasUsuarioById);
usuariosRouter.post('/', usuariosController.addUsuario);
usuariosRouter.delete('/:id', usuariosController.deleteUsuario);
usuariosRouter.patch('/:id', usuariosController.updateUsuario);

export default usuariosRouter;