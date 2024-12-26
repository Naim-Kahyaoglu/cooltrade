import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRICE_RANGE, ITEMS_PER_PAGE } from './constants';

export const useFilters = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    searchTerm: '',
    sortBy: '',
    priceRange: [PRICE_RANGE.min, PRICE_RANGE.max],
    selectedRatings: [],
    selectedColors: [],
    categoryId: null,
    categories: []
  });

  const handleFilterChange = useCallback((type, value) => {
    setFilters(prev => {
      switch (type) {
        case 'search':
          return { ...prev, searchTerm: value };
        case 'sort':
          return { ...prev, sortBy: value };
        case 'price':
          return { ...prev, priceRange: value };
        case 'rating':
          return {
            ...prev,
            selectedRatings: prev.selectedRatings.includes(value)
              ? prev.selectedRatings.filter(r => r !== value)
              : [...prev.selectedRatings, value]
          };
        case 'color':
          return {
            ...prev,
            selectedColors: prev.selectedColors.includes(value)
              ? prev.selectedColors.filter(c => c !== value)
              : [...prev.selectedColors, value]
          };
        case 'category':
          return { ...prev, categoryId: value };
        default:
          return prev;
      }
    });
  }, []);

  const handleSearchChange = useCallback((value) => {
    handleFilterChange('search', value);
  }, [handleFilterChange]);

  const handleSortChange = useCallback((value) => {
    handleFilterChange('sort', value);
  }, [handleFilterChange]);

  const handleCategoryClick = useCallback((gender, type, categoryId) => {
    navigate(`/shop/${gender}/${type}/${categoryId}`);
    handleFilterChange('category', categoryId);
  }, [navigate, handleFilterChange]);

  const handleApplyFilters = useCallback(() => {
    // This function will be called when the apply filters button is clicked
    // The actual API call will be handled in the parent component
  }, []);

  return {
    filters,
    handleFilterChange,
    handleApplyFilters,
    handleSearchChange,
    handleSortChange,
    handleCategoryClick
  };
};

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateTotalPages = useCallback((total) => {
    setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
  }, []);

  return {
    page,
    totalPages,
    handlePageChange,
    updateTotalPages,
    itemsPerPage: ITEMS_PER_PAGE
  };
}; 