import React from 'react';
import {
  FormControl,
  createStyles,
  TextField,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { inputState, inputState2 } from './AddRecordDetailsDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '1em',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

interface AddRecordDetailsDialogFormInterface {
  detail: string;
  inputValues: [string, string, string];
  handleChange: (e: {
    target: {
      type: any;
      name: string;
      value: string;
    };
  }) => void;
  state: inputState | inputState2 | null;
  noDate?: boolean;
  handleDateChange: (date: Date | null | string) => void;
}

const AddRecordDetailsDialogForm = ({
  detail,
  inputValues,
  handleChange,
  state,
  noDate,
  handleDateChange,
}: AddRecordDetailsDialogFormInterface) => {
  const classes = useStyles();
  return (
    <form className={classes.container}>
      <FormControl className={classes.formControl}>
        <TextField
          label={`${detail} ${inputValues[0]}`}
          variant='outlined'
          onChange={handleChange}
          name={`${inputValues[0]}`}
          value={state?.[inputValues[0]]}
          margin='normal'
        />
        <TextField
          label={`${detail} ${inputValues[1]}`}
          variant='outlined'
          onChange={handleChange}
          name={`${inputValues[1]}`}
          value={state?.[inputValues[1]]}
          margin='normal'
        />
        {!noDate && (
          <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label={`${detail} date`}
            format='dd/MM/yyyy'
            value={state?.[inputValues[2]]}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            inputVariant='outlined'
          />
        )}
      </FormControl>
    </form>
  );
};

export default AddRecordDetailsDialogForm;
