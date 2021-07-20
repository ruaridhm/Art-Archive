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
  card: {
    minWidth: 275,
    maxWidth: 275,
    height: 410,
    margin: 8,
  },
  media: {
    height: 140,
  },
  cardContent: {
    paddingTop: 8,
    paddingBottom: 8,
    height: 217,
  },
  cardTitle: {
    marginBottom: 0,
  },
  cardList: {
    paddingTop: 0,
  },
  cardListItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  cardActions: {
    height: 53,
    paddingBottom: 5,
  },
});

export interface MediaLinksInterface {
  title?: string;
  address?: string;
  _id: string;
}

export interface DisplayedInterface {
  title?: string;
  date: Date | null;
  address?: string;
  _id: string;
}
export interface SalesInterface {
  edition: number;
  soldTo?: string;
  soldBy?: string;
  soldDate?: Date | null;
  sold?: boolean;
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
  price?: number;
  currentLocation?: string;
  editions?: number;
  mediaLinks?: any | [];
  notes?: string;
  exhibited: DisplayedInterface[];
  submission?: DisplayedInterface[];
  sales?: SalesInterface[];
  lastEdited?: Date | null;
  [item: string]: any;
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
  const { title, reference, collectionName, image, medium, price, size } =
    record;

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
      <Card className={classes.card}>
        <CardActionArea onClick={showRecordInfoDialogHandler}>
          {image![0].url !== '' && (
            <CardMedia
              className={classes.media}
              component='img'
              alt={title}
              image={image![0].url}
              title={title}
            />
          )}
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              className={classes.cardTitle}
            >
              {title}
            </Typography>
            <List className={classes.cardList}>
              {reference && (
                <ListItem className={classes.cardListItem}>
                  <ListItemText primary={`Reference: ${reference}`} />
                </ListItem>
              )}
              {collectionName && (
                <ListItem className={classes.cardListItem}>
                  <ListItemText primary={`Collection: ${collectionName}`} />
                </ListItem>
              )}
              {medium && (
                <ListItem className={classes.cardListItem}>
                  <ListItemText primary={`Medium: ${medium}`} />
                </ListItem>
              )}
              {size && (
                <ListItem className={classes.cardListItem}>
                  <ListItemText primary={`Size: ${size}`} />
                </ListItem>
              )}
              {price !== 0 && (
                <ListItem className={classes.cardListItem}>
                  <ListItemText primary={`Price: €${price}`} />
                </ListItem>
              )}
            </List>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
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
