import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Grid, Paper, Typography, Button, Dialog, AppBar, Toolbar, IconButton } from '@mui/material';
import { Close, FilterList, Sort } from '@mui/icons-material';

// Components
import TopCategories from '../components/shop/TopCategories';
import CategorySection from '../components/shop/CategorySection';
import FilterSection from '../components/shop/FilterSection';
import SearchAndSort from '../components/shop/SearchAndSort';
import ProductSection from '../components/shop/ProductSection';

// Redux actions and selectors
import { fetchCategories, fetchProducts } from '../store/thunks/productThunks';
import { addToCart } from '../store/reducers/shoppingCartReducer';
import { selectCategories, selectProducts, selectTotalPages } from '../store/productSlice';
import { selectCartItems, selectCartTotal } from '../store/reducers/shoppingCartReducer';

// Constants and utils
import { ITEMS_PER_PAGE, PRICE_RANGE } from './ShopPage/constants';
import { getGenderFromCode } from '../utils/genderUtils';
import { formatPrice } from '../utils/formatUtils';

const ShopPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gender, type, categoryId } = useParams();

  // Redux state
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectTotalPages);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    categoryId: categoryId || '',
    searchTerm: '',
    sortBy: '',
    priceRange: [PRICE_RANGE.min, PRICE_RANGE.max],
    selectedRatings: [],
    selectedColors: [],
    page: 1,
    showMobileFilter: false,
    showMobileSort: false,
  });

  // Memoized values
  const groupedCategories = useMemo(() => {
    return categories.reduce((acc, category) => {
      const gender = getGenderFromCode(category.gender);
      if (!acc[gender]) acc[gender] = [];
      acc[gender].push(category);
      return acc;
    }, {});
  }, [categories]);

  // Effects
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (gender && type && categoryId) {
      setFilters(prev => ({ ...prev, categoryId }));
    }
  }, [gender, type, categoryId]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchProducts({
          categoryId: filters.categoryId,
          searchTerm: filters.searchTerm,
          sortBy: filters.sortBy,
          priceRange: filters.priceRange,
          ratings: filters.selectedRatings,
          colors: filters.selectedColors,
          page: filters.page,
          limit: ITEMS_PER_PAGE,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [dispatch, filters]);

  // Event handlers
  const handleCategoryClick = (gender, type, categoryId) => {
    navigate(`/shop/${gender}/${type}/${categoryId}`);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, page: 1 };

      switch (type) {
        case 'category':
          newFilters.categoryId = value.toString();
          break;
        case 'search':
          newFilters.searchTerm = value;
          break;
        case 'sort':
          newFilters.sortBy = value;
          break;
        case 'price':
          newFilters.priceRange = value;
          break;
        case 'rating':
          newFilters.selectedRatings = prev.selectedRatings.includes(value)
            ? prev.selectedRatings.filter(r => r !== value)
            : [...prev.selectedRatings, value];
          break;
        case 'color':
          newFilters.selectedColors = prev.selectedColors.includes(value)
            ? prev.selectedColors.filter(c => c !== value)
            : [...prev.selectedColors, value];
          break;
        default:
          break;
      }

      return newFilters;
    });
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleClearSearch = () => {
    setFilters(prev => ({ ...prev, searchTerm: '', page: 1 }));
  };

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        pb: { xs: '80px', md: 0 },
        px: { xs: 1, md: 3 }
      }}
    >
      {/* Top Categories Section */}
      <Box sx={{ mb: { xs: 1, md: 2 } }}>
        <TopCategories
          categories={categories}
          isLoading={isLoading}
          onCategoryClick={handleCategoryClick}
        />
      </Box>

      {/* Category Section */}
      <Box sx={{ mb: { xs: 1, md: 2 } }}>
        <CategorySection groupedCategories={groupedCategories} />
      </Box>

      {/* Filter Buttons for Mobile */}
      <Box sx={{ 
        display: { xs: 'flex', md: 'none' }, 
        gap: 1,
        mb: 1,
        position: 'sticky',
        top: 0,
        bgcolor: 'background.paper',
        zIndex: 900,
        py: 1
      }}>
        <Button 
          variant="outlined" 
          fullWidth
          onClick={() => setFilters(prev => ({ ...prev, showMobileFilter: true }))}
          sx={{ 
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'grey.400'
            },
            height: '40px'
          }}
          startIcon={<FilterList />}
        >
          Filtrele
        </Button>
        <Button 
          variant="outlined"
          fullWidth
          onClick={() => setFilters(prev => ({ ...prev, showMobileSort: true }))}
          sx={{ 
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'grey.400'
            },
            height: '40px'
          }}
          startIcon={<Sort />}
        >
          Sırala
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={{ xs: 1, md: 3 }}>
        {/* Filter Section - Desktop Only */}
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <FilterSection
            filters={{ ...filters, categories }}
            groupedCategories={groupedCategories}
            onFilterChange={handleFilterChange}
            onApplyFilters={() => setFilters(prev => ({ ...prev }))}
          />
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={9}>
          {/* Desktop Search and Sort */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 2 }}>
            <SearchAndSort
              searchTerm={filters.searchTerm}
              sortBy={filters.sortBy}
              onSearchChange={(value) => handleFilterChange('search', value)}
              onSortChange={(value) => handleFilterChange('sort', value)}
              onClearSearch={handleClearSearch}
            />
          </Box>

          {/* Products Grid */}
          <ProductSection
            products={products}
            isLoading={isLoading}
            page={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onAddToCart={handleAddToCart}
          />
        </Grid>
      </Grid>

      {/* Order Summary Box - Mobile */}
      {cartItems.length > 0 && (
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'grey.200',
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
            gap: 2
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Toplam ({cartItems.length} Ürün)
            </Typography>
            <Typography fontWeight={600} color="primary.main" fontSize="1.1rem">
              {formatPrice(cartTotal >= 150 ? cartTotal : cartTotal + 29.99)}
            </Typography>
          </Box>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: '#f27a1a',
              '&:hover': {
                bgcolor: '#d85a00'
              },
              height: '40px',
              flex: 1,
              maxWidth: '60%'
            }}
            onClick={() => navigate('/checkout')}
          >
            Sepeti Onayla
          </Button>
        </Paper>
      )}

      {/* Mobile Filter Dialog */}
      <Dialog
        fullScreen
        open={filters.showMobileFilter || false}
        onClose={() => setFilters(prev => ({ ...prev, showMobileFilter: false }))}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: 'background.paper', color: 'text.primary' }}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setFilters(prev => ({ ...prev, showMobileFilter: false }))}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
              Filtrele
            </Typography>
            <Button 
              color="primary"
              onClick={() => {
                setFilters(prev => ({ ...prev, showMobileFilter: false }));
              }}
            >
              Uygula
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2 }}>
          <FilterSection
            filters={{ ...filters, categories }}
            groupedCategories={groupedCategories}
            onFilterChange={handleFilterChange}
            onApplyFilters={() => {
              setFilters(prev => ({ ...prev, showMobileFilter: false }));
            }}
          />
        </Box>
      </Dialog>

      {/* Mobile Sort Dialog */}
      <Dialog
        fullScreen
        open={filters.showMobileSort || false}
        onClose={() => setFilters(prev => ({ ...prev, showMobileSort: false }))}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: 'background.paper', color: 'text.primary' }}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setFilters(prev => ({ ...prev, showMobileSort: false }))}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
              Sırala
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2 }}>
          <SearchAndSort
            searchTerm={filters.searchTerm}
            sortBy={filters.sortBy}
            onSearchChange={(value) => handleFilterChange('search', value)}
            onSortChange={(value) => {
              handleFilterChange('sort', value);
              setFilters(prev => ({ ...prev, showMobileSort: false }));
            }}
            onClearSearch={handleClearSearch}
          />
        </Box>
      </Dialog>
    </Container>
  );
};

export default ShopPage;
