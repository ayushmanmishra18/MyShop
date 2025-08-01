import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../store/slices/orderSlice';
import { format } from 'date-fns';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders(user._id));
    }
  }, [dispatch, user]);

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error loading orders: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
        <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      processing: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusClasses[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-900">Order History</h2>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order._id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">#{order.orderNumber}</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(order.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <p className="text-sm font-medium text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                  <div className="mt-1">
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <a
                  href={`/orders/${order._id}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View Order
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderHistory;
