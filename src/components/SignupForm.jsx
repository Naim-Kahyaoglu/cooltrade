import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role_id: '',
    store: {
      name: '',
      phone: '',
      tax_no: '',
      bank_account: ''
    }
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Rolleri çek
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/roles');
        setRoles(response.data.roles);

           if (response.data.roles) { // Check if roles array exists
          // Find the Customer role
          const customerRole = response.data.roles.find(role => role.name === 'Customer');
          if (customerRole) {
            setFormData(prev => ({ ...prev, role_id: customerRole.id }));
          }
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('store.')) {
      const storeField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        store: { ...prev.store, [storeField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
        role_id: formData.role_id
      };

      if (formData.role_id === 'store_role_id') { // Store rolünün ID'sini buraya yazın
        dataToSend.store = formData.store;
      }

      const response = await axios.post('/signup', dataToSend);
      // Başarılı kayıt
      alert('You need to click link in email to activate your account!');
      // Önceki sayfaya yönlendir
      window.history.back();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <select
        name="role_id"
        value={formData.role_id}
        onChange={handleChange}
        required
      >
        {roles?.map(role => (
          <option key={role.id} value={role.id}>{role.name}</option>
        ))}
      </select>

      {formData.role_id === 'store_role_id' && ( // Store rolünün ID'sini buraya yazın
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
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SignupForm;