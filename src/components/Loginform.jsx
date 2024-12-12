import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LoginForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } // Correct way to access form errors
  } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/login', data);
      // Handle successful login
      console.log(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="email" 
        {...register('email', { 
          required: 'Email is required', 
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })} 
        placeholder="Email" 
      />
      {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
      
      <input 
        type="password" 
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        })} 
        placeholder="Password" 
      />
      {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
      
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default LoginForm;