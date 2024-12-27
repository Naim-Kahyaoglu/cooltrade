import axios from 'axios';
import { setRoles } from '../reducers/clientReducer';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thunk action creator for fetching roles
export const fetchRoles = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/roles');
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error('Failed to fetch roles:', error);
  }
};
