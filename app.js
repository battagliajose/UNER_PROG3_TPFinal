import express from 'express';
import dotenv from 'dotenv';
import oficinasRouter from './routes/oficinasRouter.js'
import usuariosRouter from './routes/usuariosRouter.js'

dotenv.config();

const app = express();

app.use(express.json());

//Routes
app.use('/oficinas', oficinasRouter);
app.use('/usuarios', usuariosRouter);

const puerto = process.env.PUERTO;

app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
