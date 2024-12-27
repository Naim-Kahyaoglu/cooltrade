import React from 'react';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  useTheme
} from '@mui/material';

const HomePage = () => {
  const theme = useTheme();
  
  const images = [
    {
      imgPath: 'https://images.unsplash.com/photo-1732762990635-a713a09e9025?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Discover New Collection'
    },
    {
      imgPath: 'https://images.unsplash.com/photo-1732464508438-aab5691d1dae?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4..3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Summer Sale'
    },
    {
      imgPath: 'https://images.unsplash.com/photo-1733173523386-3006dec1a835?q=80&w=2105&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'New Arrivals'
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Product',
      description: 'High-quality product with exceptional features.',
      price: 99.99,
      rating: 4.5,
      reviewCount: 128,
      discount: 20,
      oldPrice: 129.99
    },
    {
      id: 2,
      name: 'Exclusive Item',
      description: 'Limited edition item with unique design.',
      price: 149.99,
      rating: 4.8,
      reviewCount: 89,
      discount: 15,
      oldPrice: 179.99
    },
    {
      id: 3,
      name: 'Special Collection',
      description: 'Part of our premium collection.',
      price: 79.99,
      rating: 4.2,
      reviewCount: 156
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section with Slider */}
      <Box sx={{ width: '100%', mb: 4 }}>
        <Slider images={images} />
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme.palette.primary.main
          }}
        >
          Featured Products
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {/* Additional Content Section */}
        <Box sx={{ mt: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Special Offers
                </Typography>
                <Typography variant="body1">
                  Discover our latest deals and exclusive discounts on premium products.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: theme.palette.secondary.light,
                  color: theme.palette.secondary.contrastText
                }}
              >
                <Typography variant="h6" gutterBottom>
                  New Arrivals
                </Typography>
                <Typography variant="body1">
                  Check out our newest collections and trending items.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;


