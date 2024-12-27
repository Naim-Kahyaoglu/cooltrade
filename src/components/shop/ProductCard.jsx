import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    navigate(`/product/${product.id}/${slug}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={product.images && product.images.length > 0 
          ? product.images[0].url 
          : 'https://via.placeholder.com/250'}
        alt={product.name}
        onClick={handleProductClick}
        sx={{ 
          cursor: 'pointer', 
          objectFit: 'cover' 
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          onClick={handleProductClick}
          sx={{ 
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            size="small"
            onClick={onAddToCart}
          >
            Sepete Ekle
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
