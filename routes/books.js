const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);
// #swagger.security = [{ "githubOAuth": [] }]
router.post('/', isAuthenticated, booksController.createBook);
// #swagger.security = [{ "githubOAuth": [] }]
router.put('/:id', isAuthenticated, booksController.updateBook);
// #swagger.security = [{ "githubOAuth": [] }]
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
