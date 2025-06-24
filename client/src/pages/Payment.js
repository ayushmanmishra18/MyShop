import React from 'react';

const Payment = () => (
  <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
    <div className="max-w-md mx-auto bg-dark-800 rounded-4xl shadow-large p-8 animate-fade-in">
      <h2 className="text-3xl font-display font-bold text-primary-500 mb-6">Payment</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Card Number" className="w-full px-4 py-3 rounded bg-dark-700 text-white border border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400" />
        <div className="flex space-x-4">
          <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-3 rounded bg-dark-700 text-white border border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          <input type="text" placeholder="CVC" className="w-1/2 px-4 py-3 rounded bg-dark-700 text-white border border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <button type="submit" className="w-full py-3 rounded-4xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg shadow-soft transition animate-bounce-gentle">Pay Now</button>
      </form>
    </div>
  </div>
);

export default Payment; 