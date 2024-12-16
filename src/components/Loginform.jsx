import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';

// Axios instance creation
const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const LoginForm = () => {
  const history = useHistory();
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
      const response = await axiosInstance.post('/login', data);

      console.log('Login Response:', response.data);

      // Activation control
      if (response.data.activated === false) {
        setError('Account not activated. Please check your email.');
        setLoading(false);
        return;
      }

      const gravatarHash = md5(data.email.toLowerCase().trim());
      const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}`;

      const userInfo = {
        ...response.data,
        gravatarUrl,
      };

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userInfo));

      // Redirect to the previous page or home page
      if (history.length > 1) {
        history.goBack();
      } else {
        history.push('/');
      }
    } catch (error) {
      console.error('Login Error:', error.response);

      // More detailed error messages
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        (error.response?.status === 401
          ? 'Invalid email or password'
          : 'Login failed');

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          {...register('rememberMe')}
          className="mr-2"
        />
        <label className="text-gray-700 text-sm">Remember Me</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}

      <div className="mt-4 text-center">
        <a href="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
        <span className="mx-2">|</span>
        <a href="/signup" className="text-blue-500 hover:underline">
          Don't have an account?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;

