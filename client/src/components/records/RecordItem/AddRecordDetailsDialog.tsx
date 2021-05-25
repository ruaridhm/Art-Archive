import React, { useContext } from 'react';
//Material Ui
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Paper,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
//Components
import { DialogTitle } from './RecordItemDialog';
//Context
import RecordContext from '../../../context/record/RecordContext';

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
    paper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      paddingLeft: '.5em',
    },
  })
);

interface inputState {
  title: string;
  date: Date | string | null;
  address: string;
}

const emptyInput = {
  title: '',
  date: null,
  address: '',
};

const AddRecordDetailsDialog = ({ detail, record, open, setOpen }) => {
  const recordContext = useContext(RecordContext);
  const { updateRecord } = recordContext;
  const [state, setState] = React.useState<inputState | null>(emptyInput);
  //Creating a string to use to reference values using bracket notation below and also use detail prop for strings
  let reference: string;
  switch (detail) {
    case 'Exhibition':
      reference = 'exhibited';
      break;
    case 'Submission':
      reference = 'submission';
      break;
    case 'MediaLink':
      reference = 'mediaLinks';
      break;
    default:
      console.log('switch hit default case');
  }

  console.log(reference);

  const classes = useStyles();

  const handleChange = (e: {
    target: { type: any; name: string; value: string };
  }) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null | string) => {
    setState({ ...state, date: date.toString() });
  };

  const handleDeleteItem = (id: string) => {
    let modifiedRecord = { ...record };
    let modifiedArr = [...record[reference]];
    modifiedArr = modifiedArr.filter(function (obj) {
      return obj._id !== id;
    });
    modifiedRecord[reference] = modifiedArr;
    updateRecord(modifiedRecord);
  };

  const handleAddItem = () => {
    let modifiedRecord = { ...record };
    modifiedRecord[reference].push(state);
    console.log(modifiedRecord);
    updateRecord(modifiedRecord);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle id={`${detail}-title`} onClose={handleClose}>
        {detail}s
      </DialogTitle>
      <DialogContent>
        {(record[reference].length >= 1 && record[reference][0].title) ||
        (record[reference].length >= 1 && record[reference][0].address) ||
        (record[reference].length >= 1 && record[reference][0].date) ? (
          <Paper>
            {record[reference].map((element) => (
              <Paper
                variant='outlined'
                className={classes.paper}
                key={element._id}
              >
                <p>{element.title}</p>
                <p>{element.address}</p>
                {element.date && (
                  <p>
                    {element.date.slice(8, 10)} / {element.date.slice(5, 7)} /
                    {element.date.slice(0, 4)}
                  </p>
                )}
                <IconButton
                  aria-label='delete'
                  size='small'
                  color='secondary'
                  onClick={() => {
                    handleDeleteItem(element._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))}
          </Paper>
        ) : (
          <p>No {detail}s saved</p>
        )}
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <TextField
              label={`${detail} Title`}
              variant='outlined'
              onChange={handleChange}
              name='title'
            />
            <KeyboardDatePicker
              margin='normal'
              id='date-picker-dialog'
              label={`${detail} Date`}
              format='dd/MM/yyyy'
              value={state.date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              inputVariant='outlined'
            />
            <TextField
              label={`${detail} Address`}
              variant='outlined'
              onChange={handleChange}
              name='address'
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
        <Button onClick={handleAddItem} color='primary'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecordDetailsDialog;
