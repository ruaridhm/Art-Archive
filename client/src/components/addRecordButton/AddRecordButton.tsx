import React, { useContext } from 'react';
import { Button, IconButton, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RecordContext from '../../context/record/RecordContext';
import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      [theme.breakpoints.down('sm')]: {
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
      size="large">
      <AddIcon fontSize='large' />
    </IconButton>
  );
};

export default AddRecordButton;
