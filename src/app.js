import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import passport from "passport";

//importación del middleware para prevención ataques de fuerza bruta
import limiter from './middlewares/rateLimitMiddleware.js';

//imporatación de middleware para prevenir los siguientes ataques: 
// - cross-site scripting (XSS) 
// - clickjacking
import helmet from 'helmet' 

//importación de middleware para prevenir prevenir ataque: 
// - Cross-Site Request Forgery (CSRF)
import cors from 'cors';

import oficinasRouter from './v1/routes/oficinasRouter.js';
import usuariosRouter from './v1/routes/usuariosRouter.js';
import usuariosTipoRouter from './v1/routes/usuariosTipoRouter.js';
import usuariosOficinaRouter from './v1/routes/usuariosOficinaRouter.js';
import reclamosEstadoRouter from './v1/routes/reclamosEstadoRouter.js';
import reclamosTipoRouter from './v1/routes/reclamosTipoRouter.js';
import reclamosRouter from './v1/routes/reclamosRouter.js';
import authRouter from './v1/routes/authRouter.js';

import validateContentType from './middlewares/validateContentType.js';
import { estrategia, validacion } from "./config/passport.js";

//importo middleware para asegurar que los usuarios con perfil autorizado
//puedan llegar a las rutas
import autorizarUsuarios from './middlewares/autorizarUsuarios.js';

dotenv.config();

const app = express();

const logFileStream = fs.createWriteStream(path.join('./', 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: logFileStream })); // al archivo log.
app.use(morgan('combined', { stream: process.stdout })); // por consola.

app.use(express.json());
app.use(validateContentType);

// Uso de cors para prevencion de Cross-Site Request Forgery (CSRF)
app.use(cors());

// Uso de Helmet para prevención xss & clickjacking
app.use(helmet());

//Se aplica middleware de prevención ataques fuerza bruta a todas las rutas
app.use(limiter);

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

//Routes
app.use('/v1/oficinas', passport.authenticate('jwt', {session: false}), autorizarUsuarios([1]), oficinasRouter);
app.use('/v1/usuarios', passport.authenticate('jwt', {session: false}), autorizarUsuarios([1, 3]), usuariosRouter);
app.use('/v1/usuariosTipo', passport.authenticate('jwt', {session: false}), autorizarUsuarios([1]), usuariosTipoRouter);
app.use('/v1/usuariosOficinas', passport.authenticate('jwt', {session: false}), autorizarUsuarios([1]), usuariosOficinaRouter);
app.use('/v1/reclamosestado', passport.authenticate('jwt', {session: false}), autorizarUsuarios([1]), reclamosEstadoRouter );
app.use('/v1/reclamostipo', passport.authenticate('jwt', {session: false}), autorizarUsuarios([1]), reclamosTipoRouter );
app.use('/v1/reclamos', passport.authenticate('jwt', {session: false}), autorizarUsuarios([1, 2, 3]), reclamosRouter);
app.use('/v1/auth', authRouter);

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
