import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';

// Axios instance
const axiosInstance = axios;

// Set token in axios headers
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Initialize token from localStorage
const storedToken = localStorage.getItem('token');
if (storedToken) {
  setAuthToken(storedToken);
}

// Async thunk for verifying token
export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      // Modify this endpoint based on your actual backend token verification route
      const response = await axios.get('/verify-token', {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      localStorage.removeItem('token');
      return rejectWithValue(error.response?.data || 'Token verification failed');
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      toast.success('Giriş başarılı!');
      
      return { user, token };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Giriş başarısız');
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/signup', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
      toast.success('Çıkış yapıldı');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Token Verification
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.token = null;
        localStorage.removeItem('token');
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.token = null;
        state.error = action.payload;
      })
      
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
