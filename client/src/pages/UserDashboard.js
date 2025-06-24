import React from 'react';

const UserDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
    <div className="max-w-3xl mx-auto bg-dark-800 rounded-4xl shadow-large p-8">
      <h2 className="text-3xl font-bold font-display text-primary-400 mb-6">Welcome, User!</h2>
      <div className="mb-8">
        <h3 className="text-xl font-display text-dark-50 font-semibold mb-2">Your Orders</h3>
        <ul className="list-disc list-inside text-dark-50">
          <li>Order #1234 - Delivered</li>
          <li>Order #5678 - In Progress</li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-display text-dark-50 font-semibold mb-2">Profile Info</h3>
        <p className="text-dark-50">Email: user@example.com</p>
      </div>
    </div>
  </div>
);

export default UserDashboard; 