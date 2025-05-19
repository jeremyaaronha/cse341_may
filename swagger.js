const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for Contacts',
  },
  host: 'localhost:3000',
  basePath: '/contacts',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);