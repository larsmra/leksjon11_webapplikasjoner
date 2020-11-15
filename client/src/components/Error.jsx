import React from 'react';
import styled from 'styled-components';

const StyledErrorText = styled.p`
  color: #ff0000;
  font-weight: bold;
  margin: 1em;
`;

const Error = ({ message }) => <StyledErrorText>{message}</StyledErrorText>;

export default Error;
