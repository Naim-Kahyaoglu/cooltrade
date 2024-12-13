import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Axios instance oluşturma
const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',  // API'nin base URL'si
  headers: {
    'Content-Type': 'application/json',  // Gönderilen verinin JSON formatında olduğunu belirtir
  },
});

const SignupForm = () => {
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setError('');

    // Şifre doğrulama işlemi
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long and include numbers, lowercase, uppercase, and special characters.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role_id: formData.role_id,  // Rol ID'sini gönderiyoruz
      };

      // Eğer 'Mağaza' rolü seçildiyse, store bilgilerini de gönderiyoruz
      if (formData.role_id === 2) { // 'Mağaza' rolünün id'si 2
        dataToSend.store = formData.store;
      }

      // Axios ile signup API'ye veri gönderme
      const response = await axiosInstance.post('/signup', dataToSend);

      // Başarılı kayıt işlemi
      alert('You need to click link in email to activate your account!');
      window.history.back();  // Kayıttan sonra önceki sayfaya yönlendirme
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
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

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SignupForm;
