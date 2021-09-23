/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<FilterOptionType>();

interface AutoCompleteInterface {
  id: string;
  label: string;
  autocompleteOptions: string[] | [];
  value: any;
  name: string;
  onChange: (value: any, name: any, subName?: string) => void;
  subName?: string;
  className?: any;
}

const AutoCompleteTextField = ({
  id,
  label,
  autocompleteOptions,
  value,
  name,
  onChange,
  subName,
  className,
}: AutoCompleteInterface) => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    if (val != null && val.hasOwnProperty('title')) {
      if (subName) {
        onChange(val.title, name, subName);
      } else {
        onChange(val.title, name);
      }
    } else {
      if (subName) {
        onChange(val, name, subName);
      } else {
        onChange(val, name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  return (
    <Autocomplete
      className={className}
      value={val}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id={id}
      options={autocompleteOptions}
      renderOption={(option) => option.title}
      style={{ width: 300 }}
      freeSolo
      onChange={(_event, newValue) => {
        if (typeof newValue === 'string') {
          setVal(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setVal(newValue.inputValue);
        } else {
          setVal(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option

        return option.title;
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

interface FilterOptionType {
  inputValue?: string;
  title: string;
}

export default AutoCompleteTextField;
