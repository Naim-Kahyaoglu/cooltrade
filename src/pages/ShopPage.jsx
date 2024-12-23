import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../store/thunks/productThunks';
import { fetchCategories } from '../store/categorySlice';
import { FETCH_STATES } from '../store/reducers/productReducer';
import shopPageImage from '../images/shoppage.png';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  CircularProgress,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  useMediaQuery,
  Pagination,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider as MUISlider,
  Button,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Search as SearchIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const ShopPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, total, fetchState } = useSelector(state => state.product);
  const { categories, topCategories, isLoading: categoriesLoading } = useSelector(state => state.category);
  const cart = useSelector(state => state.shoppingCart.cart);
  const { gender, categoryName, categoryId } = useParams();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = React.useState([]);
  const [selectedColors, setSelectedColors] = React.useState([]);
  const itemsPerPage = 25;

  // Available colors
  const colors = [
    { name: 'Black', value: 'siyah' },
    { name: 'White', value: 'beyaz' },
    { name: 'Red', value: 'kirmizi' },
    { name: 'Blue', value: 'mavi' },
    { name: 'Green', value: 'yesil' },
    { name: 'Yellow', value: 'sari' },
    { name: 'Brown', value: 'kahverengi' },
    { name: 'Gray', value: 'gri' },
    { name: 'Purple', value: 'mor' },
    { name: 'Pink', value: 'pembe' }
  ];

  // Handle rating filter change
  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating);
      } else {
        return [...prev, rating];
      }
    });
  };

  // Handle color filter change
  const handleColorChange = (color) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  // Handle applying all filters
  const handleApplyFilters = () => {
    // Reset page when applying new filters
    setPage(1);
    
    const params = {
      category: categoryId,
      sort: sortBy,
      filter: searchTerm,
      limit: itemsPerPage,
      offset: 0, // Reset to first page
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating: Math.min(...selectedRatings) || undefined
    };

    dispatch(fetchProducts(params));
  };

  // Fetch products when URL parameters, filters, or page changes
  useEffect(() => {
    const params = {};
    
    // Add category if available
    if (categoryId) {
      params.category = categoryId;
    }

    // Add sort if available
    if (sortBy) {
      params.sort = sortBy;
    }

    // Add filter if available
    if (searchTerm) {
      params.filter = searchTerm;
    }

    // Add color filter
    if (selectedColors.length > 0) {
      params.color = selectedColors.join(',');
    }

    // Add price range
    if (priceRange[0] > 0) {
      params.minPrice = priceRange[0];
    }
    if (priceRange[1] < 1000) {
      params.maxPrice = priceRange[1];
    }

    // Add rating filter
    if (selectedRatings.length > 0) {
      params.minRating = Math.min(...selectedRatings);
    }

    // Add pagination parameters
    params.limit = itemsPerPage;
    params.offset = (page - 1) * itemsPerPage;

    // Fetch products with all parameters
    dispatch(fetchProducts(params));
  }, [dispatch, categoryId, sortBy, searchTerm, page, itemsPerPage, priceRange, selectedRatings, selectedColors]);

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Group categories by gender and filter out empty categories
  const groupedCategories = categories?.reduce((acc, category) => {
    // Map gender codes to display values
    const getGender = (code) => {
      switch(code) {
        case 'k': return 'kadin';
        case 'e': return 'erkek';
        case 'E': return 'erkek';
        case 'm': return 'erkek';
        case 'M': return 'erkek';
        case 'ç': return 'cocuk';
        case 'c': return 'cocuk';
        default: return code;
      }
    };

    const gender = getGender(category.gender);
    const type = category.code?.split(':')[1] || '';

    // Skip invalid categories
    if (!type || !category.title) {
      return acc;
    }

    if (!acc[gender]) {
      acc[gender] = [];
    }

    // Convert Turkish characters to their non-accented equivalents
    const normalizeText = (text) => {
      return text
        .replace(/İ/g, 'I')
        .replace(/ı/g, 'i')
        .replace(/Ş/g, 'S')
        .replace(/ş/g, 's')
        .replace(/Ğ/g, 'G')
        .replace(/ğ/g, 'g')
        .replace(/Ü/g, 'U')
        .replace(/ü/g, 'u')
        .replace(/Ö/g, 'O')
        .replace(/ö/g, 'o')
        .replace(/Ç/g, 'C')
        .replace(/ç/g, 'c');
    };

    // Format the title properly
    const formatTitle = (title) => {
      // First normalize to handle Turkish characters
      const normalizedTitle = normalizeText(title.toLowerCase());
      // Then capitalize first letter
      return normalizedTitle.charAt(0).toUpperCase() + normalizedTitle.slice(1);
    };

    acc[gender].push({ 
      ...category, 
      type,
      title: formatTitle(category.title)
    });
    return acc;
  }, {}) || {};

  // Helper function to get display name for gender
  const getGenderDisplayName = (gender) => {
    switch(gender) {
      case 'kadin': return 'Kadın';
      case 'erkek': return 'Erkek';
      case 'cocuk': return 'Çocuk';
      default: return gender;
    }
  };

  // Update the top categories section gender mapping
  const getGenderFromCode = (code) => {
    switch(code) {
      case 'k': return 'kadin';
      case 'e': return 'erkek';
      case 'E': return 'erkek';
      case 'm': return 'erkek';
      case 'M': return 'erkek';
      case 'ç': return 'cocuk';
      case 'c': return 'cocuk';
      default: return code;
    }
  };

  // Update the top categories mapping
  const filteredTopCategories = topCategories
    .filter(category => category.code?.split(':')[1] && category.title)
    .map(category => ({
      ...category,
      gender: getGenderFromCode(category.gender),
      title: category.title.charAt(0).toUpperCase() + category.title.slice(1).toLowerCase()
    }));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when search changes

    // Preserve existing filters and add search term
    const params = {
      category: categoryId,
      filter: event.target.value,
      sort: sortBy,
      limit: itemsPerPage,
      offset: 0
    };

    // Remove undefined values
    Object.keys(params).forEach(key => 
      params[key] === undefined && delete params[key]
    );

    dispatch(fetchProducts(params));
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1); // Reset to first page when sort changes

    // Preserve existing filters and add sort
    const params = {
      category: categoryId,
      filter: searchTerm,
      sort: event.target.value,
      limit: itemsPerPage,
      offset: 0
    };

    // Remove undefined values
    Object.keys(params).forEach(key => 
      params[key] === undefined && delete params[key]
    );

    dispatch(fetchProducts(params));
  };

  // Handle category change
  const handleCategoryChange = (gender, category) => {
    if (categoryId === category.id.toString()) {
      // If already selected, deselect by navigating to main shop page
      navigate('/shop');
      
      // Clear category from filters but keep other filters
      const params = {
        filter: searchTerm,
        sort: sortBy,
        limit: itemsPerPage,
        offset: 0
      };

      // Remove undefined values
      Object.keys(params).forEach(key => 
        params[key] === undefined && delete params[key]
      );

      dispatch(fetchProducts(params));
    } else {
      // If not selected, navigate to category page
      navigate(`/shop/${gender}/${category.type}/${category.id}`);
      
      // Add category to existing filters
      const params = {
        category: category.id,
        filter: searchTerm,
        sort: sortBy,
        limit: itemsPerPage,
        offset: 0
      };

      // Remove undefined values
      Object.keys(params).forEach(key => 
        params[key] === undefined && delete params[key]
      );

      dispatch(fetchProducts(params));
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / itemsPerPage);

  // Calculate cart totals
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const shippingCost = cart.length > 0 ? 29.99 : 0;
  const discount = cart.length > 0 ? 29.99 : 0;
  const grandTotal = cartSubtotal + shippingCost - discount;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Categories Section */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3,
            fontWeight: 'normal',
            color: 'text.primary',
            textTransform: 'none'
          }}
        >
          Categories
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(groupedCategories).map(([gender, categories]) => (
            <Grid item xs={12} md={4} key={gender}>
              <Paper sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    textTransform: 'capitalize',
                    fontWeight: 'normal',
                    color: 'text.primary'
                  }}
                >
                  {getGenderDisplayName(gender)}
                </Typography>
                <Grid container spacing={2}>
                  {categories.map((category) => (
                    <Grid item xs={12} sm={6} key={category.id}>
                      <Card 
                        component={Link}
                        to={`/shop/${gender}/${category.type}/${category.id}`}
                        sx={{ 
                          display: 'flex',
                          height: '100%',
                          textDecoration: 'none',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 100, height: 100, objectFit: 'cover' }}
                          image={category.img || shopPageImage}
                          alt={category.title}
                        />
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="h6" component="div">
                            {category.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {getGenderDisplayName(gender)}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Rating value={category.rating || 0} readOnly precision={0.1} size="small" />
                            <Typography variant="body2" color="text.secondary">
                              {category.product_count} products
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Top Categories Section */}
      {!gender && !categoryName && (
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 'normal',
              color: 'text.primary',
              textTransform: 'none'
            }}
          >
            Top Categories
          </Typography>
          <Grid container spacing={3}>
            {categoriesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              filteredTopCategories.map((category) => {
                const gender = (() => {
                  switch(category.gender) {
                    case 'k': return 'kadin';
                    case 'e': return 'erkek';
                    case 'E': return 'erkek';
                    case 'm': return 'erkek';
                    case 'M': return 'erkek';
                    case 'ç': return 'cocuk';
                    case 'c': return 'cocuk';
                    default: return category.gender;
                  }
                })();
                const type = category.code.split(':')[1];
                return (
                  <Grid item xs={12} sm={6} md={2.4} key={category.id}>
                    <Card 
                      component={Link}
                      to={`/shop/${gender}/${type}/${category.id}`}
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease-in-out',
                        textDecoration: 'none',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={category.img || shopPageImage}
                        alt={category.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {category.title.charAt(0).toUpperCase() + category.title.slice(1).toLowerCase()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getGenderDisplayName(gender)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Rating value={category.rating || 0} readOnly precision={0.1} />
                          <Typography variant="body2" color="text.secondary">
                            {category.product_count} products
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
      )}

      {/* Products Section */}
      {!isMobile && (
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 'normal',
              color: 'text.primary',
              textTransform: 'none'
            }}
          >
            {gender && categoryName ? `${gender} ${categoryName}` : 'Our Products'}
          </Typography>

          <Grid container spacing={3}>
            {/* Filter Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
                
                {/* Active Filters */}
                {(categoryId || searchTerm || sortBy || selectedColors.length > 0) && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Active Filters</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {categoryId && (
                        <Chip
                          label={`Category: ${categories.find(c => c.id.toString() === categoryId)?.title}`}
                          onDelete={() => navigate('/shop')}
                          size="small"
                        />
                      )}
                      {searchTerm && (
                        <Chip
                          label={`Search: ${searchTerm}`}
                          onDelete={() => {
                            setSearchTerm('');
                            handleSearchChange({ target: { value: '' } });
                          }}
                          size="small"
                        />
                      )}
                      {sortBy && (
                        <Chip
                          label={`Sort: ${
                            {
                              'price:asc': 'Price: Low to High',
                              'price:desc': 'Price: High to Low',
                              'rating:asc': 'Rating: Low to High',
                              'rating:desc': 'Rating: High to Low'
                            }[sortBy]
                          }`}
                          onDelete={() => {
                            setSortBy('');
                            handleSortChange({ target: { value: '' } });
                          }}
                          size="small"
                        />
                      )}
                      {selectedColors.map(color => (
                        <Chip
                          key={color}
                          label={`Color: ${colors.find(c => c.value === color)?.name}`}
                          onDelete={() => handleColorChange(color)}
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Categories Filter */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Categories</Typography>
                  <FormGroup>
                    {Object.entries(groupedCategories).map(([gender, categories]) => (
                      <Box key={gender}>
                        <Typography variant="subtitle2" sx={{ mt: 1, mb: 0.5, color: 'text.secondary' }}>
                          {getGenderDisplayName(gender)}
                        </Typography>
                        {categories.map((category) => (
                          <FormControlLabel
                            key={category.id}
                            control={
                              <Checkbox
                                checked={categoryId === category.id.toString()}
                                onChange={() => handleCategoryChange(gender, category)}
                                size="small"
                              />
                            }
                            label={category.title}
                          />
                        ))}
                      </Box>
                    ))}
                  </FormGroup>
                </Box>

                {/* Price Range Filter */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Price Range</Typography>
                  <MUISlider
                    value={priceRange}
                    onChange={(event, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    sx={{ mt: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2">${priceRange[0]}</Typography>
                    <Typography variant="body2">${priceRange[1]}</Typography>
                  </Box>
                </Box>

                {/* Rating Filter */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Rating</Typography>
                  <FormGroup>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <FormControlLabel
                        key={rating}
                        control={
                          <Checkbox
                            checked={selectedRatings.includes(rating)}
                            onChange={() => handleRatingChange(rating)}
                            size="small"
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating value={rating} readOnly size="small" />
                            <Typography variant="body2" sx={{ ml: 1 }}>& Up</Typography>
                          </Box>
                        }
                      />
                    ))}
                  </FormGroup>
                </Box>

                {/* Color Filter */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Colors</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {colors.map((color) => (
                      <Chip
                        key={color.value}
                        label={color.name}
                        onClick={() => handleColorChange(color.value)}
                        sx={{
                          bgcolor: selectedColors.includes(color.value) ? 'primary.main' : 'background.paper',
                          color: selectedColors.includes(color.value) ? 'white' : 'text.primary',
                          '&:hover': {
                            bgcolor: selectedColors.includes(color.value) ? 'primary.dark' : 'action.hover',
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Apply Filters Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleApplyFilters}
                  sx={{ mt: 2 }}
                >
                  Apply Filters
                </Button>
              </Paper>
            </Grid>

            {/* Products Grid and Controls */}
            <Grid item xs={12} md={9}>
              {/* Search and Sort Controls */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sort By"
                      onChange={handleSortChange}
                    >
                      <MenuItem value="price:asc">Price: Low to High</MenuItem>
                      <MenuItem value="price:desc">Price: High to Low</MenuItem>
                      <MenuItem value="rating:asc">Rating: Low to High</MenuItem>
                      <MenuItem value="rating:desc">Rating: High to Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Loading State */}
              {fetchState === FETCH_STATES.FETCHING && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              )}

              {/* Error State */}
              {fetchState === FETCH_STATES.FAILED && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Failed to load products. Please try again later.
                </Alert>
              )}

              {/* Products Grid */}
              {fetchState === FETCH_STATES.FETCHED && (
                <>
                  <Grid container spacing={3}>
                    {/* Products List */}
                    <Grid item xs={12} md={8}>
                      <Grid container spacing={3}>
                        {productList.map((product) => (
                          <Grid item xs={12} sm={6} lg={6} key={product.id}>
                            <ProductCard 
                              product={product}
                              gender={gender}
                              categoryName={categoryName}
                              categoryId={categoryId}
                            />
                          </Grid>
                        ))}
                      </Grid>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                          <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                          />
                        </Box>
                      )}

                      {/* Products Count Info */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Showing {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, total)} of {total} products
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} md={4}>
                      <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                        <Typography variant="h6" gutterBottom>
                          Order Summary
                        </Typography>
                        
                        {cart.length === 0 ? (
                          <Box sx={{ textAlign: 'center', py: 3 }}>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                              Your cart is empty
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Add some products to your cart to see the order summary
                            </Typography>
                          </Box>
                        ) : (
                          <>
                            <Box sx={{ my: 2 }}>
                              {/* Cart Items */}
                              <List disablePadding>
                                {cart.map((item) => (
                                  <ListItem key={item.product.id} disablePadding sx={{ py: 1 }}>
                                    <ListItemText
                                      primary={item.product.name}
                                      secondary={`Quantity: ${item.count}`}
                                    />
                                    <Typography variant="body2">
                                      ${(item.product.price * item.count).toFixed(2)}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>

                              <Divider sx={{ my: 2 }} />

                              {/* Products Total */}
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1">Products Total</Typography>
                                <Typography variant="body1">
                                  ${cartSubtotal.toFixed(2)}
                                </Typography>
                              </Box>
                              
                              {/* Shipping */}
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1">Shipping</Typography>
                                <Typography variant="body1">${shippingCost.toFixed(2)}</Typography>
                              </Box>
                              
                              {/* Discount */}
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1">Discount</Typography>
                                <Typography variant="body1" color="error.main">
                                  -${discount.toFixed(2)}
                                </Typography>
                              </Box>
                              
                              <Divider sx={{ my: 2 }} />
                              
                              {/* Grand Total */}
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Grand Total</Typography>
                                <Typography variant="h6" color="primary.main">
                                  ${grandTotal.toFixed(2)}
                                </Typography>
                              </Box>
                            </Box>

                            {/* Create Order Button */}
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              size="large"
                              onClick={() => {
                                navigate('/checkout');
                              }}
                            >
                              Create Order
                            </Button>
                          </>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Mobile Message */}
      {isMobile && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Please use a desktop device to view our full product catalog.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ShopPage;
