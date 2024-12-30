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
    console.warn('Attempted to remove token, but deletion is prevented');
    // Optionally, you can add a custom handling here
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
    console.group('🚨 Axios Unauthorized Error Detailed Logging 🚨');
    console.error('Full Error Object:', error);
    
    console.log('Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });

    // Log current token state before deletion
    const currentToken = localStorage.getItem('token');
    console.log('Current Token Before Deletion:', currentToken ? 'Exists' : 'Not Found');

    if (error.response?.status === 401) {
      // Log the unauthorized access without taking action
      console.warn('🔒 Unauthorized Access Detected, but no automatic logout');
      
      // Remove any automatic logout mechanisms
      toast.error('Authentication required for this action');
      
      // DO NOT dispatch unauthorized event
      // DO NOT automatically log out
      return Promise.reject(error);
    }
    
    console.groupEnd();
    return Promise.reject(error);
  }
);

export { setAuthToken };
export default api;
