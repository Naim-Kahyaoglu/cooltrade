import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  CircularProgress
} from '@mui/material';
import { getGenderFromCode, getGenderDisplayName } from '../../utils/genderUtils';
import { formatTitle } from '../../utils/formatUtils';
import shopPageImage from '../../images/shoppage.png';

const TopCategories = ({ categories = [], isLoading = false, onCategoryClick }) => {
  // Filter and map categories
  const filteredCategories = categories
    .filter(category => category.code?.split(':')[1] && category.title)
    .map(category => ({
      ...category,
      gender: getGenderFromCode(category.gender),
      title: formatTitle(category.title)
    }));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3,
          fontWeight: 'normal',
          color: 'text.primary',
          textTransform: 'none'
        }}
      >
        Top Categories
      </Typography>
      <Grid container spacing={3}>
        {filteredCategories.map((category) => {
          const gender = getGenderFromCode(category.gender);
          const type = category.code.split(':')[1];
          
          return (
            <Grid item xs={12} sm={6} md={2.4} key={category.id}>
              <Card 
                component={Link}
                to={`/shop/${gender}/${type}/${category.id}`}
                onClick={() => onCategoryClick?.(gender, type, category.id)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.img || shopPageImage}
                  alt={category.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getGenderDisplayName(gender)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Rating value={category.rating || 0} readOnly precision={0.1} />
                    <Typography variant="body2" color="text.secondary">
                      {category.product_count} products
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TopCategories; 