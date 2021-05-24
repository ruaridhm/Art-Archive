import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface SpinnerProps {
  description: string;
}

const Spinner = ({ description }: SpinnerProps) => {
  return <CircularProgress aria-describedby={description} />;
};

export default Spinner;
