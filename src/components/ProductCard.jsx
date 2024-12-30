import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
  Chip,
  Rating
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-hot-toast';

// Default product image
const productImage = 'https://via.placeholder.com/300x200';

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleProductClick = () => {
    // Construct URL: /product/:productId/:productNameSlug
    const productNameSlug = slugify(product.name);
    const productDetailUrl = `/product/${product.id}/${productNameSlug}`;
    navigate(productDetailUrl);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]?.url
    }));
    toast.success('Ürün sepete eklendi!');
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer', 
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 3
        }
      }}
      onClick={handleProductClick}
    >
      <CardMedia
        component="img"
        height="250"
        image={product.images?.[0]?.url || productImage}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </Typography>
          <Rating 
            value={product.rating || 0} 
            size="small" 
            precision={0.1} 
            readOnly 
          />
        </Box>
      </CardContent>
      <CardActions>
        <IconButton 
          color="primary" 
          onClick={handleAddToCart}
          title="Sepete Ekle"
        >
          <ShoppingCartIcon />
        </IconButton>
        <IconButton 
          color={isFavorite ? 'error' : 'default'}
          onClick={handleToggleFavorite}
          title="Favorilere Ekle"
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
      {product.stock <= 10 && (
        <Chip 
          label={`Son ${product.stock} ürün!`} 
          color="warning" 
          size="small" 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10 
          }} 
        />
      )}
    </Card>
  );
};

export default ProductCard;
