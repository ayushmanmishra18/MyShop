import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Truck,
  Shield,
  RefreshCw,
  Headphones
} from 'lucide-react';

import { fetchProducts } from '../store/slices/productSlice';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, sort: 'ratings', order: 'desc' }));
  }, [dispatch]);

  const features = [
    {
      icon: <Truck size={24} />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: <RefreshCw size={24} />,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: <Headphones size={24} />,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    }
  ];

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', count: 150 },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', count: 200 },
    { name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', count: 100 },
    { name: 'Sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', count: 80 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 font-display">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 text-primary-400 drop-shadow-lg">Discover Amazing Products</h1>
              <p className="text-xl mb-8 text-dark-50 font-sans">Shop the latest trends and find the best deals on quality products. From electronics to fashion, we've got everything you need.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="bg-primary-500 text-dark-50 px-8 py-3 rounded-4xl font-semibold hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center shadow-soft animate-bounce-gentle">
                  Shop Now
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link to="/contact" className="border-2 border-primary-400 text-primary-400 px-8 py-3 rounded-4xl font-semibold hover:bg-primary-400 hover:text-dark-900 transition-colors duration-200 text-center shadow-soft">
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600" alt="Shopping" className="rounded-4xl shadow-large animate-fade-in" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-dark-800 rounded-4xl p-6 shadow-soft animate-fade-in"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 animate-bounce-gentle">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary-400 mb-2">{feature.title}</h3>
                <p className="text-dark-50">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-400 mb-4">Shop by Category</h2>
            <p className="text-dark-50">Explore our wide range of products</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer animate-fade-in"
              >
                <div className="relative overflow-hidden rounded-4xl shadow-soft group-hover:shadow-large transition-shadow duration-200">
                  <img src={category.image} alt={category.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200" />
                  <div className="absolute inset-0 bg-primary-900 bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-200 rounded-4xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-dark-50">
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count} products</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-primary-400 mb-2">Featured Products</h2>
              <p className="text-dark-50">Handpicked products for you</p>
            </div>
            <Link to="/products" className="text-primary-400 hover:text-primary-200 font-semibold flex items-center">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="product-card group bg-dark-800 rounded-4xl p-4 shadow-soft animate-fade-in"
                >
                  <div className="relative mb-4">
                    <img src={product.images[0]?.url || 'https://via.placeholder.com/300x300'} alt={product.name} className="w-full h-48 object-cover rounded-4xl group-hover:scale-105 transition-transform duration-200" />
                    {product.isFeatured && (
                      <span className="absolute top-2 left-2 bg-primary-500 text-dark-50 px-2 py-1 rounded text-xs font-semibold shadow-soft animate-bounce-gentle">Featured</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-primary-400 group-hover:text-primary-200 transition-colors duration-200 mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 flex items-center">
                      <Star size={16} className="mr-1" />
                      {product.ratings}
                    </span>
                    <span className="text-sm text-dark-50 ml-1">({product.numOfReviews})</span>
                  </div>
                  <span className="font-bold text-lg text-dark-50">${product.price}</span>
                  <button className="mt-4 w-full py-2 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition shadow-soft animate-bounce-gentle flex items-center justify-center">
                    <ShoppingCart size={18} className="mr-2" /> Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 