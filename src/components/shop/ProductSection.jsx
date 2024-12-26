import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Button,
  CircularProgress,
  Pagination,
  Stack
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatPrice } from '../../utils/formatUtils';
import shopPageImage from '../../images/shoppage.png';

const ProductSection = ({
  products = [],
  isLoading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
  onAddToCart,
}) => {
  if (isLoading && products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 4 }}>
        <CircularProgress sx={{ color: '#f27a1a' }} />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Ürün bulunamadı
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {products.map((product) => (
          <Grid 
            item 
            xs={6} 
            sm={4} 
            md={3} 
            key={product.id}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height={{ xs: 140, sm: 180, md: 200 }}
                  image={product.images?.[0]?.url || shopPageImage}
                  alt={product.name}
                  sx={{ 
                    objectFit: 'cover',
                    bgcolor: 'grey.100'
                  }}
                />
                {product.discount_rate && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'error.main',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    %{product.discount_rate}
                  </Box>
                )}
              </Box>
              <CardContent 
                sx={{ 
                  flexGrow: 1, 
                  p: { xs: 1, sm: 1.5, md: 2 },
                  '&:last-child': { pb: { xs: 1, sm: 1.5, md: 2 } }
                }}
              >
                <Typography 
                  gutterBottom 
                  variant="subtitle1" 
                  component="div" 
                  noWrap
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 500,
                    mb: 0.5
                  }}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: { xs: '32px', sm: '40px' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  height: { xs: '20px', sm: '24px' }
                }}>
                  <Rating 
                    value={product.rating || 0} 
                    readOnly 
                    precision={0.1} 
                    size="small"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      ml: 0.5,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    ({product.rating_count || 0})
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ 
                    mb: 1, 
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    fontWeight: 600
                  }}
                >
                  {formatPrice(product.price)}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
                  onClick={() => onAddToCart(product)}
                  fullWidth
                  size="small"
                  sx={{
                    bgcolor: '#f27a1a',
                    '&:hover': {
                      bgcolor: '#d85a00'
                    },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 0.5, sm: 0.75 }
                  }}
                >
                  Sepete Ekle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Stack 
        spacing={2} 
        alignItems="center" 
        sx={{ 
          mt: 4,
          mb: 2,
          position: 'relative'
        }}
      >
        {isLoading && (
          <Box 
            sx={{ 
              position: 'absolute',
              top: -40,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <CircularProgress size={32} sx={{ color: '#f27a1a' }} />
          </Box>
        )}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2
        }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Toplam {totalPages * 25} ürün
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }
            }}
          />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Sayfa {page} / {totalPages}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductSection; 