import React, { useContext } from 'react';
import RecordContext from '../../../context/record/RecordContext';
import TextField from '@material-ui/core/TextField';

const RecordFilter = () => {
  const recordContext = useContext(RecordContext);
  const { filterRecords, clearFilter } = recordContext;

  const handleOnChange = (e: { target: { value: string } }) => {
    if (e.target.value !== '') {
      filterRecords(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <TextField
        variant='outlined'
        label='Filter Records'
        onChange={handleOnChange}
        size='medium'
      />
    </form>
  );
};

export default RecordFilter;
