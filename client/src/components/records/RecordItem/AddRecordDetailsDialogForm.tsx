import React from 'react';
import { FormControl, TextField, Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  exhibitionsState,
  submissionsState,
  soldState,
} from './AddRecordDetailsDialog';

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
    target: exhibitionsState | submissionsState | soldState;
  }) => void;
  state: exhibitionsState | submissionsState | soldState | null;
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
  let inputLabels: string[] = [];

  switch (detail) {
    case 'Exhibition':
    case 'Submission':
      inputLabels = ['Title', 'Address', 'Date'];
      break;
    case 'MediaLink':
      inputLabels = ['Title', 'Link'];
      break;
    case 'Sale':
      inputLabels = ['Sold To', 'Sold By', 'Date'];
      break;
    default:
      break;
  }
  const classes = useStyles();
  return (
    <form className={classes.container}>
      <FormControl className={classes.formControl}>
        <TextField
          label={inputLabels[0]}
          onChange={handleChange}
          name={`${inputValues[0]}`}
          value={state?.[inputValues[0]]}
          margin='normal'
        />
        <TextField
          label={inputLabels[1]}
          onChange={handleChange}
          name={`${inputValues[1]}`}
          value={state?.[inputValues[1]]}
          margin='normal'
        />
        {!noDate && (
          <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label={inputLabels[2]}
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
