import React from 'react';

const mockReviews = [
  { id: 1, user: 'Alice', text: 'Great product!', rating: 5 },
  { id: 2, user: 'Bob', text: 'Fast delivery and good quality.', rating: 4 },
];

const Review = () => (
  <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
    <div className="max-w-2xl mx-auto bg-dark-800 rounded-4xl shadow-large p-8 animate-fade-in">
      <h2 className="text-3xl font-display font-bold text-primary-500 mb-6">Product Reviews</h2>
      <form className="space-y-4 mb-8">
        <textarea placeholder="Write your review..." className="w-full px-4 py-3 rounded bg-dark-700 text-white border border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400" rows={3} />
        <button type="submit" className="w-full py-3 rounded-4xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg shadow-soft transition">Submit Review</button>
      </form>
      <div className="space-y-4">
        {mockReviews.map(r => (
          <div key={r.id} className="bg-dark-700 rounded-4xl p-4 shadow-soft">
            <div className="flex items-center mb-2">
              <span className="text-primary-400 font-bold mr-2">{r.user}</span>
              <span className="text-yellow-400">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p className="text-white">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Review; 