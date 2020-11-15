import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthProvider';
import { logout } from '../utils/authService';

const StyledNav = styled.nav`
  display: flex;
`;

const NavItem = styled.a`
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  display: inline-block;
  padding: 0.4em 2em;
  text-decoration: none;
  color: #000000;

  &:hover {
    background-color: #a9a9a9;
    border-bottom-color: #159415;
  }
`;

const LogoutButton = styled.button`
  border-radius: 0.5em;
  padding: 0.5em 1.5em;
  margin: 0.5em;
  margin-left: auto;
  appearance: none;
  background-color: #5fe295;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #50ca83;
  }
`;

const Navbar = () => {
  const { isLoggedIn, setUser } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <StyledNav>
      {isLoggedIn ? (
        <>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/polls/create">New Poll</NavItem>
          <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
        </>
      ) : (
        <>
          <NavItem href="/login">Login</NavItem>
          <NavItem href="/register">Sign up</NavItem>
        </>
      )}
    </StyledNav>
  );
};

export default Navbar;
