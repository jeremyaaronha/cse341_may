const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Documentación de la API de contactos'
    }
  },
//  apis: [path.join(__dirname, './routes/*.js')], // Ruta absoluta para evitar errores
apis: [path.join(__dirname, './routes/*.js')]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};