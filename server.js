const express = require('express');
const { initDb } = require('./data/database');
const mongodb = require('./data/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar JSON
app.use(express.json());

// Rutas
app.use('/', require('./routes'))
app.use('/contacts', require('./routes/contacts'));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs-check', (req, res) => {
    res.send('Swagger activo');
  });

  app.get('/prueba-api-docs', (req, res) => {
    res.send('¿Swagger está montado?');
  });

// Inicializar la base de datos y luego arrancar el servidor
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  }
});