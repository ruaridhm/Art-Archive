import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { DialogTitle } from './RecordItemDialog';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

const SubmissionDialog = ({ record, open, setOpen }) => {
  const classes = useStyles();
  const [age, setAge] = React.useState<number | string>('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id='exhibition-title' onClose={handleClose}>
        Submissions
      </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <TextField
              label='Submission Title'
              variant='outlined'
              onChange={handleChange}
            />
            <TextField
              label='Submission Date'
              variant='outlined'
              onChange={handleChange}
            />
            <TextField
              label='Submission Address'
              variant='outlined'
              onChange={handleChange}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleClose} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmissionDialog;
