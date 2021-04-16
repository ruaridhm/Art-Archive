import React, { useContext, useRef } from 'react';
import RecordContext from '../../../context/record/RecordContext';
import TextField from '@material-ui/core/TextField';

import { FilterFormContainer } from './Style';

const RecordFilter = () => {
  const recordContext = useContext(RecordContext);
  const text = useRef<HTMLInputElement>(null);
  const { filterRecords, clearFilter } = recordContext;

  const handleOnChange = (e: { target: { value: string } }) => {
    if (e.target.value !== '') {
      filterRecords(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <FilterFormContainer>
      <form>
        <TextField
          label='Filter Records'
          onChange={handleOnChange}
          size='medium'
        />
      </form>
    </FilterFormContainer>
  );
};

export default RecordFilter;
