import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Örnek adresler
const sampleAddresses = [
  {
    id: 1,
    title: 'Ev Adresi',
    name: 'Mehmet',
    surname: 'Yılmaz',
    phone: '05325554433',
    city: 'istanbul',
    district: 'Kadıköy',
    neighborhood: 'Caferağa Mahallesi',
    addressType: 'shipping',
    fullAddress: 'Moda Caddesi No: 123 Daire: 5'
  },
  {
    id: 2,
    title: 'İş Adresi',
    name: 'Mehmet',
    surname: 'Yılmaz',
    phone: '05553332211',
    city: 'istanbul',
    district: 'Şişli',
    neighborhood: 'Mecidiyeköy Mahallesi',
    addressType: 'shipping',
    fullAddress: 'Büyükdere Caddesi No: 45 Kat: 8'
  },
  {
    id: 3,
    title: 'Yazlık',
    name: 'Mehmet',
    surname: 'Yılmaz',
    phone: '05444443322',
    city: 'izmir',
    district: 'Çeşme',
    neighborhood: 'Alaçatı Mahallesi',
    addressType: 'shipping',
    fullAddress: 'Deniz Sokak No: 7'
  }
];

const initialState = {
  addresses: sampleAddresses, // Örnek adresleri başlangıçta ekle
  selectedShippingAddress: sampleAddresses[0], // İlk adresi seçili olarak ayarla
  selectedReceiptAddress: null,
  isAddressFormOpen: false,
  editingAddress: null,
  isLoading: false,
  error: null
};

export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (addressData) => {
    // API çağrısı simülasyonu
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...addressData
        });
      }, 1000);
    });
  }
);

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async (addressData) => {
    // API çağrısı simülasyonu
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(addressData);
      }, 1000);
    });
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setSelectedShippingAddress: (state, action) => {
      state.selectedShippingAddress = action.payload;
    },
    setSelectedReceiptAddress: (state, action) => {
      state.selectedReceiptAddress = action.payload;
    },
    toggleAddressForm: (state) => {
      state.isAddressFormOpen = !state.isAddressFormOpen;
      if (!state.isAddressFormOpen) {
        state.editingAddress = null;
      }
    },
    setEditingAddress: (state, action) => {
      state.editingAddress = action.payload;
      state.isAddressFormOpen = true;
    },
    clearAddressError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses.push(action.payload);
        if (!state.selectedShippingAddress) {
          state.selectedShippingAddress = action.payload;
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// Selectors
export const selectAddresses = (state) => state.address.addresses;
export const selectSelectedShippingAddress = (state) => state.address.selectedShippingAddress;
export const selectSelectedReceiptAddress = (state) => state.address.selectedReceiptAddress;
export const selectIsAddressFormOpen = (state) => state.address.isAddressFormOpen;
export const selectEditingAddress = (state) => state.address.editingAddress;
export const selectAddressError = (state) => state.address.error;
export const selectIsAddressLoading = (state) => state.address.isLoading;

export const { 
  setSelectedShippingAddress,
  setSelectedReceiptAddress,
  toggleAddressForm, 
  setEditingAddress, 
  clearAddressError 
} = addressSlice.actions;

export default addressSlice.reducer; 