import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Token yönetimi fonksiyonları
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    console.log('Axios Request Config:', {
      method: config.method,
      url: config.url,
      params: config.params,
      headers: config.headers
    });
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', {
      status: response.status,
      data: response.data
    });
    console.log('API Response:', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Axios Response Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      // Token geçersizse çıkış yap
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      
      toast.error('Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.');
      
      // Global bir event dispatch et
      const event = new Event('unauthorized');
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  }
);

export { setAuthToken };
export default api;