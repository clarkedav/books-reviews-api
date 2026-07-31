const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllReviews = async (req, res) => {
  try {
    const db = getDb();
    const reviews = await db.collection('reviews').find().toArray();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reviews', error: err.message });
  }
};

const getSingleReview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review id' });
    }
    const db = getDb();
    const reviewId = new ObjectId(req.params.id);
    const review = await db.collection('reviews').findOne({ _id: reviewId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving review', error: err.message });
  }
};

const validateReview = (body) => {
  const errors = [];
  if (!body.bookId || !ObjectId.isValid(body.bookId)) errors.push('bookId is required and must be a valid ObjectId string');
  if (!body.reviewerName || typeof body.reviewerName !== 'string') errors.push('reviewerName is required and must be a string');
  if (body.rating === undefined || typeof body.rating !== 'number' || body.rating < 0 || body.rating > 5) errors.push('rating is required and must be a number between 0 and 5');
  if (!body.comment || typeof body.comment !== 'string') errors.push('comment is required and must be a string');
  return errors;
};

const createReview = async (req, res) => {
  try {
    const errors = validateReview(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    const db = getDb();
    const newReview = {
      bookId: req.body.bookId,
      reviewerName: req.body.reviewerName,
      rating: req.body.rating,
      comment: req.body.comment,
      createdAt: new Date()
    };
    const response = await db.collection('reviews').insertOne(newReview);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Review created', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the review' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review id' });
    }
    const errors = validateReview(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    const db = getDb();
    const reviewId = new ObjectId(req.params.id);
    const updatedReview = {
      bookId: req.body.bookId,
      reviewerName: req.body.reviewerName,
      rating: req.body.rating,
      comment: req.body.comment
    };
    const response = await db.collection('reviews').updateOne({ _id: reviewId }, { $set: updatedReview });
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review id' });
    }
    const db = getDb();
    const reviewId = new ObjectId(req.params.id);
    const response = await db.collection('reviews').deleteOne({ _id: reviewId });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview
};
