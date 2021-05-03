import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
//Context
import RecordContext from '../../../context/record/RecordContext';
//Material-UI Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ImageDialog from './ImageDialog';
import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container/Container';

//Material-UI Icons
import CloseIcon from '@material-ui/icons/Close';
//Types
import { RecordInterface } from '../RecordItem/RecordItem';

interface RecordFormProps {
  displayAddRecord: boolean;
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
}

const emptyItemObject = {
  title: '',
  artist: 'Ed Miliano',
  reference: '',
  collectionName: '',
  image: '',
  date: null,
  size: '',
  medium: '',
  price: 0,
  currentLocation: '',
  editions: 1,
  mediaLinks: '',
  notes: '',
  firstExhibitedDate: null,
  firstExhibitedTitle: '',
  firstExhibitedAddress: '',
  exhibited: [],
  submission: [],
  salesHistorySoldTo: '',
  salesHistorySoldBy: '',
  salesHistoryDateSold: null,
};

const RecordFormDialog = ({
  displayAddRecord,
  setDisplayAddRecord,
}: RecordFormProps) => {
  const recordContext = useContext(RecordContext);
  const { addRecord, current, clearCurrent, updateRecord } = recordContext;
  const [item, setItem] = useState<RecordInterface>(emptyItemObject);

  //Destructuring of Item object
  const {
    title,
    artist,
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
    firstExhibitedDate,
    firstExhibitedTitle,
    firstExhibitedAddress,
    exhibited,
    submission,
    salesHistorySoldTo,
    salesHistorySoldBy,
    salesHistoryDateSold,
  } = item;

  //if a record is in current assign current to item else initialize item as an empty object
  useEffect(() => {
    if (current !== null) {
      setItem(current);
    } else {
      setItem(emptyItemObject);
    }
  }, [recordContext, current]);

  //Functions

  const onChange = (e: { target: { type: any; name: string; value: any } }) => {
    // if (e.target.type !== undefined && e.target.type === 'text') {
    setItem({ ...item, [e.target.name]: e.target.value });
    // }
  };
  const handleDateChange = (date: Date | null, label: string) => {
    console.log('date = ', date);
    console.log('label = ', label);
    if (date !== null) {
      setItem({ ...item, [label]: date });
    }
  };

  const handleDropzoneChange = (files: File[]) => {};

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (current === null) {
      addRecord(item);
    } else {
      updateRecord(item);
      clearCurrent();
      setDisplayAddRecord(false);
    }
  };

  const clearAll = () => {
    clearCurrent();
  };

  const close = () => {
    setDisplayAddRecord(!displayAddRecord);
  };

  return (
    <Dialog
      open={displayAddRecord}
      onClose={setDisplayAddRecord}
      aria-labelledby='add-record-dialog'
      fullWidth={true}
      maxWidth='md'
    >
      <DialogTitle id='add-record-dialog-title'>
        {current ? 'Edit Item' : 'Add Item'}
      </DialogTitle>
      <DialogContent>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmit}
        >
          <TextField
            label='Title'
            variant='outlined'
            margin='normal'
            type='text'
            name='title'
            value={title}
            onChange={onChange}
            autoComplete='true'
          />
          <TextField
            label='Artist'
            variant='outlined'
            margin='normal'
            type='text'
            name='artist'
            value={artist}
            onChange={onChange}
          />
          <TextField
            label='Reference'
            variant='outlined'
            margin='normal'
            type='text'
            name='reference'
            value={reference}
            onChange={onChange}
          />
          <TextField
            label='Collection'
            variant='outlined'
            margin='normal'
            type='text'
            name='collectionName'
            value={collectionName}
            onChange={onChange}
          />

          <KeyboardDatePicker
            label='Date'
            margin='normal'
            format='dd/MM/yyyy'
            value={date}
            inputVariant='outlined'
            onChange={() => {
              handleDateChange(date, 'date');
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <Container>
            <TextField
              label='Size'
              variant='outlined'
              margin='normal'
              type='text'
              name='size'
              value={size}
              onChange={onChange}
            />
            <TextField
              label='Medium'
              variant='outlined'
              margin='normal'
              type='text'
              name='medium'
              value={medium}
              onChange={onChange}
            />
          </Container>
          <TextField
            label='Price'
            variant='outlined'
            margin='normal'
            type='number'
            name='price'
            value={price}
            onChange={onChange}
          />

          <TextField
            label='Current Location'
            variant='outlined'
            margin='normal'
            type='text'
            name='currentLocation'
            value={currentLocation}
            onChange={onChange}
          />
          <TextField
            label='Editions'
            variant='outlined'
            margin='normal'
            type='number'
            name='editions'
            value={editions}
            onChange={onChange}
          />
          <Container>
            <TextField
              label='Exhibition Title'
              variant='outlined'
              margin='normal'
              type='text'
              name='exhibitionTitle'
              value={exhibited[0].title}
              onChange={onChange}
            />
            <KeyboardDatePicker
              label='Exhibition Date'
              margin='normal'
              format='dd/MM/yyyy'
              value={exhibited[0].date}
              inputVariant='outlined'
              onChange={() => {
                handleDateChange(exhibition.date, 'exhibitionDate');
              }}
              KeyboardButtonProps={{
                'aria-label': 'change exhibited date',
              }}
            />
            <TextField
              label='Exhibition Address'
              variant='outlined'
              margin='normal'
              type='text'
              name='exhibitionAddress'
              value={exhibited[0].address}
              onChange={onChange}
            />
          </Container>
          <Container>
            <TextField
              label='Submission Title'
              variant='outlined'
              margin='normal'
              type='text'
              name='submissionTitle'
              value={submission[0].title}
              onChange={onChange}
            />
            <KeyboardDatePicker
              label='Submission Date'
              margin='normal'
              format='dd/MM/yyyy'
              value={submission[0].date}
              inputVariant='outlined'
              onChange={() => {
                handleDateChange(submission.date, 'submissionDate');
              }}
              KeyboardButtonProps={{
                'aria-label': 'change exhibited date',
              }}
            />
            <TextField
              label='Submission Address'
              variant='outlined'
              margin='normal'
              type='text'
              name='submissionAddress'
              value={submission[0].address}
              onChange={onChange}
            />
          </Container>
          <Container>
            <TextField
              label='Sold To'
              variant='outlined'
              margin='normal'
              type='text'
              name='salesHistorySoldTo'
              value={salesHistorySoldTo}
              onChange={onChange}
            />

            <TextField
              label='Sold By'
              variant='outlined'
              margin='normal'
              type='text'
              name='salesHistorySoldBy'
              value={salesHistorySoldBy}
              onChange={onChange}
            />

            <KeyboardDatePicker
              label='Date Sold'
              margin='normal'
              format='dd/MM/yyyy'
              value={salesHistoryDateSold}
              inputVariant='outlined'
              onChange={() => {
                handleDateChange(salesHistoryDateSold, 'salesHistoryDateSold');
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date sold',
              }}
            />
          </Container>

          <Container>
            <TextField
              label='Media Links'
              variant='outlined'
              margin='normal'
              type='text'
              name='mediaLinks'
              value={mediaLinks}
              onChange={onChange}
              multiline
            />
            <TextField
              label='Notes'
              variant='outlined'
              margin='normal'
              type='text'
              name='notes'
              value={notes}
              onChange={onChange}
              multiline
            />
          </Container>
          <Container>
            <ImageDialog />
          </Container>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type='submit' variant='contained' color='primary'>
          {current ? 'Update Item' : 'Add Item'}
        </Button>

        {current && (
          <Button variant='contained' onClick={clearAll} color='secondary'>
            Clear
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RecordFormDialog;
