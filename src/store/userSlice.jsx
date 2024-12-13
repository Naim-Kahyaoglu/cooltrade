import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const axiosInstance = axios.create({
        baseURL: 'https://workintech-fe-ecommerce.onrender.com',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const response = await axiosInstance.post('/login', userData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;