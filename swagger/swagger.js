const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books & Reviews API',
    description:
      'CSE 341 Project 2 - CRUD API for Books and Reviews. POST/PUT/DELETE on /books require GitHub OAuth login (visit /auth/login first).'
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: ['https', 'http'],
  securityDefinitions: {
    githubOAuth: {
      type: 'oauth2',
      description: 'Log in at /auth/login with your GitHub account, then your session cookie authorizes protected routes.',
      flow: 'implicit',
      authorizationUrl: '/auth/login'
    }
  }
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
