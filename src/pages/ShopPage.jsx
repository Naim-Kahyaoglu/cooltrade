import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../store/thunks/productThunks';
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
  Button
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
  const { productList, fetchState } = useSelector(state => state.product);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter and sort products
  const filteredProducts = productList
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const filterDrawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 2, mb: 3 }}>
        <MUISlider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Categories
        </Typography>
        <FormControlLabel control={<Checkbox />} label="Electronics" />
        <FormControlLabel control={<Checkbox />} label="Clothing" />
        <FormControlLabel control={<Checkbox />} label="Books" />
        <FormControlLabel control={<Checkbox />} label="Home & Garden" />
      </FormGroup>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Side - Image */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3}
            sx={{
              height: { md: 'calc(100vh - 100px)' },
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Box
              component="img"
              src={shopPageImage}
              alt="Shop Page"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Paper>
        </Grid>

        {/* Right Side - Products */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Our Products
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Discover our amazing collection of products.
            </Typography>

            {/* Search and Filter Controls */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="name-asc">Name: A to Z</MenuItem>
                    <MenuItem value="name-desc">Name: Z to A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Filter Button (Mobile) */}
            {isMobile && (
              <Button
                startIcon={<FilterIcon />}
                onClick={handleDrawerToggle}
                variant="outlined"
                sx={{ mb: 2 }}
              >
                Filters
              </Button>
            )}

            {/* Products Grid */}
            {fetchState === 'loading' ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} key={product.id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={Math.ceil(filteredProducts.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </Box>
        </Grid>

        {/* Filter Drawer */}
        {isMobile ? (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
          >
            {filterDrawer}
          </Drawer>
        ) : (
          <Box
            sx={{
              position: 'fixed',
              left: 0,
              top: 64,
              height: 'calc(100vh - 64px)',
              width: 250,
              bgcolor: 'background.paper',
              borderRight: 1,
              borderColor: 'divider',
              display: { xs: 'none', md: 'block' }
            }}
          >
            {filterDrawer}
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default ShopPage;
