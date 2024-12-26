import React from 'react';
import {
  Box,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Button,
  Rating,
  Slider as MUISlider
} from '@mui/material';
import { colors, PRICE_RANGE } from '../../pages/ShopPage/constants';
import { getGenderDisplayName } from '../../utils/genderUtils';

const ActiveFilters = ({ filters, onRemoveFilter }) => {
  const { categoryId, searchTerm, sortBy, selectedColors, categories } = filters;

  if (!categoryId && !searchTerm && !sortBy && selectedColors.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Active Filters</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {categoryId && (
          <Chip
            label={`Category: ${categories.find(c => c.id.toString() === categoryId)?.title}`}
            onDelete={() => onRemoveFilter('category')}
            size="small"
          />
        )}
        {searchTerm && (
          <Chip
            label={`Search: ${searchTerm}`}
            onDelete={() => onRemoveFilter('search')}
            size="small"
          />
        )}
        {sortBy && (
          <Chip
            label={`Sort: ${
              {
                'price:asc': 'Price: Low to High',
                'price:desc': 'Price: High to Low',
                'rating:asc': 'Rating: Low to High',
                'rating:desc': 'Rating: High to Low'
              }[sortBy]
            }`}
            onDelete={() => onRemoveFilter('sort')}
            size="small"
          />
        )}
        {selectedColors.map(color => (
          <Chip
            key={color}
            label={`Color: ${colors.find(c => c.value === color)?.name}`}
            onDelete={() => onRemoveFilter('color', color)}
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

const FilterSection = ({ 
  filters, 
  groupedCategories = {}, 
  onFilterChange, 
  onApplyFilters 
}) => {
  const { 
    categoryId, 
    priceRange, 
    selectedRatings = [], 
    selectedColors = [] 
  } = filters || {};

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
      
      {/* Active Filters */}
      <ActiveFilters filters={filters} onRemoveFilter={onFilterChange} />

      {/* Categories Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Categories</Typography>
        <FormGroup>
          {Object.entries(groupedCategories).map(([gender, categories]) => (
            <Box key={gender}>
              <Typography variant="subtitle2" sx={{ mt: 1, mb: 0.5, color: 'text.secondary' }}>
                {getGenderDisplayName(gender)}
              </Typography>
              {categories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      checked={categoryId === category.id.toString()}
                      onChange={() => onFilterChange('category', category.id)}
                      size="small"
                    />
                  }
                  label={category.title}
                />
              ))}
            </Box>
          ))}
        </FormGroup>
      </Box>

      {/* Price Range Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Price Range</Typography>
        <MUISlider
          value={priceRange}
          onChange={(_, value) => onFilterChange('price', value)}
          valueLabelDisplay="auto"
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      {/* Rating Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Rating</Typography>
        <FormGroup>
          {[5, 4, 3, 2, 1].map((rating) => (
            <FormControlLabel
              key={rating}
              control={
                <Checkbox
                  checked={selectedRatings.includes(rating)}
                  onChange={() => onFilterChange('rating', rating)}
                  size="small"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={rating} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>& Up</Typography>
                </Box>
              }
            />
          ))}
        </FormGroup>
      </Box>

      {/* Color Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Colors</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {colors.map((color) => (
            <Chip
              key={color.value}
              label={color.name}
              onClick={() => onFilterChange('color', color.value)}
              sx={{
                bgcolor: selectedColors.includes(color.value) ? 'primary.main' : 'background.paper',
                color: selectedColors.includes(color.value) ? 'white' : 'text.primary',
                '&:hover': {
                  bgcolor: selectedColors.includes(color.value) ? 'primary.dark' : 'action.hover',
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Apply Filters Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={onApplyFilters}
        sx={{ mt: 2 }}
      >
        Apply Filters
      </Button>
    </Paper>
  );
};

export default FilterSection; 