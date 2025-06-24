import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct } from '../../store/slices/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector(state => state.products);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', seller: '', stock: '' });

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product._id === id) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        seller: product.seller || '',
        stock: product.stock || '',
      });
    }
  }, [product, id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData: { ...form, price: Number(form.price), stock: Number(form.stock) } }))
      .unwrap()
      .then(() => navigate('/admin/products'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
      <div className="max-w-xl mx-auto bg-dark-800 rounded-4xl shadow-large p-8 animate-fade-in">
        <h2 className="text-3xl font-bold font-display text-primary-400 mb-6 text-center">Edit Product</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <input name="category" type="text" placeholder="Category" value={form.category} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <input name="seller" type="text" placeholder="Seller" value={form.seller} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <button type="submit" className="w-full py-2 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition shadow-soft" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ProductEdit; 