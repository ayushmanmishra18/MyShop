import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../store/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    // Navigate to edit page (to be implemented)
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
      <h2 className="text-4xl font-bold font-display text-primary-400 mb-8 text-center">Admin Products</h2>
      <div className="flex justify-end mb-4 max-w-6xl mx-auto">
        <button onClick={() => navigate('/admin/products/create')} className="px-6 py-2 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition shadow-soft">Add Product</button>
      </div>
      {loading ? (
        <div className="text-primary-400 text-2xl text-center">Loading products...</div>
      ) : error ? (
        <div className="text-red-500 text-2xl text-center">{error}</div>
      ) : (
        <table className="w-full max-w-6xl mx-auto bg-dark-800 rounded-4xl shadow-large overflow-hidden">
          <thead>
            <tr className="bg-primary-900 text-dark-50">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b border-primary-900">
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">${product.price}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => handleEdit(product._id)} className="px-3 py-1 rounded bg-primary-400 text-dark-900 font-semibold hover:bg-primary-500 transition">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts; 