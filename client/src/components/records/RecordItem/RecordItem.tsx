import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
//Material-UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
//Context
import RecordContext from '../../../context/record/RecordContext';
//icons
import EditIcon from '@material-ui/icons/Edit';
//Material-UI
import {
  CardActionArea,
  CardHeader,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

export interface RecordInterface {
  _id?: string;
  title?: string;
  artist?: string;
  reference?: string;
  collectionName?: string;
  image?: string;
  date?: Date | null;
  size?: string;
  medium?: string;
  price?: Number;
  currentLocation?: string;
  mediaLinks?: string;
  notes?: string;
  firstExhibitedDate?: Date | null;
  firstExhibitedTitle?: string;
  firstExhibitedAddress?: string;
  exhibited?: Array<Object>;
  submission?: Array<Object>;
  salesHistorySoldTo?: string;
  salesHistorySoldBy?: string;
  salesHistoryDateSold?: Date | null;
}

interface RecordItemProps {
  record: RecordInterface;
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
}

const RecordItemNew = ({ record, setDisplayAddRecord }: RecordItemProps) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const recordContext = useContext(RecordContext);
  const { setCurrent, clearCurrent } = recordContext;

  const toggleInfoModalHandler = () => setShowInfoModal(!showInfoModal);
  const scrollToTop = () => {
    document.documentElement.scrollTop = 110;
  };

  const editRecord = () => {
    setCurrent(record);
    setDisplayAddRecord(true);
    scrollToTop();
  };

  const getFormattedDate = (date) => {
    const dateStr = date.toString();

    return `${dateStr.substring(8, 10)}-${dateStr.substring(
      5,
      7
    )}-${dateStr.substring(0, 4)} `;
  };

  const {
    title,
    reference,
    collectionName,
    image,
    date,
    size,
    medium,
    price,
    currentLocation,
  } = record;

  return (
    <Card variant='outlined'>
      <CardActionArea onClick={toggleInfoModalHandler}>
        <CardMedia image={image} title={title} />
        <CardHeader>{title}</CardHeader>
        <CardContent>
          <Grid item xs={12} md={6}>
            <List>
              {reference && (
                <ListItem>
                  <ListItemText primary={`Ref: ${reference}`} />
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
                    primary={`CurrentLocation: ${currentLocation}`}
                  />
                </ListItem>
              )}
            </List>
          </Grid>
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
  );
};

export default RecordItemNew;
