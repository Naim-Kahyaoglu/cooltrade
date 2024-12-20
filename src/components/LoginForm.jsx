import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';
import axios from 'axios';
import md5 from 'md5';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Axios instance creation
const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await dispatch(loginUser(data)).unwrap();
      
      if (response.activated === false) {
        setError('Account not activated. Please check your email.');
        return;
      }

      const gravatarHash = md5(data.email.toLowerCase().trim());
      const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}`;

      const userInfo = {
        ...response,
        gravatarUrl,
      };

      localStorage.setItem('user', JSON.stringify(userInfo));

      if (navigate.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox {...register('rememberMe')} color="primary" />}
            label="Remember Me"
            sx={{ mt: 1 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <Typography color="primary" variant="body2">
                Forgot Password?
              </Typography>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Typography color="primary" variant="body2">
                Don't have an account?
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
