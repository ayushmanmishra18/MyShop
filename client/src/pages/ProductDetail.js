import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/slices/productSlice';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !product) {
    return <div className="min-h-screen flex items-center justify-center text-primary-400 text-2xl">Loading product...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4 font-display">
      <div className="max-w-4xl mx-auto bg-dark-800 rounded-4xl shadow-large p-8 flex flex-col md:flex-row gap-10 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex items-center justify-center"
        >
          <img src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} alt={product.name} className="w-80 h-80 object-cover rounded-4xl shadow-soft" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-primary-400 mb-2">{product.name}</h2>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 flex items-center mr-2">
              <Star size={18} className="mr-1" />
              {product.ratings}
            </span>
            <span className="text-dark-50 text-sm">({product.numOfReviews} reviews)</span>
          </div>
          <span className="text-2xl font-bold text-dark-50 mb-4">${product.price}</span>
          <p className="text-dark-50 mb-6">{product.description}</p>
          <div className="flex gap-4">
            <button className="flex items-center px-6 py-3 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold shadow-soft transition animate-bounce-gentle"
              onClick={() => dispatch(addToCart({ productId: product._id, quantity: 1 }))}
            >
              <ShoppingCart size={20} className="mr-2" /> Add to Cart
            </button>
            <button className="flex items-center px-4 py-3 rounded-4xl border border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-dark-900 font-semibold shadow-soft transition">
              <Heart size={18} className="mr-1" /> Wishlist
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail; 