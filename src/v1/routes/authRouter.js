import express from 'express';
import AuthController from '../../controllers/authController.js';
import UsuariosController from '../../controllers/usuariosController.js'

import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const authRouter = express.Router();
const authController = new AuthController();
const usuariosController = new UsuariosController();
import upload from '../../config/multer.js';
/**
 * @swagger
 * /v1/auth/login:
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


/**
 * @swagger
 * /v1/auth/registrarCliente:
 *   post:
 *     summary: Resgistro de Usuario
 *     tags: [Registro]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               correoElectronico:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               contrasenia:
 *                 type: string
 *                 description: Contraseña del usuario
 *               imagen:
 *                 type: string
 *                 format: binary 
 *                 description: Imagen del usuario 
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
authRouter.post('/registrarCliente',upload.single('imagen') ,usuariosController.registrarCliente);

export default authRouter;