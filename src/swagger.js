import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Versión de OpenAPI
        info: {
            title: 'Trabajo Final', // Título de la API
            version: '1.0.0', // Versión de la API
            description: 'Documentación de la API Reclamos UNER', // Descripción de la API
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL del servidor
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/v1/routes/*.js'], // Ruta a los archivos donde se encuentran las definiciones de las rutas
};

// Generar la especificación Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Exportar la configuración de Swagger
export const swaggerSetup = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs,{
        explorer:true, // Permite explorar la API
        docExpansion: 'none', // Colapsa todos los tags por defecto
    }));
};