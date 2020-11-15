import http from './http';

export const getCsrfToken = async () => {
  try {
    const { data } = await http.get('/csrf-token');
    http.defaults.headers['X-CSRF-Token'] = data.data;
  } catch (err) {
    return err.response;
  }
};

export const getUserInfo = async () => {
  try {
    return await http.get('/me');
  } catch (err) {
    return err.response;
  }
};

export const register = async (userInfo) => {
  try {
    await getCsrfToken();
    return await http.post('/register', { ...userInfo });
  } catch (err) {
    return err.response;
  }
};

export const login = async (userInfo) => {
  try {
    await getCsrfToken();
    const abc = await http.post('/login', { ...userInfo });
    console.log(abc);
    return abc;
  } catch (err) {
    return err.response;
  }
};

export const logout = async () => {
  try {
    await getCsrfToken();
    return await http.post('/logout');
  } catch (err) {
    return err.response;
  }
};
