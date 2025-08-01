import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Badge,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyShop
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              component={RouterLink}
              to="/products"
              sx={{ color: 'white', display: 'block' }}
            >
              Products
            </Button>
            
            <IconButton
              component={RouterLink}
              to="/cart"
              size="large"
              aria-label="show cart items"
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={cartItems?.length || 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <IconButton
                    component={RouterLink}
                    to="/admin"
                    size="large"
                    aria-label="admin dashboard"
                    color="inherit"
                    sx={{ ml: 1 }}
                  >
                    <DashboardIcon />
                  </IconButton>
                )}
                <IconButton
                  component={RouterLink}
                  to="/profile"
                  size="large"
                  aria-label="account of current user"
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <IconButton
                  onClick={handleLogout}
                  size="large"
                  aria-label="logout"
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ color: 'white', ml: 1 }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white', ml: 1 }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
