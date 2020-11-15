import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import { login } from '../utils/authService';

import Error from '../components/Error';
import UserForm from '../components/UserForm';

const Login = () => {
  const { setUser, isLoggedIn } = useAuthContext();
  const history = useHistory();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn && state) {
      history.push(state?.from.pathname);
    }
  }, [isLoggedIn, state, history]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { email, password };
    const { data } = await login(userInfo);
    if (!data.success) {
      setError(data.message);
    } else {
      const user = data?.user;
      const expire = JSON.parse(window.atob(data.token.split('.')[1])).exp;
      setUser({ ...user, expire });
      history.push('/');
    }
  };

  return (
    <>
      {error && <Error message={error} />}
      <UserForm
        email={email}
        password={password}
        onSubmit={onSubmit}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        buttonText="Log in"
      />
    </>
  );
};

export default Login;
