import express from 'express';
import AuthController from '../../controllers/authController.js';

const authRouter = express.Router();

const authController = new AuthController();

authRouter.post('/login', authController.login);

export default authRouter;