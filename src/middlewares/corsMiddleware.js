//cors para prevencion de Cross-Site Request Forgery (CSRF)
// corsMiddleware.js
import cors from 'cors';

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:3000', //Origen de permitido (servidor)
    methods: 'GET,HEAD,PATCH,POST,DELETE', // Métodos permitidos    
    optionsSuccessStatus: 204 // Para navegadores antiguos
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;