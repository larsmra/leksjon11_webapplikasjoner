import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const StyledHeader = styled.header`
  width: 100%;
  background-color: #e2e2e2;
  box-shadow: 0px 2px 2px #88888888;
`;

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  @media (min-width: 500px) {
    width: 75%;
  }
  @media (min-width: 700px) {
    width: 40%;
  }
  @media (min-width: 1600px) {
    width: 30%;
  }
`;

const MainLayout = ({ children }) => (
  <>
    <StyledHeader>
      <Navbar />
    </StyledHeader>
    <StyledMain>{children}</StyledMain>
  </>
);

export default MainLayout;
