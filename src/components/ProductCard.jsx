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
import { addToCart } from '../store/reducers/shoppingCartReducer';
import { toast } from 'react-hot-toast';

// Default product image
const productImage = 'https://via.placeholder.com/300x200';

const ProductCard = ({ product, gender, categoryName, categoryId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleClick = () => {
    // Create URL-friendly slug from product name
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .replace(/-+/g, '-');         // Remove consecutive hyphens

    // If we don't have category info, just navigate to the product with defaults
    if (!gender || !categoryName || !categoryId) {
      const defaultGender = 'kadin';  // Default gender
      const defaultCategory = 'genel'; // Default category name
      const defaultCategoryId = '1';   // Default category ID
      navigate(`/shop/${defaultGender}/${defaultCategory}/${defaultCategoryId}/${slug}/${product.id}`);
      return;
    }

    navigate(`/shop/${gender}/${categoryName}/${categoryId}/${slug}/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('Added to cart!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Get the first image URL from the images array
  const imageUrl = product.images?.[0]?.url || productImage;

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
      onClick={handleClick}
    >
      {product.discountPercentage > 0 && (
        <Chip
          label={`${product.discountPercentage}% OFF`}
          color="error"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1
          }}
        />
      )}
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating || 0} readOnly precision={0.5} size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.ratingCount || 0})
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
          {product.discountPercentage > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through', ml: 1 }}
            >
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{ flexGrow: 1, mr: 1 }}
        >
          Add to Cart
        </Button>
        <IconButton 
          onClick={handleFavoriteClick}
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

