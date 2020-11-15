import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  margin: 1em;
  padding: 1em;
  background-color: green;
  border-radius: 2em;
  background-color: #f5f1f1;
  box-shadow: 0 0.3em 0.9em #888888;
`;

const Form = ({ onSubmit, children }) => (
  <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
);

export default Form;
