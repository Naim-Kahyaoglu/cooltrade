import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Box, 
  Divider, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { fetchOrders, createOrder } from '../store/orderSlice';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const OrderDetailDialog = ({ open, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Sipariş Detayları</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Sipariş Bilgileri
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>Sipariş Tarihi: {formatDate(order.order_date)}</Typography>
            <Typography>Toplam Tutar: {order.price} TL</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Kart Bilgileri: {order.card_name}</Typography>
            <Typography>Kart Numarası: **** **** **** {order.card_no.slice(-4)}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Ürünler
        </Typography>
        {order.products.map((product, index) => (
          <Paper key={index} elevation={1} sx={{ p: 2, mb: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle1">{product.detail}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Adet: {product.count}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleOrderDetail = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Siparişlerim
      </Typography>

      {orders.length === 0 ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Henüz hiç siparişiniz bulunmamaktadır
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => {
              navigate('/shop');
            }}
          >
            İlk Siparişini Ver
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      Sipariş Tarihi: {formatDate(order.order_date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Toplam Tutar: {order.price} TL
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleOrderDetail(order)}
                    >
                      Sipariş Detayları
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <OrderDetailDialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        order={selectedOrder} 
      />
    </Container>
  );
};

export default OrdersPage;
