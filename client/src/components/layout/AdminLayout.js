import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAdminSidebar, closeAdminSidebar } from '../../store/slices/uiSlice';
import AdminNav from './AdminNav';

const AdminLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAdminSidebarOpen } = useSelector((state) => state.ui);
  const drawerWidth = 240;

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      dispatch(closeAdminSidebar());
    }
  }, [location, isMobile, dispatch]);

  const handleDrawerToggle = () => {
    dispatch(toggleAdminSidebar());
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: 1,
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <AdminNav />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          mt: '64px', // Height of the AppBar
          minHeight: 'calc(100vh - 64px)',
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
