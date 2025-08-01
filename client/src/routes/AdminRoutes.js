import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductForm from '../components/ProductForm';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="products"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="products/new"
        element={
          <ProtectedRoute adminOnly>
            <ProductForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="products/edit/:id"
        element={
          <ProtectedRoute adminOnly>
            <ProductForm isEdit />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
