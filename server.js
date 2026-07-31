require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const { initDb } = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/books', require('./routes/books'));
app.use('/reviews', require('./routes/reviews'));

app.get('/', (req, res) => {
  res.send('Books & Reviews API is running. Go to /api-docs for documentation.');
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (safety net)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
