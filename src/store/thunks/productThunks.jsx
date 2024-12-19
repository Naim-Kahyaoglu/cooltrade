import axios from 'axios';
import { 
  setProductList, 
  setFetchState, 
  setTotal,
  FETCH_STATES 
} from '../reducers/productReducer';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchProducts = () => async (dispatch, getState) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    const { limit, offset, filter } = getState().product;
    const response = await axiosInstance.get('/products', {
      params: {
        limit,
        offset,
        filter
      }
    });

    dispatch(setProductList(response.data.products));
    dispatch(setTotal(response.data.total));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
};
