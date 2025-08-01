import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Box, CircularProgress, Chip, IconButton,
  Button, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { toast } from 'react-toastify';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

const AdminOrders = () => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [isAdmin, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      // const { data } = await axios.get('/api/admin/orders');
      // setOrders(data.orders);
      
      // Mock data for now
      setTimeout(() => {
        setOrders([
          {
            _id: '1',
            user: { name: 'John Doe', email: 'john@example.com' },
            orderItems: [{ name: 'Sample Product', quantity: 2, price: 99.99 }],
            shippingInfo: { address: '123 Main St, City, Country' },
            paymentInfo: { status: 'Paid' },
            itemsPrice: 199.98,
            taxPrice: 23.99,
            shippingPrice: 10.00,
            totalPrice: 233.97,
            orderStatus: 'Processing',
            paidAt: new Date(),
            createdAt: new Date()
          },
          // Add more mock orders as needed
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      toast.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // Replace with actual API call
      // await axios.put(`/api/admin/orders/${orderId}`, { status: newStatus });
      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.orderStatus.toLowerCase() === statusFilter.toLowerCase());

  if (!isAdmin) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Manage Orders
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Filter by Status"
          >
            <MenuItem value="all">All Orders</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {order.user?.name}
                    <br />
                    <small>{order.user?.email}</small>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>${order.totalPrice?.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      color="primary"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminOrders;
