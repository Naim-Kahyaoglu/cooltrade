import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Slide } from '@mui/material';
import { formatPrice } from '../../utils/formatUtils';
import { selectCartItems, selectCartTotal } from '../../store/reducers/shoppingCartReducer';

const OrderSummaryBox = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Sepette ürün varsa göster
  const shouldShow = cartItems.length > 0;

  return (
    <>
      {/* Mobile version */}
      <Slide direction="up" in={shouldShow} mountOnEnter unmountOnExit>
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'grey.200',
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            gap: 2
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Sepetinizde
              </Typography>
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                {cartItems.length} ürün
              </Typography>
              <Typography variant="body2" color="text.secondary">
                bulunmaktadır
              </Typography>
            </Box>
            <Typography fontWeight={600} color="primary.main" fontSize="1.1rem">
              {formatPrice(cartTotal >= 150 ? cartTotal : cartTotal + 29.99)}
            </Typography>
            {cartTotal < 150 && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                150 TL üzeri kargo bedava
              </Typography>
            )}
          </Box>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: '#f27a1a',
              '&:hover': {
                bgcolor: '#d85a00'
              },
              height: '44px',
              flex: '0 0 auto',
              width: '140px',
              fontSize: '0.9rem',
              textTransform: 'none',
              borderRadius: 1
            }}
            onClick={() => navigate('/checkout')}
          >
            Sepete Git
          </Button>
        </Paper>
      </Slide>

      {/* Desktop version */}
      <Paper 
        elevation={3}
        sx={{ 
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: 20,
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sipariş Özeti
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Sepetinizde
            </Typography>
            <Typography variant="body2" color="primary.main" fontWeight={600}>
              {cartItems.length} ürün
            </Typography>
            <Typography variant="body2" color="text.secondary">
              bulunmaktadır
            </Typography>
          </Box>
          
          {shouldShow ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Ürünlerin Toplamı</Typography>
                <Typography variant="body2">{formatPrice(cartTotal)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Kargo</Typography>
                <Typography variant="body2">{cartTotal >= 150 ? 'Ücretsiz' : formatPrice(29.99)}</Typography>
              </Box>

              {cartTotal < 150 && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, mb: 2 }}>
                  150 TL üzeri kargo bedava
                </Typography>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Toplam
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                  {formatPrice(cartTotal >= 150 ? cartTotal : cartTotal + 29.99)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{ 
                  bgcolor: '#f27a1a',
                  '&:hover': {
                    bgcolor: '#d85a00'
                  },
                  height: '44px',
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  borderRadius: 1
                }}
                onClick={() => navigate('/checkout')}
              >
                Sepete Git
              </Button>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Sepetiniz boş
            </Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default OrderSummaryBox; 