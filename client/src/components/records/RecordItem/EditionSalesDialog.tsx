import React, { useState, useContext } from 'react';
//Material Ui
import {
  Button,
  createStyles,
  Checkbox,
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
//Components
import { DialogTitle } from './RecordItemDialog';
//Context
import RecordContext from '../../../context/record/RecordContext';
import { RecordInterface } from './RecordItem';

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

interface EditionSalesDialogInterface {
  editions: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditionSalesDialog = ({
  editions,
  open,
  setOpen,
}: EditionSalesDialogInterface) => {
  const recordContext = useContext(RecordContext);
  const { updateRecord } = recordContext;
  const [soldEditions, setSoldEditions] = useState<any>();

  const classes = useStyles();

  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setChecked(event.target.checked);
  //   };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle onClose={handleClose} id='SoldEditions'>
        Editions {editions}
      </DialogTitle>
      <DialogContent>
        <Paper>
          {/* {editions.map((numb, key) => {
            return (
              <Card variant='outlined' className={classes.paper} key={key}>
                <CardContent>
                  <Typography>Edition{numb}</Typography>
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </CardContent>
              </Card>
            );
          })} */}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditionSalesDialog;
