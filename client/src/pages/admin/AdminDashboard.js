import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DashboardCard from '../../components/admin/DashboardCard';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useSelector((state) => state.auth);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Don't render anything if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <AdminPanelSettingsIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <DashboardCard
          title="Users"
          value="Manage"
          icon={<PeopleIcon sx={{ fontSize: 40 }} />}
          color="#4caf50"
          onClick={() => navigate('/admin/users')}
        />
        <DashboardCard
          title="Products"
          value="Manage"
          icon={<Inventory2Icon sx={{ fontSize: 40 }} />}
          color="#2196f3"
          onClick={() => navigate('/admin/products')}
        />
        <DashboardCard
          title="Orders"
          value="View All"
          icon={<ReceiptLongIcon sx={{ fontSize: 40 }} />}
          color="#ff9800"
          onClick={() => navigate('/admin/orders')}
        />
      </Grid>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">Total Users: Loading...</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">Total Products: Loading...</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">Total Orders: Loading...</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
