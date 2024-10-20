import express from 'express';
import AuthController from '../../controllers/authController.js';

import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const authRouter = express.Router();

const authController = new AuthController();

// Validaciones en Express Validator para email y contraseña. 
authRouter.post('/login',
    [
        check('correoElectronico', 'El correo electrónico es requerido!').not().isEmpty(),
        check('correoElectronico', 'Por favor, revisá el formato e ingresá un email válido').isEmail(),
        check('contrasenia', 'La contrasenia es requerida!').not().isEmpty(),
        validarCampos
    ], 
    
    authController.login);

export default authRouter;