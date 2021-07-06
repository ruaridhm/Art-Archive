import React, { useContext } from 'react';
import { Button, IconButton, useMediaQuery } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RecordContext from '../../context/record/RecordContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      [theme.breakpoints.down('xs')]: {
        width: '25%',
      },
    },
  })
);

interface AddRecordButtonInterface {
  setDisplayAddRecord: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRecordButton = ({ setDisplayAddRecord }: AddRecordButtonInterface) => {
  const addButtonMediaQuery = useMediaQuery('(min-width:900px)');
  const recordContext = useContext(RecordContext);
  const { clearCurrent } = recordContext;
  const classes = useStyles();

  const handleAddRecord = () => {
    clearCurrent();
    setDisplayAddRecord(true);
  };

  return addButtonMediaQuery ? (
    <Button
      variant='contained'
      color='primary'
      size='large'
      startIcon={<AddIcon />}
      onClick={handleAddRecord}
      aria-label='add record'
    >
      Add Record
    </Button>
  ) : (
    <IconButton
      className={classes.addButton}
      color='primary'
      onClick={handleAddRecord}
      aria-label='add record'
    >
      <AddIcon fontSize='large' />
    </IconButton>
  );
};

export default AddRecordButton;
