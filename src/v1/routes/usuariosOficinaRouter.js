import express from 'express';
import UsuariosOficinasController from '../../controllers/usuariosOficinasController.js';

const usuariosOficinasRouter = express.Router();

const usuariosOficinasController = new UsuariosOficinasController();

usuariosOficinasRouter.get('/', usuariosOficinasController.getUsuariosOficinas);
usuariosOficinasRouter.get('/:id', usuariosOficinasController.getUsuariosOficinasId);
usuariosOficinasRouter.post('/', usuariosOficinasController.addUsuariosOficinas);
usuariosOficinasRouter.delete('/:id', usuariosOficinasController.deleteUsuariosOficinas);
usuariosOficinasRouter.patch('/:id', usuariosOficinasController.updateUsuariosOficinas);

export default usuariosOficinasRouter;