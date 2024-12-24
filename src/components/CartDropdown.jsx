import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Divider,
  Badge,
  Popover
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import {
  removeFromCart,
  updateCartItem,
  toggleCartItem
} from '../store/reducers/shoppingCartReducer';

const CartDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.shoppingCart.cart);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleQuantityChange = (productId, currentCount, delta) => {
    const newCount = currentCount + delta;
    if (newCount < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItem(productId, newCount));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  const open = Boolean(anchorEl);
  const id = open ? 'cart-popover' : undefined;

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={handleClick}
        aria-describedby={id}
      >
        <Badge badgeContent={totalItems} color="error">
          <CartIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper sx={{ width: 350, maxHeight: 500, overflow: 'auto' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Shopping Cart</Typography>
            {cart.length === 0 ? (
              <Typography variant="body2" sx={{ py: 2 }}>
                Your cart is empty
              </Typography>
            ) : (
              <>
                <List>
                  {cart.map((item) => (
                    <React.Fragment key={item.product.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            onClick={() => handleRemove(item.product.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar src={item.product.images?.[0]?.url} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.product.name}
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2">
                                ${item.product.price}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton 
                                  size="small"
                                  onClick={() => handleQuantityChange(item.product.id, item.count, -1)}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography sx={{ mx: 1 }}>
                                  {item.count}
                                </Typography>
                                <IconButton 
                                  size="small"
                                  onClick={() => handleQuantityChange(item.product.id, item.count, 1)}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>

                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Total: ${totalPrice.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => {
                      handleClose();
                      navigate('/checkout');
                    }}
                  >
                    Checkout
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Popover>
    </>
  );
};

export default CartDropdown; 