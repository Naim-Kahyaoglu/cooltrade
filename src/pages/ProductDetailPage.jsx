import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/thunks/productThunks';
import { FETCH_STATES } from '../store/reducers/productReducer';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Rating,
  CircularProgress,
  Alert,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, fetchState } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (fetchState === FETCH_STATES.FETCHING) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (fetchState === FETCH_STATES.FAILED) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">Failed to load product details. Please try again later.</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info">Product not found.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 4 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
            <Box
              component="img"
              src={product.images?.[0]?.url}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                aspectRatio: '1/1'
              }}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.sell_count} sold)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {product.stock} items in stock
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<CartIcon />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;

