import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  appearance: none;
  padding: 0.3em 1em;
  border: 2px solid #919191;
  background-color: #fcf8f8;
  border-radius: 1em;

  &:hover {
    background-color: #e2e2e2;
  }
`;

const Button = ({ text = 'Button', onClick = null }) => (
  <StyledButton type="button" onClick={onClick}>
    {text}
  </StyledButton>
);

export default Button;
