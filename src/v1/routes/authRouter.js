import express from 'express';
import AuthController from '../../controllers/authController.js';

import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const authRouter = express.Router();

const authController = new AuthController();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correoElectronico:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               contrasenia:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
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