import http from './http';
import { getCsrfToken } from './authService';

const API_URL = '/execution';

export const create = async (data) => {
  try {
    await getCsrfToken();
    return await http.post(`${API_URL}`, data);
  } catch (err) {
    return err.response.data;
  }
};
