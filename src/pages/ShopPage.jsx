import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Chip,
  Container,
  TextField,
  Select,
  Pagination
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import ProductCard from '../components/shop/ProductCard';
import CategoryChips from '../components/shop/CategoryChips';

import { fetchProducts } from '../store/thunks/productThunks';
import { fetchCategories } from '../store/categorySlice';
import { fetchTopCategories } from '../store/thunks/categoryThunks';
import { addToCart } from '../store/shoppingCartSlice';
import { 
  selectProducts,
  selectCategories, 
  selectProductStatus,
  selectTotalProducts,
  selectTotalPages,
  selectProductError
} from '../store/productSlice';
import { 
  selectTopCategories, 
  selectTopCategoriesLoading, 
  selectTopCategoriesError 
} from '../store/categorySlice';

// Sıralama seçenekleri
const sortOptions = [
  { value: null, label: 'Sıralama Yok' },
  { value: 'price_asc', label: 'Fiyata Göre Artan' },
  { value: 'price_desc', label: 'Fiyata Göre Azalan' },
  { value: 'rating_asc', label: 'Puana Göre Artan' },
  { value: 'rating_desc', label: 'Puana Göre Azalan' }
];

const ShopPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  // Redux state
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const totalProducts = useSelector(selectTotalProducts);
  const totalPages = useSelector(selectTotalPages);
  const topCategories = useSelector(selectTopCategories);
  const topCategoriesLoading = useSelector(selectTopCategoriesLoading);
  const topCategoriesError = useSelector(selectTopCategoriesError);

  // Ürünlerin yüklenme durumunu izle
  const productStatus = useSelector(selectProductStatus);

  // Hata mesajını izle
  const productError = useSelector(selectProductError);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);

  // Effects
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTopCategories());
  }, [dispatch]);

  useEffect(() => {
    // Ürünleri fetch et
    const params = {
      category: selectedCategory ? selectedCategory.id : '',
      searchTerm: searchTerm,
      sortBy: sortBy,
      page: currentPage,
      limit: 25
    };
    dispatch(fetchProducts(params));
  }, [dispatch, selectedCategory, searchTerm, sortBy, currentPage]);

  // Event handlers
  const handleAddToCart = (product) => {
    dispatch(addToCart({
      product,
      count: 1
    }));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Sayfanın en üstüne kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleCategorySelect = (categoryId) => {
    const category = topCategories.find((category) => category.id === categoryId);
    setSelectedCategory(category);
    dispatch(fetchProducts({
      category: category,
      searchTerm: searchTerm,
      sortBy: sortBy,
      page: 1,
      limit: 25
    }));
  };

  // Yükleme ve hata durumları için UI bileşenleri
  const renderContent = () => {
    if (productStatus === 'loading') {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      );
    }

    if (productStatus === 'failed') {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="300px">
          <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" color="error">
            {productError || 'Ürünler yüklenemedi'}
          </Typography>
        </Box>
      );
    }

    if (products.length === 0) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="300px">
          <Typography variant="h6" color="textSecondary">
            Hiç ürün bulunamadı
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard 
              product={product} 
              onAddToCart={() => handleAddToCart(product)}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  // Top kategoriler için render
  const renderTopCategories = () => {
    if (topCategoriesLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <CircularProgress size={24} />
        </Box>
      );
    }

    if (topCategoriesError || topCategories.length === 0) {
      return null; // Kategoriler yüklenemezse hiçbir şey gösterme
    }

    return (
      <div className="category-chips">
        {topCategories.map((category) => (
          <Chip 
            key={category.id} 
            label={category.name} 
            onClick={() => handleCategorySelect(category.id)}
            color={selectedCategory && selectedCategory.id === category.id ? 'primary' : 'default'}
            style={{ margin: '0 5px 5px 0' }}
          />
        ))}
      </div>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        {/* Arama ve Sıralama */}
        <TextField
          label="Ürün Ara"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2, maxWidth: 300 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sırala</InputLabel>
          <Select
            value={sortBy || ''}
            label="Sırala"
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value || ''}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Top Kategoriler */}
      <div className="top-categories-container">
        {renderTopCategories()}
      </div>

      {/* Ürünler */}
      {renderContent()}

      {/* Pagination */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4, 
          mb: 2 
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Container>
  );
};

export default ShopPage;
