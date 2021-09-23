import React from 'react';
import { Container, CircularProgress } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

interface SpinnerProps {
  description: string;
}
const useStyles = makeStyles({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
});

const Spinner = ({ description }: SpinnerProps) => {
  const classes = useStyles();
  return (
    <Container className={classes.spinnerContainer}>
      <CircularProgress aria-describedby={description} />
    </Container>
  );
};

export default Spinner;
