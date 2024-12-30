import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Divider 
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { createOrder } from '../store/orderSlice';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrder = useSelector(state => state.order.currentOrder);
  
  // Safely access cart items with optional chaining and default empty array
  const cartItems = useSelector(state => state.cart?.items || []);

  useEffect(() => {
    // If there are cart items, create an order and clear the cart
    if (cartItems.length > 0) {
      const orderData = {
        products: cartItems.map(item => ({
          detail: item.name || item.product?.name || 'Ürün',
          count: item.quantity || item.count || 1,
          price: (item.price || item.product?.price || 0) * (item.quantity || item.count || 1)
        })),
        price: cartItems.reduce((total, item) => 
          total + ((item.price || item.product?.price || 0) * (item.quantity || item.count || 1)), 
          0),
        order_date: new Date().toISOString(),
        card_name: "Banka Kartı",
        card_no: "4444 5555 6666 7777"
      };

      // Dispatch create order and clear cart
      dispatch(createOrder(orderData));
      dispatch(clearCart());
    }
  }, [cartItems, dispatch]);

  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mb: 3 
          }}
        >
          <CheckIcon 
            color="success" 
            sx={{ fontSize: 80, mb: 2 }} 
          />
          <Typography variant="h4" gutterBottom>
            Siparişiniz Başarıyla Alındı!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Teşekkür ederiz. Siparişiniz işleme alınmıştır.
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {currentOrder && (
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sipariş Detayları
            </Typography>
            <Typography variant="body1">
              Sipariş Numarası: {currentOrder.id}
            </Typography>
            <Typography variant="body1">
              Toplam Tutar: {currentOrder.price} TL
            </Typography>
          </Box>
        )}

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2 
          }}
        >
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/orders')}
          >
            Siparişlerimi Görüntüle
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={() => navigate('/')}
          >
            Ana Sayfaya Dön
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccessPage;
