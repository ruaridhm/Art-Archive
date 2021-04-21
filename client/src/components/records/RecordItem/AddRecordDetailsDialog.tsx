import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
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

interface inputState {
  name: string;
  date: Date | null;
  address: string;
}

const AddRecordDetailsDialog = ({ detail, record, open, setOpen }) => {
  const classes = useStyles();
  const [state, setState] = React.useState<inputState | null>(null);

  const handleChange = (e: {
    target: { type: any; name: string; value: any };
  }) => {
    // if (e.target.type !== undefined && e.target.type === 'text') {
    setState({ ...state, [e.target.name]: e.target.value });
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle id={`${detail}-title`} onClose={handleClose}>
        Add {detail}
      </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <TextField
              label={`${detail} Title`}
              variant='outlined'
              onChange={handleChange}
            />
            <TextField
              label={`${detail} Date`}
              variant='outlined'
              onChange={handleChange}
            />
            <TextField
              label={`${detail} Address`}
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecordDetailsDialog;
