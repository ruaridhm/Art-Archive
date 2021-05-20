import React, { useContext, useState } from 'react';
//Material UI
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Paper,
  Portal,
  Link,
} from '@material-ui/core';
import clsx from 'clsx';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
//Custom Components

import AddRecordDetailsDialog from './AddRecordDetailsDialog';
//Context
import RecordContext from '../../../context/record/RecordContext';

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
    content: {
      display: 'flex',
      flexDirection: 'row',
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
    display: 'flex',
    flexDirection: 'row',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles(() => ({
  listBold: {
    fontWeight: 600,
    paddingRight: '.25em',
  },
  paper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr',
    justifyItems: 'start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '.5em',
  },
  flexInline: {
    display: 'flex',
  },
  leftCol: {
    gridColumn: '1/2',
  },
  midCol: {
    gridColumn: '2/3',
  },
  rightCol: {
    gridColumn: '3/4',
  },
  midAndRightCol: {
    gridColumn: '2/4',
  },
}));

const RecordItemDialog = ({ record, open, setOpen }) => {
  const [showExhibitionDialog, setShowExhibitionDialog] =
    useState<boolean>(false);
  const [showSubmissionDialog, setShowSubmissionDialog] =
    useState<boolean>(false);
  const classes = useStyles();
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
    editions,
    mediaLinks,
    notes,
    exhibited,
    submission,
    sales,
    lastEdited,
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
      <Dialog
        onClose={handleClose}
        aria-labelledby='dialog-title'
        open={open}
        fullWidth={true}
        maxWidth='xl'
      >
        <DialogTitle id='dialog-title' onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <List style={{ width: '50%' }}>
            {reference && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Reference:
                      </Typography>{' '}
                      {reference}
                    </div>
                  }
                />
              </ListItem>
            )}
            {collectionName && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Collection:
                      </Typography>{' '}
                      {collectionName}
                    </div>
                  }
                />
              </ListItem>
            )}

            {date && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Date:
                      </Typography>{' '}
                      {getFormattedDate(date)}
                    </div>
                  }
                />
              </ListItem>
            )}
            {size && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Size:
                      </Typography>{' '}
                      {size}
                    </div>
                  }
                />
              </ListItem>
            )}
            {medium && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Medium:
                      </Typography>{' '}
                      {medium}
                    </div>
                  }
                />
              </ListItem>
            )}
            {price && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Price:
                      </Typography>{' '}
                      {price}
                    </div>
                  }
                />
              </ListItem>
            )}
            {currentLocation && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Current Location:
                      </Typography>{' '}
                      {currentLocation}
                    </div>
                  }
                />
              </ListItem>
            )}
            {editions && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Editions:
                      </Typography>{' '}
                      {editions}
                    </div>
                  }
                />
              </ListItem>
            )}

            {mediaLinks && (
              <>
                <Typography className={classes.listBold}>
                  Media Links:
                </Typography>
                {mediaLinks.map((element) => {
                  return (
                    <ListItem key={element._id}>
                      <ListItemText
                        primary={
                          <Paper elevation={3} className={classes.paper}>
                            <div
                              className={clsx(
                                classes.flexInline,
                                classes.leftCol
                              )}
                            >
                              <Typography className={classes.listBold}>
                                Title:
                              </Typography>
                              {element.title}
                            </div>
                            <div
                              className={clsx(
                                classes.flexInline,
                                classes.midAndRightCol
                              )}
                            >
                              <Typography className={classes.listBold}>
                                Link:
                              </Typography>
                              <Link
                                href={element.address}
                                target='_blank'
                                rel='noreferrer'
                              >
                                {element.address}
                              </Link>
                            </div>
                          </Paper>
                        }
                      />
                    </ListItem>
                  );
                })}
              </>
            )}
            {exhibited && (
              <>
                <Typography className={classes.listBold}>Exhibited:</Typography>
                {exhibited.map((element) => {
                  return (
                    <ListItem key={element._id}>
                      <ListItemText
                        primary={
                          <Paper elevation={3} className={classes.paper}>
                            {element.title && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.leftCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Title:
                                </Typography>
                                {element.title}
                              </div>
                            )}
                            {element.address && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.midCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Address:
                                </Typography>
                                {element.address}
                              </div>
                            )}
                            {element.date && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.rightCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Date:
                                </Typography>
                                {getFormattedDate(element.date)}
                              </div>
                            )}
                          </Paper>
                        }
                      />
                    </ListItem>
                  );
                })}
              </>
            )}
            {submission && (
              <>
                <Typography className={classes.listBold}>
                  Submissions:
                </Typography>
                {submission.map((element) => {
                  return (
                    <ListItem key={element._id}>
                      <ListItemText
                        primary={
                          <Paper elevation={3} className={classes.paper}>
                            {element.title && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.leftCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Title:
                                </Typography>
                                {element.title}
                              </div>
                            )}
                            {element.address && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.midCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Address:
                                </Typography>
                                {element.address}
                              </div>
                            )}
                            {element.date && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.rightCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Date:
                                </Typography>
                                {getFormattedDate(element.date)}
                              </div>
                            )}
                          </Paper>
                        }
                      />
                    </ListItem>
                  );
                })}
              </>
            )}

            {sales && (
              <>
                <Typography className={classes.listBold}>Sales:</Typography>
                <ListItem>
                  <ListItemText
                    primary={
                      <Paper elevation={3} className={classes.paper}>
                        {sales.soldTo && (
                          <div
                            className={clsx(
                              classes.flexInline,
                              classes.leftCol
                            )}
                          >
                            <Typography className={classes.listBold}>
                              Sold To:
                            </Typography>
                            {sales.soldTo}
                          </div>
                        )}
                        {sales.soldBy && (
                          <div
                            className={clsx(classes.flexInline, classes.midCol)}
                          >
                            <Typography className={classes.listBold}>
                              Sold By:
                            </Typography>
                            {sales.soldBy}
                          </div>
                        )}
                        {sales.soldDate && (
                          <div
                            className={clsx(
                              classes.flexInline,
                              classes.rightCol
                            )}
                          >
                            <Typography className={classes.listBold}>
                              Date:
                            </Typography>
                            {getFormattedDate(sales.soldDate)}
                          </div>
                        )}
                      </Paper>
                    }
                  />
                </ListItem>
              </>
            )}

            {notes && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Notes:
                      </Typography>{' '}
                      {notes}
                    </div>
                  }
                />
              </ListItem>
            )}

            {lastEdited && (
              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <Typography className={classes.listBold}>
                        Last Edited:
                      </Typography>{' '}
                      {getFormattedDate(lastEdited)}
                    </div>
                  }
                />
              </ListItem>
            )}
          </List>
          {image && (
            <div style={{ width: '50%' }}>
              <CardMedia
                component='img'
                alt={title}
                image={image[0].url}
                title={title}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color='secondary'>
            Delete
          </Button>
          <Button onClick={handleShowExhibition} color='primary'>
            Edit Exhibitions
          </Button>
          <Button onClick={handleShowSubmission} color='primary'>
            Edit Submissions
          </Button>
          <Button autoFocus onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {showExhibitionDialog && (
        <Portal>
          <AddRecordDetailsDialog
            detail='Exhibition'
            record={record}
            open={showExhibitionDialog}
            setOpen={setShowExhibitionDialog}
          />
        </Portal>
      )}
      {showSubmissionDialog && (
        <Portal>
          <AddRecordDetailsDialog
            detail='Submission'
            record={record}
            open={showSubmissionDialog}
            setOpen={setShowSubmissionDialog}
          />
        </Portal>
      )}
    </>
  );
};

export default RecordItemDialog;
