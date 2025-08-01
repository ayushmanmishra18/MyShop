const express = require('express');
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getMyReviews,
} = require('../controllers/reviewController');
const { authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Public routes
router.route('/').get(getReviews);
router.route('/:id').get(getReview);

// Protected routes (require authentication)
router.use(authorize);

// Nested routes for product reviews
router.route('/products/:productId/reviews').post(addReview);

// User's reviews
router.get('/my-reviews', getMyReviews);

// Protected routes for specific review operations
router
  .route('/:id')
  .put(updateReview)
  .delete(deleteReview);

module.exports = router;
