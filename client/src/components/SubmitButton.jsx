import React from 'react';
import styled from 'styled-components';

const StyledSubmitButton = styled.button`
  appearance: none;
  padding: 0.3em 1em;
  border-radius: 1em;
  border: 2px solid #159415;
  background-color: #5fe295;

  &:hover {
    background-color: #50ca83;
  }
`;

const SubmitButton = ({ text = 'Submit' }) => (
  <StyledSubmitButton type="submit">{text}</StyledSubmitButton>
);

export default SubmitButton;
