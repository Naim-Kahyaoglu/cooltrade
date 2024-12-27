import React from 'react';
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
import { useSelector } from 'react-redux';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const currentOrder = useSelector(state => state.order.currentOrder);

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
