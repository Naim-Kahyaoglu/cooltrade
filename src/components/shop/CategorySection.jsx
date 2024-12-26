import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Rating
} from '@mui/material';
import { getGenderDisplayName } from '../../utils/genderUtils';
import shopPageImage from '../../images/shoppage.png';

const CategorySection = ({ groupedCategories = {} }) => {
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
        Categories
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(groupedCategories).map(([gender, categories]) => (
          <Grid item xs={12} md={4} key={gender}>
            <Paper sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  textTransform: 'capitalize',
                  fontWeight: 'normal',
                  color: 'text.primary'
                }}
              >
                {getGenderDisplayName(gender)}
              </Typography>
              <Grid container spacing={2}>
                {categories.map((category) => (
                  <Grid item xs={12} sm={6} key={category.id}>
                    <Card 
                      component={Link}
                      to={`/shop/${gender}/${category.type}/${category.id}`}
                      sx={{ 
                        display: 'flex',
                        height: '100%',
                        textDecoration: 'none',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 100, objectFit: 'cover' }}
                        image={category.img || shopPageImage}
                        alt={category.title}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6" component="div">
                          {category.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getGenderDisplayName(gender)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Rating value={category.rating || 0} readOnly precision={0.1} size="small" />
                          <Typography variant="body2" color="text.secondary">
                            {category.product_count} products
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySection; 