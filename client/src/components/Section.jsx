import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  padding: 1em;
  border-radius: 1.5em;
  background-color: #ffffff;
  box-shadow: 0px 2px 2px #88888888;
`;

const Section = ({ children }) => <StyledSection>{children}</StyledSection>;

export default Section;
