import express from 'express';
import { getUsuarios, getUsuarioById, addUsuario, deleteUsuario } from '../controller/usuariosController.js';

const usuariosRouter = express.Router();

usuariosRouter.get('/', getUsuarios);
usuariosRouter.get('/:id', getUsuarioById);
usuariosRouter.post('/', addUsuario);
usuariosRouter.delete('/:id', deleteUsuario);

export default usuariosRouter;