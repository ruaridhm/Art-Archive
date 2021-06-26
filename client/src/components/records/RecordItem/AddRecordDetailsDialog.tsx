import React, { useState, useContext } from 'react';
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
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
//Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//Components
import { DialogTitle } from './RecordItemDialog';
//Context
import RecordContext from '../../../context/record/RecordContext';
import { RecordInterface } from './RecordItem';
import { Number } from 'mongoose';

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
    },
    cardActions: {
      justifySelf: 'flex-end',
    },
  })
);

interface inputState {
  title: string;
  date: Date | string | null;
  address: string;
  _id?: string;
}

const emptyInput = {
  title: '',
  date: null,
  address: '',
};

interface AddRecordDetailsDialogInterface {
  detail: string;
  record: RecordInterface;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noDate?: boolean;
}

const AddRecordDetailsDialog = ({
  detail,
  record,
  open,
  setOpen,
  noDate,
}: AddRecordDetailsDialogInterface) => {
  const recordContext = useContext(RecordContext);
  const { updateRecord } = recordContext;
  const [state, setState] = useState<inputState | null>(emptyInput);
  const [editMode, setEditMode] = useState(false);
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
  const classes = useStyles();

  const handleChange = (e: {
    target: { type: any; name: string; value: string };
  }) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null | string) => {
    if (date === null) {
      setState({ ...state, date: null });
    } else {
      setState({ ...state, date: date.toString() });
    }
  };

  const handleDeleteItem = (id: string) => {
    let modifiedRecord = { ...record };
    let modifiedArr = [...record[reference]];
    modifiedArr = modifiedArr.filter(function (obj) {
      return obj._id !== id;
    });
    modifiedRecord[reference] = modifiedArr;
    updateRecord(modifiedRecord);
    console.log('delete item called');
  };

  const handleEditItem = (id: string) => {
    let edit = record[reference].find((x: { _id: string }) => x._id === id);
    setState(edit);
    setEditMode(true);
  };

  const handleAddItem = () => {
    if (state?.title === '' && state?.address === '') {
      //Todo add error alerting user here
      return;
    } else if (
      record[reference].find((x: { _id: string }) => x._id === state?._id)
    ) {
      let modifiedRecord = { ...record };
      let itemToEditIndex = modifiedRecord[reference].findIndex(
        (x: { _id: string }) => x._id === state?._id
      );
      modifiedRecord[reference][itemToEditIndex].title = state?.title;
      modifiedRecord[reference][itemToEditIndex].date = state?.date;
      modifiedRecord[reference][itemToEditIndex].address = state?.address;
      updateRecord(modifiedRecord);
      setState(emptyInput);
      setEditMode(false);
    } else {
      let modifiedRecord = { ...record };
      modifiedRecord[reference].push(state);
      updateRecord(modifiedRecord);
      setState(emptyInput);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id={`${detail}-title`} onClose={handleClose}>
        {detail}s
      </DialogTitle>
      <DialogContent>
        {record[reference].length >= 1 &&
        record[reference][0].title !== '' &&
        record[reference][0].address !== '' ? (
          <Paper>
            {record[reference].map(
              (element: {
                _id: string;
                title:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal;
                address:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal;
                date: string | any[];
              }) => (
                <Card
                  variant='outlined'
                  className={classes.paper}
                  key={element._id}
                >
                  <CardContent>
                    <Typography>{element.title}</Typography>
                    <Typography>{element.address}</Typography>
                    {element.date && (
                      <Typography>
                        {element.date.slice(8, 10)} / {element.date.slice(5, 7)}{' '}
                        /{element.date.slice(0, 4)}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <IconButton
                      aria-label='edit'
                      size='small'
                      color='primary'
                      onClick={() => {
                        handleEditItem(element._id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
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
                  </CardActions>
                </Card>
              )
            )}
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
              value={state?.title}
            />
            {!noDate && (
              <KeyboardDatePicker
                margin='normal'
                id='date-picker-dialog'
                label={`${detail} Date`}
                format='dd/MM/yyyy'
                value={state?.date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                inputVariant='outlined'
              />
            )}
            <TextField
              label={`${detail} Address`}
              variant='outlined'
              onChange={handleChange}
              name='address'
              value={state?.address}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
        <Button onClick={handleAddItem} color='primary'>
          {editMode ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecordDetailsDialog;
