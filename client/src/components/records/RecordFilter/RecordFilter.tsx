import React, { useContext } from 'react';
import RecordContext from '../../../context/record/RecordContext';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    filter: {
      width: '100%',
    },
  })
);

const RecordFilter = () => {
  const recordContext = useContext(RecordContext);
  const { filterRecords, clearFilter } = recordContext;
  const classes = useStyles();

  const handleOnChange = (e: { target: { value: string } }) => {
    if (e.target.value !== '') {
      filterRecords(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <TextField
      className={classes.filter}
      variant='outlined'
      label='Filter Records'
      onChange={handleOnChange}
      size='medium'
    />
  );
};

export default RecordFilter;
