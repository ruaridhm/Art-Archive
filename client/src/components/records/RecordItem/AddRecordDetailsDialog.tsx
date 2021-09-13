import React, { useState, useContext } from 'react';
//Material Ui
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  makeStyles,
  Paper,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
//Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//Components
import { DialogTitle } from './RecordItemDialog';
//Context
import RecordContext from '../../../context/record/RecordContext';
import { RecordInterface } from './RecordItem';
import AddRecordDetailsDialogForm from './AddRecordDetailsDialogForm';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      minWidth: '20rem',
      padding: '.25rem',
      paddingTop: '1rem',
    },
    card: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      marginBottom: '1em',
    },
    cardActions: {
      justifySelf: 'flex-end',
    },
  })
);

export interface exhibitionsState {
  exhibitionTitle?: string;
  exhibitionAddress?: string;
  exhibitionDate?: Date | string | null;
  _id?: string | undefined;
  [index: string]: any;
}

export interface submissionsState {
  submissionTitle?: string;
  submissionAddress?: string;
  submissionDate?: Date | string | null;
  _id?: string | undefined;
  [index: string]: any;
}

export interface soldState {
  soldTo?: string;
  soldBy?: string;
  soldDate?: Date | string | null;
  _id?: string | undefined;
  [index: string]: any;
}

interface AddRecordDetailsDialogInterface {
  detail: string;
  record: RecordInterface;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noDate?: boolean;
  emptyInput: {};
  inputValues: [string, string, string];
}

const AddRecordDetailsDialog = ({
  detail,
  record,
  open,
  setOpen,
  noDate,
  emptyInput,
  inputValues,
}: AddRecordDetailsDialogInterface) => {
  const recordContext = useContext(RecordContext);
  const { updateRecord } = recordContext;
  const [state, setState] = useState<
    exhibitionsState | submissionsState | soldState | null
  >(emptyInput);
  const [editMode, setEditMode] = useState(false);
  //Creating a string to use to reference values using bracket notation below and also use detail prop for strings
  let reference = '';
  switch (detail) {
    case 'Exhibition':
      reference = 'exhibitions';
      break;
    case 'Submission':
      reference = 'submissions';
      break;
    case 'MediaLink':
      reference = 'mediaLinks';
      break;
    case 'Sale':
      reference = 'sales';
      break;
    default:
      console.error('switch hit default case');
  }
  const classes = useStyles();

  const handleChange = (e: {
    target: exhibitionsState | submissionsState | soldState;
  }) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null | string) => {
    if (inputValues[2] === 'exhibitionDate' || 'submissionDate') {
      if (date === null) {
        setState({ ...state, [inputValues[2]]: null });
      } else {
        setState({ ...state, [inputValues[2]]: date.toString() });
      }
    } else if (inputValues[2] === 'soldDate') {
      if (date === null) {
        setState({ ...state, soldDate: null });
      } else {
        setState({ ...state, soldDate: date.toString() });
      }
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
  };

  const handleEditItem = (id: string) => {
    let edit = record[reference].find((x: { _id: string }) => x._id === id);
    setState(edit);
    setEditMode(true);
  };

  const handleAddItem = () => {
    //State is incomplete return an alert
    if (state?.[inputValues[0]] === '' && state?.[inputValues[1]] === '') {
      //Todo add error alerting user here
      return;
      //if element already exists update existing record
    } else if (
      record[reference].find((x: { _id: string }) => x._id === state?._id)
    ) {
      let modifiedRecord = { ...record };
      let itemToEditIndex = modifiedRecord[reference].findIndex(
        (x: { _id: string }) => x._id === state?._id
      );

      modifiedRecord[reference][itemToEditIndex][inputValues[0]] =
        state?.[inputValues[0]];
      modifiedRecord[reference][itemToEditIndex][inputValues[1]] =
        state?.[inputValues[1]];
      modifiedRecord[reference][itemToEditIndex][inputValues[2]] =
        state?.[inputValues[2]];

      updateRecord(modifiedRecord);
      setState(emptyInput);
      setEditMode(false);
      //element does not exist create new and add to record
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
        {record[reference].length >= 1 ? (
          <Paper className={classes.paper} elevation={0}>
            {record[reference].map(
              (
                element: {
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
                  [index: string]: any;
                },
                index: number
              ) => (
                <Card variant='outlined' className={classes.card} key={index}>
                  <CardContent>
                    {detail === 'Sale' && (
                      <Typography variant='h6'>Edition {index + 1}</Typography>
                    )}
                    <Typography>{element[inputValues[0]]}</Typography>
                    <Typography>{element[inputValues[1]]}</Typography>
                    {element[inputValues[2]] && (
                      <Typography>
                        {element[inputValues[2]].slice(8, 10)} /{' '}
                        {element[inputValues[2]].slice(5, 7)} /
                        {element[inputValues[2]].slice(0, 4)}
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
                    {reference !== 'sales' && (
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
                    )}
                  </CardActions>
                </Card>
              )
            )}
          </Paper>
        ) : (
          <p>No {detail} saved</p>
        )}
        {detail !== 'Sale' ? (
          <AddRecordDetailsDialogForm
            detail={detail}
            inputValues={inputValues}
            handleChange={handleChange}
            state={state}
            noDate={noDate}
            handleDateChange={handleDateChange}
          />
        ) : (
          <>
            {editMode && (
              <AddRecordDetailsDialogForm
                detail={detail}
                inputValues={inputValues}
                handleChange={handleChange}
                state={state}
                noDate={noDate}
                handleDateChange={handleDateChange}
              />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' variant='contained'>
          Close
        </Button>
        {detail !== 'Sale' ? (
          <Button onClick={handleAddItem} color='primary' variant='contained'>
            {editMode ? 'Update' : 'Add'}
          </Button>
        ) : (
          <>
            {editMode && (
              <Button
                onClick={handleAddItem}
                color='primary'
                variant='contained'
              >
                Update
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddRecordDetailsDialog;
