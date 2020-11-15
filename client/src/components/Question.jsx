import React from 'react';
import styled from 'styled-components';
import Answer from './Answer';
import Section from './Section';

const StyledList = styled.ol`
  padding: 0.5em;
  list-style: none;
`;

const Question = ({ _id, question, answers, setChoices, choices }) => (
  <Section>
    <p>{question}</p>
    <StyledList>
      {answers &&
        answers.map((answer, index) => (
          <Answer
            key={answer._id}
            question={_id}
            {...answer}
            setChoices={setChoices}
            choices={choices}
          />
        ))}
    </StyledList>
  </Section>
);

export default Question;
