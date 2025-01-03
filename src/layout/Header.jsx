import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout, selectCurrentUser, selectIsAuthenticated } from '../store/userSlice';
import CartDropdown from '../components/CartDropdown';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('You logged out successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Brand Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 0,
            mr: 4
          }}
        >
          Cool Trade
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            component={Link}
            to="/shop"
          >
            Shop
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About Us
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          <Button color="inherit" component={Link} to="/team">
            Team
          </Button>
        </Box>

        {/* Right Side Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Welcome Message */}
          {user && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              Welcome, {user.name}
            </Typography>
          )}

          {/* Login/Logout */}
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}

          {/* Cart Dropdown */}
          <CartDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

