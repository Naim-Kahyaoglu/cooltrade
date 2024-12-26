import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';

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

// Constants and utils
import { ITEMS_PER_PAGE, PRICE_RANGE } from './ShopPage/constants';
import { getGenderFromCode } from '../utils/genderUtils';

const ShopPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gender, type, categoryId } = useParams();

  // Redux state
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectTotalPages);

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
    <Container maxWidth="xl">
      {/* Top Categories Section */}
      <TopCategories
        categories={categories}
        isLoading={isLoading}
        onCategoryClick={handleCategoryClick}
      />

      {/* Category Section */}
      <CategorySection groupedCategories={groupedCategories} />

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Filter Section */}
        <Grid item xs={12} md={3}>
          <FilterSection
            filters={{ ...filters, categories }}
            groupedCategories={groupedCategories}
            onFilterChange={handleFilterChange}
            onApplyFilters={() => setFilters(prev => ({ ...prev }))}
          />
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={9}>
          <SearchAndSort
            searchTerm={filters.searchTerm}
            sortBy={filters.sortBy}
            onSearchChange={(value) => handleFilterChange('search', value)}
            onSortChange={(value) => handleFilterChange('sort', value)}
            onClearSearch={handleClearSearch}
          />

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
    </Container>
  );
};

export default ShopPage;
