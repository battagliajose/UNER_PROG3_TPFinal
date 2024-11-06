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

const swaggerUiOptions = {
    explorer: true,
    swaggerOptions: {
        docExpansion: 'none',
        defaultModelsExpandDepth: -1,
        defaultModelExpandDepth: -1,
        displayRequestDuration: true,
        filter: true,
    }
};
// Exportar la configuración de Swagger
export const swaggerSetup = (app) => {
    app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs,swaggerUiOptions));
};