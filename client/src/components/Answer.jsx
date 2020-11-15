import React from 'react';
import styled from 'styled-components';

const StyledListElement = styled.li`
  margin-bottom: 0.5em;
`;

const StyledLabel = styled.label`
  margin-left: 0.5em;
`;

const Answer = ({ question, _id, answer, setChoices, choices }) => {
  const handleChoice = () => {
    console.log(choices.filter((a) => a._id === _id).length > 0);
    if (choices.filter((a) => a._id === _id).length > 0) {
      setChoices((prev) => prev.filter((a) => a._id !== _id));
    } else {
      setChoices((prev) => [...prev, { _id }]);
    }
  };

  return (
    <StyledListElement>
      <input
        id={_id}
        name={`answer-${question}`}
        type="checkbox"
        value={_id}
        onClick={handleChoice}
      />
      <StyledLabel htmlFor={_id}>{answer}</StyledLabel>
    </StyledListElement>
  );
};

export default Answer;
