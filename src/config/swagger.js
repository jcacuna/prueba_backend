import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Usuarios',
    version: '1.0.0',
    description: 'Documentación de la API REST de usuarios con Node.js, Express y MongoDB',
  },
  servers: [
    {
      url: 'http://localhost:3000/api', 
      description: 'Servidor de desarrollo',
    },
  ],
  components: {
    schemas: {
      Direccion: {
        type: 'object',
        properties: {
          calle: {
            type: 'string',
            description: 'Nombre de la calle',
            example: 'Av. Arequipa 1234',
          },
          ciudad: {
            type: 'string',
            description: 'Nombre de la ciudad',
            example: 'Lima',
          },
          pais: {
            type: 'string',
            description: 'Nombre del país',
            example: 'Perú',
          },
          codigo_postal: {
            type: 'string',
            description: 'Código postal (opcional)',
            example: '15001',
          },
        },
        required: ['calle', 'ciudad', 'pais'],
      },
      Usuario: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'ID generado por MongoDB',
            example: '64a1f2e3b4c5d6e7f8a9b0c1',
          },
          nombre: {
            type: 'string',
            description: 'Nombre completo del usuario',
            example: 'Juan Pérez',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Correo electrónico único',
            example: 'juan.perez@example.com',
          },
          edad: {
            type: 'integer',
            description: 'Edad del usuario (opcional)',
            example: 28,
            minimum: 0,
          },
          fecha_creacion: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación del registro',
            example: '2024-01-15T10:30:00.000Z',
          },
          direcciones: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Direccion',
            },
            description: 'Lista de direcciones asociadas',
            default: [],
          },
        },
        required: ['nombre', 'email'],
      },
      UsuarioInput: {
        type: 'object',
        properties: {
          nombre: {
            type: 'string',
            example: 'Juan Pérez',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'juan.perez@example.com',
          },
          edad: {
            type: 'integer',
            example: 28,
            minimum: 0,
          },
          direcciones: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Direccion',
            },
          },
        },
        required: ['nombre', 'email'],
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Mensaje descriptivo del error',
          },
        },
      },
      PaginacionUsuarios: {
        type: 'object',
        properties: {
          total: {
            type: 'integer',
            example: 50,
          },
          pagina: {
            type: 'integer',
            example: 1,
          },
          limite: {
            type: 'integer',
            example: 10,
          },
          totalPaginas: {
            type: 'integer',
            example: 5,
          },
          usuarios: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Usuario',
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './src/controllers/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };