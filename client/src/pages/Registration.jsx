import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { useAuthContext } from '../context/AuthProvider';
import { register } from '../utils/authService';

const Registration = () => {
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
  }, [isLoggedIn, history, state]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { email, password };
    const { data } = await register(userInfo);
    if (!data.success) {
      setError(data.message);
    } else {
      const user = data?.user;
      const expire = JSON.parse(window.atob(data.token.split('.')[1])).exp;
      setUser({ ...user, expire });
      history.push('/');
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <UserForm
      email={email}
      password={password}
      onSubmit={onSubmit}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      buttonText="Sign up"
    />
  );
};

export default Registration;
