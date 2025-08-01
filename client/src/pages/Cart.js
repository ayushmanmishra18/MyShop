import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateQuantity, removeItem } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, loading, error } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ itemId, quantity }));
    // Optionally, sync with backend by dispatching addToCart with new quantity
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
    // Optionally, sync with backend
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-primary-400 text-2xl">Loading cart...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-dark-800 rounded-4xl shadow-large p-8 animate-fade-in">
        <h2 className="text-3xl font-display font-bold text-primary-500 mb-6">Your Cart</h2>
        {items.length === 0 ? (
          <div className="text-dark-300 text-center">Your cart is empty.</div>
        ) : (
          <>
            <ul className="divide-y divide-dark-700 mb-6">
              {items.map(item => (
                <li key={item._id} className="flex justify-between items-center py-4">
                  <span className="text-lg text-white font-medium">
                    {item.product?.name || 'Product'}
                    <span className="text-sm text-dark-300"> x{item.quantity}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} className="px-2 py-1 bg-primary-400 text-dark-900 rounded">-</button>
                    <span className="text-primary-400 font-bold">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)} className="px-2 py-1 bg-primary-400 text-dark-900 rounded">+</button>
                  </div>
                  <span className="text-primary-400 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => handleRemove(item._id)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl text-white font-semibold">Total</span>
              <span className="text-2xl text-primary-400 font-bold">${totalAmount.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 rounded-4xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg shadow-soft transition animate-bounce-gentle">Proceed to Payment</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 