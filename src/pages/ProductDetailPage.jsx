import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Divider,
  Skeleton,
  IconButton,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  TextField,
  Chip,
  Stack
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  CheckCircle as CheckIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import productDetailImage from '../images/productdetail.jpg';

const ProductDetailPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [product, setProduct] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simüle edilmiş ürün verisi
    const mockProduct = {
      id: parseInt(id),
      name: `Product ${id}`,
      description: `This is a detailed description for product ${id}. Here you can find all the information about this amazing product.`,
      price: 99.99 + parseInt(id) * 10,
      rating: 4.5,
      reviewCount: 128,
      stock: 15,
      features: [
        'High quality materials',
        'Durable construction',
        'Modern design',
        'Easy to use'
      ],
      specifications: {
        'Material': 'Premium Quality',
        'Dimensions': '10 x 20 x 5 inches',
        'Weight': '2.5 lbs',
        'Warranty': '2 years'
      }
    };
    setProduct(mockProduct);
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, product?.stock || 1)));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} sx={{ mt: 2 }} />
            <Skeleton variant="text" height={100} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" height={50} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
            <Box
              component="img"
              src={productDetailImage}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <IconButton onClick={() => setIsFavorite(!isFavorite)}>
                {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount} reviews)
              </Typography>
            </Stack>

            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Quantity Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                Quantity:
              </Typography>
              <IconButton size="small" onClick={() => handleQuantityChange(-1)}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <IconButton size="small" onClick={() => handleQuantityChange(1)}>
                <AddIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                {product.stock} available
              </Typography>
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<CartIcon />}
              fullWidth
              sx={{ mb: 2 }}
            >
              Add to Cart
            </Button>

            {/* Shipping Info */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShippingIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Free shipping on orders over $50
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Secure payment
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Tabs */}
            <Box sx={{ width: '100%' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="product information tabs"
              >
                <Tab label="Description" />
                <Tab label="Features" />
                <Tab label="Specifications" />
              </Tabs>

              <Box sx={{ mt: 2 }}>
                {tabValue === 0 && (
                  <Typography variant="body1" color="text.secondary">
                    {product.description}
                  </Typography>
                )}
                {tabValue === 1 && (
                  <List>
                    {product.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                )}
                {tabValue === 2 && (
                  <List>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListItemText
                          primary={key}
                          secondary={value}
                          primaryTypographyProps={{
                            variant: 'subtitle2',
                            color: 'text.secondary'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
