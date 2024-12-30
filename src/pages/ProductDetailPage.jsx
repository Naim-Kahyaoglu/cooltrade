import React, { useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Rating, 
  CircularProgress,
  Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductDetails, 
  selectCurrentProduct, 
  selectLoading, 
  selectErrorDetails 
} from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { LocalShipping, Star, ShoppingCart } from '@mui/icons-material';

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

const ProductDetailPage = () => {
  const { productId, productNameSlug, gender, categoryName, categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('ProductDetailPage Params:', { productId, productNameSlug, gender, categoryName, categoryId });

  const product = useSelector(selectCurrentProduct);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectErrorDetails);

  useEffect(() => {
    if (productId) {
      console.log('Dispatching fetchProductDetails with ID:', productId);
      dispatch(fetchProductDetails(productId));
    }
  }, [productId, dispatch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0]?.url
      }));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Ürün detayları yüklenemedi: {error}
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Ürün bulunamadı. Ürün ID: {productId}
        </Typography>
      </Container>
    );
  }

  // Verify slug match (optional but recommended)
  const expectedSlug = slugify(product.name);
  if (productNameSlug && productNameSlug !== expectedSlug) {
    console.warn(`Slug mismatch: expected ${expectedSlug}, got ${productNameSlug}`);
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button 
        variant="outlined" 
        onClick={handleGoBack} 
        sx={{ mb: 2 }}
      >
        Geri Dön
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              position: 'relative', 
              width: '100%', 
              paddingTop: '100%', 
              overflow: 'hidden' 
            }}
          >
            <img 
              src={product.images?.[0]?.url || '/default-product-image.png'} 
              alt={product.name} 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
            {product.stock <= 10 && (
              <Chip 
                label={`Son ${product.stock} ürün!`} 
                color="warning" 
                sx={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10 
                }} 
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {product.description}
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Rating 
              value={product.rating || 0} 
              precision={0.1} 
              readOnly 
              icon={<Star color="primary" />}
            />
            <Typography variant="body2" ml={2} color="text.secondary">
              ({product.sell_count || 0} satış)
            </Typography>
          </Box>
          
          <Typography variant="h5" color="primary" gutterBottom>
            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <LocalShipping sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Ücretsiz Kargo
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Stok: {product.stock} adet
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            startIcon={<ShoppingCart />}
          >
            Sepete Ekle
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
