import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../store/userSlice';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
  Grid
} from '@mui/material';

// Axios instance oluşturma
const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',  // API'nin base URL'si
  headers: {
    'Content-Type': 'application/json',  // Gönderilen verinin JSON formatında olduğunu belirtir
  },
});

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error: reduxError } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role_id: '',  // Bu alanda başlangıçta boş
    store: {
      name: '',
      phone: '',
      tax_no: '',
      bank_account: '',
    },
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  // Rolleri çekmek için useEffect hook'u
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles');  // Axios ile /roles endpoint'inden veri çekiliyor
        console.log('Fetchlenen roller:', response.data);
        setRoles(response.data);  // Yanıtın tamamını alıyoruz

        // 'Müşteri' rolünü bulup, formData.role_id'yi bu rolün id'siyle ayarlıyoruz
        const customerRole = response.data.find(role => role.code === 'customer');
        console.log('Müşteri rolü:', customerRole);
        if (customerRole) {
          setFormData(prev => ({ ...prev, role_id: customerRole.id }));
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Formdaki değişiklikleri handle etme
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Change event:', { name, value });  
    if (name.startsWith('store.')) {
      const storeField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        store: { ...prev.store, [storeField]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Şifre doğrulama
  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Şifre doğrulama işlemi
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long and include numbers, lowercase, uppercase, and special characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: formData.role_id,  // Rol ID'sini gönderiyoruz
    };

    // Eğer 'Mağaza' rolü seçildiyse, store bilgilerini de gönderiyoruz
    if (formData.role_id === 2 || formData.role_id === '2') { // 'Mağaza' rolünün id'si 2
      dataToSend.store = formData.store;
    }

    try {
      await dispatch(signupUser(dataToSend)).unwrap();
      alert('You need to click link in email to activate your account!');
      navigate(-1);  // Kayıttan sonra önceki sayfaya yönlendirme
    } catch (err) {
      setError(err || 'An error occurred during signup.');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
                helperText="Password must be at least 8 characters long and include numbers, lowercase, uppercase, and special characters"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Role"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                required
                variant="outlined"
              >
                {roles?.map(role => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {(formData.role_id === 2 || formData.role_id === '2') && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Store Name"
                    name="store.name"
                    value={formData.store.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    inputProps={{ minLength: 3 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Store Phone"
                    name="store.phone"
                    value={formData.store.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    inputProps={{ pattern: '[0-9]{10}' }}
                    helperText="Enter 10 digit phone number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Store Tax ID"
                    name="store.tax_no"
                    value={formData.store.tax_no}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    inputProps={{ pattern: 'T[0-9]{4}V[0-9]{6}' }}
                    helperText="Format: TXXXXVXXXXXX"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Store Bank Account (IBAN)"
                    name="store.bank_account"
                    value={formData.store.bank_account}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    inputProps={{ pattern: 'TR[0-9]{2}[0-9]{5}[0-9]{1}[0-9]{16}' }}
                    helperText="Format: TRXX XXXX X XXXX XXXX XXXX XX"
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Signing up...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>

          {(reduxError || error) && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {reduxError || error}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupForm;

