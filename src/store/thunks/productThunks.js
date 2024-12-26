import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({
    categoryId,
    searchTerm,
    sortBy,
    priceRange,
    ratings,
    colors,
    page,
    limit
  }) => {
    try {
      const params = {
        category: categoryId,
        filter: searchTerm,
        sort: sortBy,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minRating: ratings.length > 0 ? Math.min(...ratings) : undefined,
        color: colors.length > 0 ? colors.join(',') : undefined,
        limit,
        offset: (page - 1) * limit
      };

      // Remove undefined values
      Object.keys(params).forEach(key => 
        params[key] === undefined && delete params[key]
      );

      const response = await axios.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    try {
      const response = await axios.get('/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
); 