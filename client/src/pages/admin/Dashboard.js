import React from 'react';

const AdminDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
    <div className="max-w-3xl mx-auto bg-dark-800 rounded-4xl shadow-large p-8">
      <h2 className="text-3xl font-bold font-display text-primary-400 mb-6">Admin Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-display text-dark-50 font-semibold mb-2">Stats</h3>
        <ul className="list-disc list-inside text-dark-50">
          <li>Total Users: 120</li>
          <li>Total Orders: 340</li>
          <li>Total Sales: $12,000</li>
        </ul>
      </div>
    </div>
  </div>
);

export default AdminDashboard; 