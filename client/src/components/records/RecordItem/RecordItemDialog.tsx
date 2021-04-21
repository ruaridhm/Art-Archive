import React, { useContext, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';

import RecordContext from '../../../context/record/RecordContext';
import ModalPortal from '../../modal/ModalPortal';
import AddRecordDetailsDialog from './AddRecordDetailsDialog';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const RecordItemDialog = ({ record, open, setOpen }) => {
  const [showExhibitionDialog, setShowExhibitionDialog] = useState<boolean>(
    false
  );
  const [showSubmissionDialog, setShowSubmissionDialog] = useState<boolean>(
    false
  );
  const recordContext = useContext(RecordContext);
  const { deleteRecord, clearCurrent } = recordContext;

  const {
    _id,
    title,
    reference,
    collectionName,
    image,
    date,
    size,
    medium,
    price,
    currentLocation,
    mediaLinks,
    notes,
    firstExhibitedDate,
    firstExhibitedTitle,
    firstExhibitedAddress,
    exhibited,
    submission,
    salesHistorySoldTo,
    salesHistorySoldBy,
    salesHistoryDateSold,
  } = record;

  const handleDelete = () => {
    deleteRecord(_id);
    clearCurrent();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowExhibition = () => {
    setShowExhibitionDialog(true);
    console.log(showExhibitionDialog);
  };

  const handleShowSubmission = () => {
    setShowSubmissionDialog(!showSubmissionDialog);
  };

  const getFormattedDate = (date) => {
    const dateStr = date.toString();

    return `${dateStr.substring(8, 10)}-${dateStr.substring(
      5,
      7
    )}-${dateStr.substring(0, 4)} `;
  };

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby='dialog-title' open={open}>
        <DialogTitle id='dialog-title' onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {reference && (
              <ListItem>
                <ListItemText primary={`Reference: ${reference}`} />
              </ListItem>
            )}
            {collectionName && (
              <ListItem>
                <ListItemText primary={`Collection: ${collectionName}`} />
              </ListItem>
            )}

            {date && (
              <ListItem>
                <ListItemText primary={`Date: ${getFormattedDate(date)}`} />
              </ListItem>
            )}
            {size && (
              <ListItem>
                <ListItemText primary={`Size: ${size}`} />
              </ListItem>
            )}
            {medium && (
              <ListItem>
                <ListItemText primary={`Medium: ${medium}`} />
              </ListItem>
            )}
            {price && (
              <ListItem>
                <ListItemText primary={`Price: ${price}`} />
              </ListItem>
            )}
            {currentLocation && (
              <ListItem>
                <ListItemText
                  primary={`Current Location: ${currentLocation}`}
                />
              </ListItem>
            )}
            {mediaLinks && (
              <ListItem>
                <ListItemText primary={`Media Links: ${mediaLinks}`} />
              </ListItem>
            )}
            {notes && (
              <ListItem>
                <ListItemText primary={`Notes: ${notes}`} />
              </ListItem>
            )}
            {salesHistorySoldTo && (
              <ListItem>
                <ListItemText primary={`Sold To: ${salesHistorySoldTo}`} />
              </ListItem>
            )}
            {salesHistorySoldBy && (
              <ListItem>
                <ListItemText primary={`Sold By: ${salesHistorySoldBy}`} />
              </ListItem>
            )}
            {salesHistoryDateSold && (
              <ListItem>
                <ListItemText primary={`Date Sold: ${salesHistoryDateSold}`} />
              </ListItem>
            )}
            {firstExhibitedDate && (
              <ListItem>
                <ListItemText
                  primary={`First Exhibited Date: ${firstExhibitedDate}`}
                />
              </ListItem>
            )}
            {firstExhibitedTitle && (
              <ListItem>
                <ListItemText
                  primary={`First Exhibited Title: ${firstExhibitedTitle}`}
                />
              </ListItem>
            )}
            {firstExhibitedAddress && (
              <ListItem>
                <ListItemText
                  primary={`First Exhibited Address: ${firstExhibitedAddress}`}
                />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color='secondary'>
            Delete
          </Button>
          <Button onClick={handleShowExhibition} color='primary'>
            Add Exhibition
          </Button>
          <Button onClick={handleShowSubmission} color='primary'>
            Add Submission
          </Button>
          <Button autoFocus onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {showExhibitionDialog && (
        <ModalPortal>
          <AddRecordDetailsDialog
            detail='Exhibition'
            record={record}
            open={showExhibitionDialog}
            setOpen={setShowExhibitionDialog}
          />
        </ModalPortal>
      )}
      {showSubmissionDialog && (
        <ModalPortal>
          <AddRecordDetailsDialog
            detail='Submission'
            record={record}
            open={showSubmissionDialog}
            setOpen={setShowSubmissionDialog}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default RecordItemDialog;
