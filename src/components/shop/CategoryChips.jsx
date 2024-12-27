import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const CategoryChips = ({ categories = [], onCategoryClick, selectedCategory }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Top Kategoriler
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.title}
            avatar={
              <img 
                src={category.img} 
                alt={category.title} 
                style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  objectFit: 'cover' 
                }} 
              />
            }
            onClick={() => onCategoryClick(category)}
            sx={{
              backgroundColor: selectedCategory && selectedCategory.id === category.id ? 'primary.main' : 'primary.light',
              color: selectedCategory && selectedCategory.id === category.id ? 'primary.contrastText' : 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.main',
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryChips;

