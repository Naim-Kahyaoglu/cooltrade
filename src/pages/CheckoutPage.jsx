import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';

const CheckoutPage = () => {
  const cart = useSelector(state => state.shoppingCart.cart);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const shipping = 10; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Order Summary */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {cart.map((item) => (
                <React.Fragment key={item.product.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={item.product.images?.[0]?.url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product.name}
                      secondary={`Quantity: ${item.count}`}
                    />
                    <Typography variant="body1">
                      ${(item.product.price * item.count).toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Payment Details - To be implemented */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Payment integration will be implemented here
            </Typography>
          </Paper>
        </Grid>

        {/* Order Total */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Total
            </Typography>
            
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">${shipping.toFixed(2)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => {
                // Handle payment process
                console.log('Process payment');
              }}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage; 