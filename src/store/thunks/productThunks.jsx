import axios from 'axios';
import { 
  setProductList, 
  setFetchState, 
  setTotal,
  setProduct,
  FETCH_STATES 
} from '../reducers/productReducer';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));

    // Remove any undefined or null values from params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value != null)
    );
    
    const response = await axiosInstance.get('/products', {
      params: cleanParams
    });

    const { total, products } = response.data;
    
    dispatch(setProductList(products));
    dispatch(setTotal(total));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
};

export const fetchProduct = (productId) => async (dispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    const response = await axiosInstance.get(`/products/${productId}`);
    
    dispatch(setProduct(response.data));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Failed to fetch product:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
};

