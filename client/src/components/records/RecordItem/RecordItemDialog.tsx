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
import {
  ExhibitionInterface,
  SubmissionInterface,
  MediaLinksInterface,
  RecordInterface,
} from './RecordItem';
import CarouselComponent from '../../pages/Gallery/CarouselComponent';
// import EditionSalesDialog from './EditionSalesDialog';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      marginLeft: '.7em',
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

export interface ImgInterface {
  url: string;
  thumbnail: string;
  public_Id: string;
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '.5em',
  },
  mediaLink: {},
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

interface RecordItemDialogProps {
  record: RecordInterface;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecordItemDialog = ({ record, open, setOpen }: RecordItemDialogProps) => {
  const [showSalesDialog, setShowSalesDialog] = useState<boolean>(false);
  const [showExhibitionDialog, setShowExhibitionDialog] =
    useState<boolean>(false);
  const [showSubmissionsDialog, setShowSubmissionsDialog] =
    useState<boolean>(false);
  const [showMediaQueryDialog, setShowMediaQueryDialog] =
    useState<boolean>(false);
  const classes = useStyles();
  const recordContext = useContext(RecordContext);
  const {
    deleteRecord,
    clearCurrent,
    deleteCloudinaryImage,
    bulkDeleteCloudinaryImage,
  } = recordContext;

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
    exhibitions,
    submissions,
    // sales,
    lastEdited,
  } = record;

  const handleDelete = () => {
    if (_id !== undefined) {
      //handle bulk delete of cloudinary images
      if (image!.length > 1) {
        //Bulk Delete
        const public_Ids: string[] = image!.map(
          (img: { public_Id: string }) => {
            return img.public_Id;
          }
        );

        bulkDeleteCloudinaryImage(public_Ids);
        deleteRecord(_id);
        clearCurrent();
      } else if (image!.length === 1) {
        //single delete
        try {
          deleteCloudinaryImage(image![0].public_Id);
          deleteRecord(_id);
          clearCurrent();

          return 'true';
        } catch {
          console.error('Unable to delete image from Cloudinary');
        }
      } else {
        deleteRecord(_id);
        clearCurrent();
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowSales = () => {
    setShowSalesDialog(!showSalesDialog);
  };

  const handleShowMediaQuery = () => {
    setShowMediaQueryDialog(!showMediaQueryDialog);
  };

  const handleShowExhibition = () => {
    setShowExhibitionDialog(!showExhibitionDialog);
  };

  const handleShowSubmissions = () => {
    setShowSubmissionsDialog(!showSubmissionsDialog);
  };

  const getFormattedDate = (date: Date) => {
    const dateStr = date.toString();
    return `${dateStr.substring(8, 10)}-${dateStr.substring(
      5,
      7
    )}-${dateStr.substring(0, 4)} `;
  };

  interface recordImagesInterface {
    src: string;
  }

  const getRecordImages = () => {
    let recordImages: recordImagesInterface[] = [];
    image!.forEach((img: ImgInterface) => {
      recordImages.push({ src: img.url });
    });
    return recordImages;
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby='dialog-title'
        open={open}
        fullWidth={image!.length >= 1 ? false : true}
        maxWidth='xl'
      >
        <DialogTitle id='dialog-title' onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <List style={{ width: image!.length >= 1 ? '100%' : '50%' }}>
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
                        Price: €
                      </Typography>
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

            {mediaLinks !== [] && (
              <>
                <Typography className={classes.listBold}>
                  Media Links:
                </Typography>
                {mediaLinks?.map(
                  (element: MediaLinksInterface, index: number) => {
                    return (
                      <ListItem key={index}>
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
                                {element.mediaTitle}
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
                                  className={classes.mediaLink}
                                  href={element.mediaAddress}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {element.mediaAddress}
                                </Link>
                              </div>
                            </Paper>
                          }
                        />
                      </ListItem>
                    );
                  }
                )}
              </>
            )}
            {exhibitions !== [] && (
              <>
                <Typography className={classes.listBold}>
                  Exhibitions:
                </Typography>
                {exhibitions?.map(
                  (element: ExhibitionInterface, index: number) => {
                    return (
                      <ListItem key={index}>
                        <ListItemText
                          primary={
                            <Paper elevation={3} className={classes.paper}>
                              {element.exhibitionTitle && (
                                <div
                                  className={clsx(
                                    classes.flexInline,
                                    classes.leftCol
                                  )}
                                >
                                  <Typography className={classes.listBold}>
                                    Title:
                                  </Typography>
                                  {element.exhibitionTitle}
                                </div>
                              )}
                              {element.exhibitionAddress && (
                                <div
                                  className={clsx(
                                    classes.flexInline,
                                    classes.midCol
                                  )}
                                >
                                  <Typography className={classes.listBold}>
                                    Address:
                                  </Typography>
                                  {element.exhibitionAddress}
                                </div>
                              )}
                              {element.exhibitionDate && (
                                <div
                                  className={clsx(
                                    classes.flexInline,
                                    classes.rightCol
                                  )}
                                >
                                  <Typography className={classes.listBold}>
                                    Date:
                                  </Typography>
                                  {getFormattedDate(element.exhibitionDate)}
                                </div>
                              )}
                            </Paper>
                          }
                        />
                      </ListItem>
                    );
                  }
                )}
              </>
            )}
            {submissions !== [] && (
              <>
                <Typography className={classes.listBold}>
                  Submissions:
                </Typography>
                {submissions?.map((element: SubmissionInterface) => {
                  return (
                    <ListItem key={element._id}>
                      <ListItemText
                        primary={
                          <Paper elevation={3} className={classes.paper}>
                            {element.submissionTitle && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.leftCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Title:
                                </Typography>
                                {element.submissionTitle}
                              </div>
                            )}
                            {element.submissionAddress && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.midCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Address:
                                </Typography>
                                {element.submissionAddress}
                              </div>
                            )}
                            {element.submissionDate && (
                              <div
                                className={clsx(
                                  classes.flexInline,
                                  classes.rightCol
                                )}
                              >
                                <Typography className={classes.listBold}>
                                  Date:
                                </Typography>
                                {getFormattedDate(element.submissionDate)}
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

            {/* {sales?.soldTo !== '' &&
              sales?.soldBy !== '' &&
              sales?.soldDate !== null && (
                <>
                  <Typography className={classes.listBold}>Sales:</Typography>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Paper elevation={3} className={classes.paper}>
                          {sales?.soldTo && (
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
                          {sales?.soldBy && (
                            <div
                              className={clsx(
                                classes.flexInline,
                                classes.midCol
                              )}
                            >
                              <Typography className={classes.listBold}>
                                Sold By:
                              </Typography>
                              {sales?.soldBy}
                            </div>
                          )}
                          {sales?.soldDate && (
                            <div
                              className={clsx(
                                classes.flexInline,
                                classes.rightCol
                              )}
                            >
                              <Typography className={classes.listBold}>
                                Date:
                              </Typography>
                              {getFormattedDate(sales?.soldDate)}
                            </div>
                          )}
                        </Paper>
                      }
                    />
                  </ListItem>
                </>
              )} */}

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
          {image!.length === 1 && (
            <div style={{ width: '50%' }}>
              <CardMedia
                component='img'
                alt={title}
                image={image![0].url}
                title={title}
              />
            </div>
          )}
          {image!.length > 1 && (
            <div style={{ width: '50%' }}>
              <CarouselComponent
                images={getRecordImages()}
                handleCurrentIndex={() => {}}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color='secondary' variant='contained'>
            Delete
          </Button>
          <Button
            onClick={handleShowMediaQuery}
            color='primary'
            variant='contained'
          >
            Edit Media Links
          </Button>
          <Button onClick={handleShowSales} color='primary' variant='contained'>
            Edit Sales
          </Button>
          <Button
            onClick={handleShowExhibition}
            color='primary'
            variant='contained'
          >
            Edit Exhibitions
          </Button>
          <Button
            onClick={handleShowSubmissions}
            color='primary'
            variant='contained'
          >
            Edit Submissions
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            color='primary'
            variant='contained'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {showSalesDialog && (
        <Portal>
          <AddRecordDetailsDialog
            detail='Sale'
            record={record}
            open={showSalesDialog}
            setOpen={setShowSalesDialog}
            emptyInput={{ soldTo: '', soldBy: '', date: null }}
            inputValues={['soldTo', 'soldBy', 'soldDate']}
          />
        </Portal>
      )}

      {showExhibitionDialog && (
        <Portal>
          <AddRecordDetailsDialog
            detail='Exhibition'
            record={record}
            open={showExhibitionDialog}
            setOpen={setShowExhibitionDialog}
            emptyInput={{
              exhibitionTitle: '',
              exhibitionAddress: '',
              exhibitionDate: null,
            }}
            inputValues={[
              'exhibitionTitle',
              'exhibitionAddress',
              'exhibitionDate',
            ]}
          />
        </Portal>
      )}
      {showSubmissionsDialog && (
        <Portal>
          <AddRecordDetailsDialog
            detail='Submission'
            record={record}
            open={showSubmissionsDialog}
            setOpen={setShowSubmissionsDialog}
            emptyInput={{
              submissionTitle: '',
              submissionAddress: '',
              submissionDate: null,
            }}
            inputValues={[
              'submissionTitle',
              'submissionAddress',
              'submissionDate',
            ]}
          />
        </Portal>
      )}
      {showMediaQueryDialog && (
        <Portal>
          <AddRecordDetailsDialog
            detail='MediaLink'
            record={record}
            open={showMediaQueryDialog}
            setOpen={setShowMediaQueryDialog}
            noDate
            emptyInput={{ mediaTitle: '', mediaAddress: '' }}
            inputValues={['mediaTitle', 'mediaAddress', '']}
          />
        </Portal>
      )}
    </>
  );
};

export default RecordItemDialog;
