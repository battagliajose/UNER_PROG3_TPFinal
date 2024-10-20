import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import passport from "passport";

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

dotenv.config();

const app = express();

const logFileStream = fs.createWriteStream(path.join('./', 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: logFileStream })); // al archivo log.
app.use(morgan('combined', { stream: process.stdout })); // por consola.

app.use(express.json());
app.use(validateContentType);

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

//Routes
app.use('/oficinas', passport.authenticate('jwt', {session: false}), oficinasRouter);
app.use('/usuarios', passport.authenticate('jwt', {session: false}), usuariosRouter);
app.use('/usuariosTipo', passport.authenticate('jwt', {session: false}), usuariosTipoRouter);
app.use('/usuariosOficinas', passport.authenticate('jwt', {session: false}), usuariosOficinaRouter);
app.use('/reclamosestado', passport.authenticate('jwt', {session: false}), reclamosEstadoRouter );
app.use('/reclamostipo', passport.authenticate('jwt', {session: false}), reclamosTipoRouter );
app.use('/reclamos', passport.authenticate('jwt', {session: false}), reclamosRouter);
app.use('/auth', authRouter);

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
