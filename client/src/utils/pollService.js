import http from './http';
import { getCsrfToken } from './authService';

const API_URL = '/polls';

export const get = async (id) => {
  try {
    await getCsrfToken();
    return await http.get(`${API_URL}/${id}`);
  } catch (err) {
    return err.response.data;
  }
};

export const create = async (data) => {
  try {
    await getCsrfToken();
    return await http.post(`${API_URL}`, data);
  } catch (err) {
    return err.response.data;
  }
};

export default { get, create };
