import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SORT_OPTIONS } from '../../pages/ShopPage/constants';

const SearchAndSort = ({
  searchTerm = '',
  sortBy = '',
  onSearchChange,
  onSortChange,
  onClearSearch,
}) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Trigger search if needed
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      {/* Search Field */}
      <TextField
        fullWidth
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={onClearSearch}
                edge="end"
                size="small"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ flex: 1 }}
      />

      {/* Sort Select */}
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          value={sortBy}
          label="Sort By"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchAndSort; 