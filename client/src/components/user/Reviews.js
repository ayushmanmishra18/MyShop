import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon } from '@heroicons/react/24/solid';
import { fetchUserReviews, createReview, updateReview, deleteReview } from '../../store/slices/reviewSlice';

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchUserReviews());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !rating) return;
    
    const reviewData = {
      product: selectedProduct._id,
      rating,
      comment: reviewText,
    };

    if (editingId) {
      dispatch(updateReview({ id: editingId, ...reviewData }));
      setEditingId(null);
    } else {
      dispatch(createReview(reviewData));
    }
    
    resetForm();
  };

  const handleEdit = (review) => {
    setSelectedProduct(review.product);
    setRating(review.rating);
    setReviewText(review.comment);
    setEditingId(review._id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(id));
    }
  };

  const resetForm = () => {
    setRating(0);
    setHover(0);
    setReviewText('');
    setSelectedProduct(null);
    setEditingId(null);
  };

  // This would be replaced with actual product search functionality
  const searchProducts = (query) => {
    // In a real app, this would call an API to search products
    return [];
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium text-gray-900">My Reviews</h2>
        <p className="mt-1 text-sm text-gray-500">View and manage your product reviews</p>
      </div>

      {/* Review Form */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {editingId ? 'Edit Review' : 'Write a Review'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">
              Product
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={selectedProduct ? selectedProduct.name : productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search for a product"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              />
              {/* Product search results would be rendered here */}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none"
                >
                  <StarIcon
                    className={`h-8 w-8 ${
                      (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {rating} star{rating !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Review
            </label>
            <div className="mt-1">
              <textarea
                rows={4}
                name="review"
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Share your thoughts about this product..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            {(editingId || reviewText || rating > 0) && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={!selectedProduct || !rating || !reviewText}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingId ? 'Update Review' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Your Reviews</h3>
        
        {loading ? (
          <div className="text-center py-8">Loading your reviews...</div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {reviews.map((review) => (
                <li key={review._id} className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 object-cover rounded-md"
                        src={review.product.images?.[0]?.url || 'https://via.placeholder.com/64'}
                        alt={review.product.name}
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {review.product.name}
                        </h4>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`h-5 w-5 ${
                                review.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <time dateTime={review.createdAt}>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </time>
                        <span className="mx-1">•</span>
                        <button
                          onClick={() => handleEdit(review)}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          Edit
                        </button>
                        <span className="mx-1">•</span>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by writing a review for one of your purchased products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
