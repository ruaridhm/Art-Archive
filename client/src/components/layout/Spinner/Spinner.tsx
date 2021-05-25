import React from 'react';
import { Container, CircularProgress } from '@material-ui/core';

interface SpinnerProps {
  description: string;
}

const Spinner = ({ description }: SpinnerProps) => {
  return (
    <Container>
      <CircularProgress aria-describedby={description} />
    </Container>
  );
};

export default Spinner;
