import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { create } from '../utils/pollService';

import Error from './Error';
import Form from './Form';
import Section from './Section';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';

const StyledTextarea = styled.textarea`
  padding: 0.2em;
  height: 5em;
  border-radius: 0.5em;
  margin-bottom: 1em;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledAnswerInput = styled.input`
  padding: 0.4em;
  appearance: none;
  border: none;
  border-bottom: 2px solid #919191;
  background-color: transparent;

  &:hover {
    background-color: #e2e2e2;
  }
`;

const PollCreator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { question: '' }]);
    setAnswers((prev) => [...prev, [{ answer: '' }]]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuestionChange = (index) => (e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex) => (e) => {
    const newAnswers = [...answers];
    let ans = newAnswers[qIndex];
    ans[aIndex].answer = e.target.value;
    if (ans[aIndex].answer !== '' && aIndex + 1 === ans.length) {
      ans = [...ans, { answer: '' }];
      newAnswers[qIndex] = ans;
    }
    if (e.target.value === '') {
      ans = ans.filter((a, ix) => aIndex !== ix);
      newAnswers[qIndex] = ans;
    }
    setAnswers(newAnswers);
  };

  const embedAnswers = () => {
    const qs = [...questions];
    const as = [...answers];
    qs.map((q, ix) => {
      as[ix] = as[ix].filter((a) => a.answer !== '');
      q.answers = as[ix];
      return q;
    });
    return qs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('submit poll');
    const poll = {
      title,
      description,
      questions: embedAnswers(),
    };
    const { data } = await create(poll);
    if (!data.success) {
      setError(data.message);
    } else {
      history.push(`/polls/${data.data.id}`);
    }
  };

  return (
    <>
      {error && <Error message={error} />}
      <Form onSubmit={onSubmit}>
        <Section>
          <label htmlFor="title">Title</label>
          <Input
            name="title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={handleTitleChange}
          />
          <label htmlFor="description">Description</label>
          <StyledTextarea
            name="description"
            value={description}
            placeholder="Description"
            onChange={handleDescriptionChange}
          />
          <StyledButtonWrapper>
            <Button text="Add question" onClick={addQuestion} />
            <SubmitButton />
          </StyledButtonWrapper>
        </Section>
        {questions &&
          questions.map((question, qIndex) => (
            <Section key={qIndex}>
              <p>Question {qIndex + 1}</p>
              <Input
                name={`question${qIndex}`}
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={question.question}
                onChange={handleQuestionChange(qIndex)}
              />
              {answers[qIndex] &&
                answers[qIndex].map((answer, aIndex) => (
                  <StyledAnswerInput
                    key={aIndex}
                    name={`answer${qIndex}-${aIndex}`}
                    type="text"
                    placeholder={`Answer ${aIndex + 1}`}
                    value={answer.answer}
                    onChange={handleAnswerChange(qIndex, aIndex)}
                  />
                ))}
            </Section>
          ))}
      </Form>
    </>
  );
};

export default PollCreator;
