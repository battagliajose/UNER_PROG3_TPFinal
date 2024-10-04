import express from 'express';
import dotenv from 'dotenv';
import oficinasRouter from './v1/routes/oficinasRouter.js'
import usuariosRouter from './v1/routes/usuariosRouter.js'

dotenv.config();

const app = express();

app.use(express.json());

//Routes
app.use('/oficinas', oficinasRouter);
app.use('/usuarios', usuariosRouter);

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
