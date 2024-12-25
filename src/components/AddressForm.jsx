import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material';
import { addAddress, updateAddress, toggleAddressForm } from '../store/addressSlice';

// Mock city data (you can replace this with actual API data)
const cities = [
  'Adana', 'Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya', 'Eskişehir'
].map(city => ({ value: city.toLowerCase(), label: city }));

const initialFormState = {
  title: '',
  name: '',
  surname: '',
  phone: '',
  city: '',
  district: '',
  neighborhood: '',
  addressType: 'shipping' // 'shipping' or 'receipt'
};

const AddressForm = () => {
  const dispatch = useDispatch();
  const { isAddressFormOpen, editingAddress, isLoading } = useSelector(state => state.address);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        title: editingAddress.title || '',
        name: editingAddress.name || '',
        surname: editingAddress.surname || '',
        phone: editingAddress.phone || '',
        city: editingAddress.city || '',
        district: editingAddress.district || '',
        neighborhood: editingAddress.neighborhood || '',
        addressType: editingAddress.addressType || 'shipping'
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingAddress]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Adres başlığı gerekli';
    if (!formData.name) newErrors.name = 'Ad gerekli';
    if (!formData.surname) newErrors.surname = 'Soyad gerekli';
    if (!formData.phone) newErrors.phone = 'Telefon gerekli';
    if (!formData.city) newErrors.city = 'İl gerekli';
    if (!formData.district) newErrors.district = 'İlçe gerekli';
    if (!formData.neighborhood) newErrors.neighborhood = 'Mahalle gerekli';

    // Phone number validation
    const phoneRegex = /^05[0-9]{8}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz (05XXXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const addressData = {
      ...formData,
      phone: formData.phone.replace(/\D/g, '') // Remove non-digits
    };

    if (editingAddress) {
      dispatch(updateAddress({ id: editingAddress.id, ...addressData }));
    } else {
      dispatch(addAddress(addressData));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleClose = () => {
    dispatch(toggleAddressForm());
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <Dialog 
      open={isAddressFormOpen} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Adres Tipi</FormLabel>
                <RadioGroup
                  row
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleChange}
                >
                  <FormControlLabel 
                    value="shipping" 
                    control={<Radio />} 
                    label="Teslimat Adresi" 
                  />
                  <FormControlLabel 
                    value="receipt" 
                    control={<Radio />} 
                    label="Fatura Adresi" 
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adres Başlığı"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                placeholder="örn: Ev adresi"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ad"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soyad"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                error={!!errors.surname}
                helperText={errors.surname}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone || "Örnek: 05XXXXXXXX"}
                placeholder="05XXXXXXXX"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="İl"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              >
                {cities.map((city) => (
                  <MenuItem key={city.value} value={city.value}>
                    {city.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="İlçe"
                name="district"
                value={formData.district}
                onChange={handleChange}
                error={!!errors.district}
                helperText={errors.district}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mahalle"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                error={!!errors.neighborhood}
                helperText={errors.neighborhood}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
          >
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddressForm; 