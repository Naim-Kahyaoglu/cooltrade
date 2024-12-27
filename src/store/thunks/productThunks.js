import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { toast } from 'react-hot-toast';

const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId) => {
    try {
      const response = await axios.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Fetch Product Error:', error);
      toast.error('Ürün yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      throw error;
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({
    category,
    searchTerm,
    sortBy = null, 
    page = 1,
    limit = 25
  }, { rejectWithValue }) => {
    try {
      const params = {};
      
      // Kategori parametresi
      if (category) {
        params.category = category;
      }
      
      // Arama terimi
      if (searchTerm) {
        params.filter = searchTerm;
      }
      
      // Sıralama
      if (sortBy) {
        switch(sortBy) {
          case 'price_asc':
            params.sort = 'price';
            params.order = 'asc';
            break;
          case 'price_desc':
            params.sort = 'price';
            params.order = 'desc';
            break;
          case 'rating_asc':
            params.sort = 'rating';
            params.order = 'asc';
            break;
          case 'rating_desc':
            params.sort = 'rating';
            params.order = 'desc';
            break;
        }
      }
      
      // Sayfalama
      params.limit = limit;
      params.offset = (page - 1) * limit;

      console.log('Fetch Products Params:', params);

      try {
        const response = await axios.get('/products', { params });
        
        console.log('Fetch Products Response:', response.data);

        // Toplam sayfa sayısını hesapla
        const totalPages = Math.ceil(response.data.total / limit);

        return {
          products: response.data.products || [],
          total: response.data.total || 0,
          page: page,
          totalPages: totalPages
        };
      } catch (serverError) {
        console.error('Fetch Products Server Error:', serverError);
        
        // Sunucu hatası durumunda
        toast.error('Ürünler yüklenemedi. Sunucu hatası oluştu.');

        // Boş liste döndür
        return {
          products: [],
          total: 0,
          page: page,
          totalPages: 0
        };
      }
    } catch (error) {
      console.error('Fetch Products Error:', error);
      
      // Detaylı hata bilgisi
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
        console.error('Error Headers:', error.response.headers);
      }
      
      // Kullanıcıya bildirim
      toast.error('Ürünleri getirirken bir hata oluştu.');

      // Boş liste döndür
      return {
        products: [],
        total: 0,
        page: page,
        totalPages: 0
      };
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/categories');
      
      console.log('Fetch Categories Response:', response.data);

      // Top 5 kategorileri seç
      const topCategories = response.data
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      return topCategories;
    } catch (error) {
      console.error('Fetch Categories Error:', error);
      toast.error('Kategoriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      return rejectWithValue(error.response?.data || 'Kategoriler yüklenirken hata oluştu');
    }
  }
);

export { fetchProduct };