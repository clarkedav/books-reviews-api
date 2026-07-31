const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllBooks = async (req, res) => {
  try {
    const db = getDb();
    const books = await db.collection('books').find().toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving books', error: err.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }
    const db = getDb();
    const bookId = new ObjectId(req.params.id);
    const book = await db.collection('books').findOne({ _id: bookId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving book', error: err.message });
  }
};

const validateBook = (body) => {
  const errors = [];
  if (!body.title || typeof body.title !== 'string') errors.push('title is required and must be a string');
  if (!body.author || typeof body.author !== 'string') errors.push('author is required and must be a string');
  if (!body.genre || typeof body.genre !== 'string') errors.push('genre is required and must be a string');
  if (body.publishedYear === undefined || typeof body.publishedYear !== 'number') errors.push('publishedYear is required and must be a number');
  if (body.pages === undefined || typeof body.pages !== 'number') errors.push('pages is required and must be a number');
  if (body.rating === undefined || typeof body.rating !== 'number' || body.rating < 0 || body.rating > 5) errors.push('rating is required and must be a number between 0 and 5');
  if (!body.isbn || typeof body.isbn !== 'string') errors.push('isbn is required and must be a string');
  if (!body.description || typeof body.description !== 'string') errors.push('description is required and must be a string');
  return errors;
};

const createBook = async (req, res) => {
  try {
    const errors = validateBook(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    const db = getDb();
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      pages: req.body.pages,
      rating: req.body.rating,
      isbn: req.body.isbn,
      description: req.body.description
    };
    const response = await db.collection('books').insertOne(newBook);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Book created', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the book' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating book', error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }
    const errors = validateBook(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    const db = getDb();
    const bookId = new ObjectId(req.params.id);
    const updatedBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      pages: req.body.pages,
      rating: req.body.rating,
      isbn: req.body.isbn,
      description: req.body.description
    };
    const response = await db.collection('books').replaceOne({ _id: bookId }, updatedBook);
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }
    const db = getDb();
    const bookId = new ObjectId(req.params.id);
    const response = await db.collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};
