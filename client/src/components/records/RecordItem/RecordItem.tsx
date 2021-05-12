import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import RecordContext from '../../../context/record/RecordContext';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import RecordItemDialog from './RecordItemDialog';
import ModalPortal from '../../modal/ModalPortal';

//icons
import EditIcon from '@material-ui/icons/Edit';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

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
  const classes = useStyles();

  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const recordContext = useContext(RecordContext);
  const { setCurrent } = recordContext;

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
        <ModalPortal>
          <RecordItemDialog
            record={record}
            open={showInfoDialog}
            setOpen={setShowInfoDialog}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default RecordItem;
