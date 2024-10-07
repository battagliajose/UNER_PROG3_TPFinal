import express from 'express';
import dotenv from 'dotenv';

import oficinasRouter from './v1/routes/oficinasRouter.js'
import usuariosRouter from './v1/routes/usuariosRouter.js'
//import usuariosTipoRouter from './v1/router/usuariosTipoRouter.js'
import reclamosEstadoRouter from './v1/routes/reclamosEstadoRouter.js'
import reclamosTipoRouter from './v1/routes/reclamosTipoRouter.js'

import validateContentType from './middlewares/validateContentType.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(validateContentType);

//Routes
app.use('/oficinas', oficinasRouter);
app.use('/usuarios', usuariosRouter);
//app.use('/usuariosTipo',usuariosTipoRouter);
app.use('/reclamosestado', reclamosEstadoRouter );
app.use('/reclamostipo', reclamosTipoRouter );


const puerto = process.env.PUERTO || 3000;

app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
