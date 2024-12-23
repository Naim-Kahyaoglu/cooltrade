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
import productImage from '../images/productcard.avif';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event
    // Add to cart logic here
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    setIsFavorite(!isFavorite);
    // Add to favorites logic here
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      {product.discount && (
        <Chip
          label={`${product.discount}% OFF`}
          color="error"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1
          }}
        />
      )}
      
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': {
            bgcolor: 'background.paper',
          }
        }}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <CardMedia
        component="img"
        height="200"
        image={product.images?.[0]?.url || productImage}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          height: 200
        }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          mb: 1
        }}>
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={product.rating || 0} 
            readOnly 
            size="small" 
            precision={0.5}
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount || 0})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${product.price}
          </Typography>
          {product.oldPrice && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ textDecoration: 'line-through', ml: 1 }}
            >
              ${product.oldPrice}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          fullWidth 
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
