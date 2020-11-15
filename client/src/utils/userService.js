import http from './http';

const API_URL = '/user';

export const get = async (email) => {
  try {
    return await http.get(`${API_URL}/${email}`);
  } catch (err) {
    return err.response.data;
  }
};

export const create = async (data) => {
  try {
    return await http.post(`${API_URL}`, data);
  } catch (err) {
    return err.response.data;
  }
};

export default { get, create };
