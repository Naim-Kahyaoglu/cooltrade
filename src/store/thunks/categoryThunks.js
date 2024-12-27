import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

// Top 5 kategorileri getiren thunk
export const fetchTopCategories = createAsyncThunk(
  'categories/fetchTopCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/categories', {
        params: {
          limit: 5
        }
      });

      console.log('Top Categories Response:', response.data);

      return {
        topCategories: response.data.categories || [],
        total: response.data.total || 0
      };
    } catch (error) {
      console.error('Fetch Top Categories Error:', error);
      
      // Detaylı hata bilgisi
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
        console.error('Error Headers:', error.response.headers);
      }
      
      // Kullanıcıya bildirim
      toast.error('Kategoriler yüklenemedi.');

      // Boş liste döndür
      return {
        topCategories: [],
        total: 0
      };
    }
  }
);

