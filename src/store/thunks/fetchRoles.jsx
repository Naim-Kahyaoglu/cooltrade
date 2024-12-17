import axios from 'axios';
import { setRoles } from '../actions/clientActions';

export const fetchRoles = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/roles');
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error('Failed to fetch roles:', error);
  }
};