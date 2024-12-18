import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../store/userSlice';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}
      className="flex flex-col space-y-4 w-full max-w-md mx-auto">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      {console.log('Mevcut form durumu:', formData)}
      {console.log('Mevcut roller:', roles)}
      <select
        name="role_id"
        value={formData.role_id}
        onChange={handleChange}
        required
      >
          {console.log('Roller map edilirken:', roles)}
        {roles?.map(role => (
          <option key={role.id} value={role.id}>{role.name}</option>
        ))}
      </select>

      {formData.role_id === 2 || formData.role_id === '2' ? (  // Eğer 'Mağaza' rolü seçildiyse
        <>
          <input
            type="text"
            name="store.name"
            value={formData.store.name}
            onChange={handleChange}
            placeholder="Store Name"
            minLength={3}
            required
          />
          <input
            type="tel"
            name="store.phone"
            value={formData.store.phone}
            onChange={handleChange}
            placeholder="Store Phone"
            pattern="[0-9]{10}"
            required
          />
          <input
            type="text"
            name="store.tax_no"
            value={formData.store.tax_no}
            onChange={handleChange}
            placeholder="Store Tax ID"
            pattern="T[0-9]{4}V[0-9]{6}"
            required
          />
          <input
            type="text"
            name="store.bank_account"
            value={formData.store.bank_account}
            onChange={handleChange}
            placeholder="Store Bank Account (IBAN)"
            pattern="TR[0-9]{2}[0-9]{5}[0-9]{1}[0-9]{16}"
            required
          />
        </>
      ) : null}

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 
        transition duration-300 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing up...
          </>
        ) : (
          'Sign Up'
        )}
      </button>
      {reduxError && <p style={{ color: 'red' }}>{reduxError}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SignupForm;
