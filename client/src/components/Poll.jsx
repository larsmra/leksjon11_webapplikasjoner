import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Question from './Question';
import { create } from '../utils/pollExecutionService';

import Form from './Form';
import Section from './Section';
import SubmitButton from './SubmitButton';

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Poll = ({ _id, title, description, questions }) => {
  const [choices, setChoices] = useState([]);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('submit answers');
    const pollExecution = { poll: _id, answers: choices };
    console.log(pollExecution);
    const { data } = await create(pollExecution);
    if (!data.success) {
      console.log(data.message);
    } else {
      history.push(`/`);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Section>
        <h2>{title}</h2>
        <p>{description}</p>
      </Section>
      {questions &&
        questions.map((question, index) => (
          <Question
            key={question._id}
            setChoices={setChoices}
            choices={choices}
            {...question}
          />
        ))}
      <StyledButtonWrapper>
        <SubmitButton />
      </StyledButtonWrapper>
    </Form>
  );
};

export default Poll;
