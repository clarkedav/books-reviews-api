const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books & Reviews API',
    description: 'CSE 341 Project 2 Part 1 - CRUD API for Books and Reviews'
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
