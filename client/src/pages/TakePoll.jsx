import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { get } from '../utils/pollService';

import Error from '../components/Error';
import Poll from '../components/Poll';

const TakePoll = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      const { data } = await get(id);
      console.log(data);
      if (!data.success) {
        setError(error);
      } else {
        setPoll(data.data);
      }
    };
    fetchPoll();
  }, [id, error]);

  return (
    <>
      {error && <Error message={error} />}
      {poll && <Poll {...poll} />}
    </>
  );
};

export default TakePoll;
