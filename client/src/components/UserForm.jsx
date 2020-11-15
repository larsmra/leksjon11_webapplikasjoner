import React from 'react';
import styled from 'styled-components';

import Form from './Form';
import Section from './Section';
import SubmitButton from './SubmitButton';
import Input from './Input';

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const UserForm = ({
  email,
  password,
  buttonText,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => (
  <Form onSubmit={onSubmit}>
    <Section>
      <label htmlFor="email">Email</label>
      <Input
        name="email"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e)}
      />
      <label htmlFor="password">Password</label>
      <Input
        name="password"
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e)}
      />
    </Section>
    <StyledButtonWrapper>
      <SubmitButton text={buttonText} />
    </StyledButtonWrapper>
  </Form>
);

export default UserForm;
