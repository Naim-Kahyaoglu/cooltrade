import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Checkbox,
  Link,
  MenuItem,
  Select,
  Card,
  CardContent
} from '@mui/material';
import { Add as AddIcon, Security as SecurityIcon } from '@mui/icons-material';
import { toggleAddressForm } from '../store/addressSlice';
import AddressForm from '../components/AddressForm';

// Mock saved cards
const savedCards = [
  {
    id: 'bonus',
    name: 'BONUS kartım',
    number: '5556 60** **** 6885',
    expiry: '8/2030',
    type: 'Bonus',
    logo: '/images/bonus.png'
  },
  {
    id: 'vakifbank1',
    name: 'Vakıfbank kartım',
    number: '5421 19** **** 5420',
    expiry: '3/2025',
    type: 'Vakıfbank',
    logo: '/images/vakifbank.png'
  },
  {
    id: 'vakifbank2',
    name: 'Vakıfbank kartım',
    number: '5428 04** **** 2736',
    expiry: '6/2024',
    type: 'Vakıfbank',
    logo: '/images/vakifbank.png'
  }
];

// Mock saved address
const mockAddress = {
  id: 1,
  title: 'Ev',
  name: 'Ahmet',
  surname: 'Yılmaz',
  phone: '0532 123 45 67',
  city: 'Ankara',
  district: 'Etimesgut',
  neighborhood: 'Bağlıca Mah 1272. Sok.',
  address: 'Gökçekent Sitesi 2. Etap (Üst bloklar) No: 6/44',
  zipCode: '06000'
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.shoppingCart.cart);
  // Using mock address as initial selected address
  const [selectedShippingAddress] = useState(mockAddress);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [use3DSecure, setUse3DSecure] = useState(false);
  const [installmentOption, setInstallmentOption] = useState('single');
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [newCardData, setNewCardData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const shipping = 29.99;
  const freeShippingDiscount = subtotal >= 150 ? -shipping : 0;
  const total = subtotal + shipping + freeShippingDiscount;

  const handleAddressChange = () => {
    dispatch(toggleAddressForm());
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Column - Address and Payment */}
        <Grid item xs={12} md={8}>
          {/* Step 1: Address Information */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" component="div">
                Adres Bilgileri
              </Typography>
              <Button 
                variant="text" 
                color="primary"
                onClick={handleAddressChange}
              >
                Değiştir
              </Button>
            </Box>

            {selectedShippingAddress ? (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" component="div">
                  {selectedShippingAddress.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div" sx={{ whiteSpace: 'pre-line' }}>
                  {selectedShippingAddress.name} {selectedShippingAddress.surname}
                  {'\n'}
                  {selectedShippingAddress.neighborhood}, {selectedShippingAddress.district}
                  {'\n'}
                  {selectedShippingAddress.city}
                  {'\n'}
                  {selectedShippingAddress.phone}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Henüz adres seçilmedi
              </Typography>
            )}
          </Paper>

          {/* Step 2: Payment Options */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ödeme Seçenekleri
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Banka/Kredi Kartı veya Alışveriş Kredisi ile ödemenizi güvenle yapabilirsiniz.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Kart Bilgileri</Typography>
                <Link 
                  component="button"
                  variant="body2"
                  onClick={() => setShowNewCardForm(!showNewCardForm)}
                  sx={{ textDecoration: 'underline' }}
                >
                  {showNewCardForm ? 'Kayıtlı kartımla ödeme yap' : 'Başka bir Kart ile Ödeme Yap'}
                </Link>
              </Box>

              {showNewCardForm ? (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Kart Numarası
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="0000 0000 0000 0000"
                    value={newCardData.cardNumber}
                    onChange={(e) => setNewCardData({ ...newCardData, cardNumber: e.target.value })}
                    sx={{ mb: 2 }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography variant="subtitle1" gutterBottom>
                        Son Kullanma Tarihi
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Select
                          value={newCardData.expiryMonth}
                          onChange={(e) => setNewCardData({ ...newCardData, expiryMonth: e.target.value })}
                          displayEmpty
                          sx={{ width: '50%' }}
                        >
                          <MenuItem value="" disabled>Ay</MenuItem>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <MenuItem key={month} value={month}>{month.toString().padStart(2, '0')}</MenuItem>
                          ))}
                        </Select>
                        <Select
                          value={newCardData.expiryYear}
                          onChange={(e) => setNewCardData({ ...newCardData, expiryYear: e.target.value })}
                          displayEmpty
                          sx={{ width: '50%' }}
                        >
                          <MenuItem value="" disabled>Yıl</MenuItem>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        CVV
                        <SecurityIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={newCardData.cvv}
                        onChange={(e) => setNewCardData({ ...newCardData, cvv: e.target.value })}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <RadioGroup
                  value={selectedCard}
                  onChange={(e) => setSelectedCard(e.target.value)}
                >
                  {savedCards.map((card) => (
                    <Card
                      key={card.id}
                      variant="outlined"
                      sx={{
                        mb: 2,
                        border: '1px solid',
                        borderColor: selectedCard === card.id ? 'primary.main' : 'divider'
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <FormControlLabel
                          value={card.id}
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <img src={card.logo} alt={card.type} style={{ height: 24 }} />
                              <Box>
                                <Typography variant="body1">{card.number}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {card.expiry}
                                </Typography>
                              </Box>
                            </Box>
                          }
                          sx={{ m: 0 }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </RadioGroup>
              )}

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Taksit Seçenekleri
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Kartınıza uygun taksit seçeneğini seçiniz
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Taksit Sayısı
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Aylık Ödeme
                    </Typography>
                  </Grid>
                </Grid>

                <RadioGroup
                  value={installmentOption}
                  onChange={(e) => setInstallmentOption(e.target.value)}
                >
                  <FormControlLabel
                    value="single"
                    control={<Radio />}
                    label={
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Tek Çekim</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography color="primary">{total.toFixed(2)} TL</Typography>
                        </Grid>
                      </Grid>
                    }
                  />
                </RadioGroup>
              </Box>

              <Box sx={{ mt: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={use3DSecure}
                      onChange={(e) => setUse3DSecure(e.target.checked)}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SecurityIcon fontSize="small" />
                      <Typography variant="body2">
                        3D Secure ile ödemek istiyorum
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Sipariş Özeti
            </Typography>

            <List>
              {cart.map((item) => (
                <ListItem key={item.product.id} disablePadding>
                  <ListItemText
                    primary={
                      <Typography variant="body2" component="div">
                        {item.product.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" component="div">
                        {item.count} adet
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="body2">
                      {(item.product.price * item.count).toFixed(2)} TL
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Ürünün Toplamı</Typography>
                <Typography variant="body2">{subtotal.toFixed(2)} TL</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Kargo Toplam</Typography>
                <Typography variant="body2">{shipping.toFixed(2)} TL</Typography>
              </Box>
              {freeShippingDiscount !== 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</Typography>
                  <Typography variant="body2" color="error.main">
                    -{Math.abs(freeShippingDiscount).toFixed(2)} TL
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Toplam
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {total.toFixed(2)} TL
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" component="div">
                    <Link href="#" color="inherit">Ön Bilgilendirme Koşulları</Link>'nı ve{' '}
                    <Link href="#" color="inherit">Mesafeli Satış Sözleşmesi</Link>'ni
                    okudum, onaylıyorum.
                  </Typography>
                }
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={!acceptTerms || !selectedCard}
            >
              Ödeme Yap
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Address Form Dialog */}
      <AddressForm />
    </Container>
  );
};

export default CheckoutPage; 