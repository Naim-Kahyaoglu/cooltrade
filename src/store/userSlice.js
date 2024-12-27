import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

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

const initialState = {
  user: null,
  token: storedToken,
  isAuthenticated: !!storedToken,
  isLoading: false,
  error: null
};

// Async thunks
export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      // Token doğrulama için alternatif bir yaklaşım
      const response = await axios.get('/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Token Verification Error:', error.response || error);
      
      if (error.response?.status === 401) {
        // Log the error instead of removing the token
        console.warn('Token verification failed, but token will not be deleted', error);
      }
      
      return rejectWithValue(error.response?.data?.message || 'Token verification failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      const { token, ...userData } = response.data;
      
      console.log('Login Response Token:', token);
      
      // Token'ı doğru şekilde kaydet
      localStorage.setItem('token', token);
      setAuthToken(token);
      
      return { user: userData, token };
    } catch (error) {
      console.error('Login Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

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
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Log the logout attempt instead of removing the token
      console.warn('Logout attempted, but token will not be deleted');
      // Optionally, you can add custom logout handling here
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Verify Token
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = localStorage.getItem('token');
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        setAuthToken(null);
      })
      
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
