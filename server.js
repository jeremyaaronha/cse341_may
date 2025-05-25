const express = require('express');
const { initDb } = require('./data/database');
const { swaggerSpec, swaggerUi } = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/', require('./routes'));
app.use('/contacts', require('./routes/contacts'));

// Conexión a la base de datos y levantamiento
initDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
});