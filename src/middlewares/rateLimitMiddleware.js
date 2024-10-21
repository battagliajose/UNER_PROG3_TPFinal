//express-rate-limit: Este middleware limita la cantidad de 
//solicitudes que un cliente puede hacer a tu API en un período 
//de tiempo determinado, ayudando a prevenir ataques de fuerza bruta

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limitar cada IP a 100 solicitudes por ventana -variable windowMs-
});

export default limiter;