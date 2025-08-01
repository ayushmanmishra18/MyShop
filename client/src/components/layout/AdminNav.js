import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Drawer,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  People as UsersIcon,
  Receipt as OrdersIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAdminSidebar } from '../../store/slices/uiSlice';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Products', icon: <ProductsIcon />, path: '/admin/products' },
  { text: 'Users', icon: <UsersIcon />, path: '/admin/users' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orders' },
];

const AdminNav = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAdminSidebarOpen } = useSelector((state) => state.ui);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    dispatch(toggleAdminSidebar());
  };

  const drawer = (
    <div>
      <Toolbar 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: [1],
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
        {isMobile && (
          <CloseIcon 
            onClick={handleDrawerToggle}
            sx={{ cursor: 'pointer' }}
          />
        )}
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={isMobile ? handleDrawerToggle : undefined}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={isAdminSidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
};

export default AdminNav;
