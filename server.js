require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const { initDb } = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/books', require('./routes/books'));
app.use('/reviews', require('./routes/reviews'));

// Home route
app.get('/', (req, res) => {
  const loggedIn = req.isAuthenticated && req.isAuthenticated();

  res.send(`
    <h1>Books & Reviews API</h1>
    <p>Go to <a href="/api-docs">Swagger Documentation</a>.</p>

    ${
      loggedIn
        ? `<p>Logged in as <strong>${req.user.username}</strong></p>`
        : `<p>Not logged in.</p>`
    }

    <p>
      <a href="/auth/login">Login with GitHub</a> |
      <a href="/auth/logout">Logout</a>
    </p>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Initialize database and start server
initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});