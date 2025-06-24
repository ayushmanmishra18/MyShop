import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-primary-400 text-2xl">Loading products...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
      <h2 className="text-4xl font-bold font-display text-primary-400 mb-8 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {products.map(product => (
          <div key={product._id} className="bg-dark-800 bg-opacity-90 rounded-4xl shadow-large p-4 flex flex-col items-center">
            <img src={product.images?.[0]?.url || 'https://via.placeholder.com/150'} alt={product.name} className="w-32 h-32 object-cover rounded mb-4 border-2 border-primary-700" />
            <h3 className="text-xl font-semibold font-display text-dark-50 mb-2">{product.name}</h3>
            <p className="text-primary-400 font-bold mb-4">${product.price}</p>
            <button onClick={() => navigate(`/products/${product._id}`)} className="px-4 py-2 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition shadow-soft">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 