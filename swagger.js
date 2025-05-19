const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for Contacts',
  },
  host: 'project1-fq53.onrender.com',
  basePath: '/contacts',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);