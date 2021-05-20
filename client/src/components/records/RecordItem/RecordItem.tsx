import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
//Context
import RecordContext from '../../../context/record/RecordContext';
//Material UI
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Portal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Components
import RecordItemDialog from './RecordItemDialog';

//icons
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 500,
  },
  media: {
    height: 140,
  },
  actionArea: {
    height: '90%',
  },
});

export interface MediaLinksInterface {
  title?: string;
  address?: string;
}

export interface DisplayedInterface {
  title?: string;
  date: Date | null;
  address?: string;
}
export interface SalesInterface {
  soldTo?: string;
  soldBy?: string;
  soldDate?: Date | null;
  sold?: Boolean;
}

export interface RecordInterface {
  _id?: string;
  title?: string;
  artist?: string;
  reference?: string;
  collectionName?: string;
  image?: { url: string }[] | [];
  date?: Date | null;
  size?: string;
  medium?: string;
  price?: Number;
  currentLocation?: string;
  editions?: Number;
  mediaLinks?: MediaLinksInterface[] | [];
  notes?: string;
  exhibited: DisplayedInterface[];
  submission?: DisplayedInterface[] | [];
  sales?: SalesInterface;
  lastEdited?: Date | null;
}

interface RecordItemProps {
  record: RecordInterface;
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
}

const RecordItem = ({ record, setDisplayAddRecord }: RecordItemProps) => {
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const recordContext = useContext(RecordContext);
  const { setCurrent } = recordContext;
  const classes = useStyles();
  const { title, reference, collectionName, image, medium, price } = record;

  const scrollToTop = () => {
    document.documentElement.scrollTop = 110;
  };

  const editRecord = () => {
    setCurrent(record);
    setDisplayAddRecord(true);
    scrollToTop();
  };

  const showRecordInfoDialogHandler = () => {
    setShowInfoDialog(true);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea
          onClick={showRecordInfoDialogHandler}
          className={classes.actionArea}
        >
          {image !== null && (
            <CardMedia
              className={classes.media}
              component='img'
              alt={title}
              height='140'
              image={image[0].url}
              title={title}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
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
            </List>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={editRecord}
            color='primary'
            variant='contained'
            startIcon={<EditIcon />}
            size='medium'
          >
            Edit
          </Button>
        </CardActions>
      </Card>

      {showInfoDialog && (
        <Portal>
          <RecordItemDialog
            record={record}
            open={showInfoDialog}
            setOpen={setShowInfoDialog}
          />
        </Portal>
      )}
    </>
  );
};

export default RecordItem;
