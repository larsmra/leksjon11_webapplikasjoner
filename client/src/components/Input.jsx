import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.2em;
  margin-bottom: 1em;
  line-height: 1.5em;
  border-radius: 0.5em;
`;

const Input = ({
  type = 'text',
  name = '',
  value = '',
  placeholder = '',
  onChange = null,
}) => (
  <>
    <StyledInput
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </>
);

export default Input;
