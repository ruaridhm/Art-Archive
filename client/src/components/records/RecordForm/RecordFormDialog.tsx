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
import Container from '@material-ui/core/Container/Container';

import PopulateAutoComplete from '../../../utils/populateAutoComplete';

//Material-UI Icons
import CloseIcon from '@material-ui/icons/Close';
//Types
import { RecordInterface } from '../RecordItem/RecordItem';
import AutoCompleteTextField from './AutoCompleteTextField';
import setWeekYearWithOptions from 'date-fns/esm/fp/setWeekYearWithOptions/index.js';

interface RecordFormProps {
  displayAddRecord: boolean;
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
}

const emptyItemObject: RecordInterface = {
  title: '',
  artist: 'Ed Miliano',
  reference: '',
  collectionName: '',
  image: [{ url: '' }],
  date: null,
  size: '',
  medium: '',
  price: 0,
  currentLocation: '',
  editions: 1,
  mediaLinks: [{ title: '', address: '' }],
  notes: '',
  exhibited: [{ title: '', date: null, address: '' }],
  submission: [{ title: '', date: null, address: '' }],
  sales: {
    soldTo: '',
    soldBy: '',
    soldDate: null,
    sold: false,
  },
  lastEdited: null,
};

const RecordFormDialog = ({
  displayAddRecord,
  setDisplayAddRecord,
}: RecordFormProps) => {
  const recordContext = useContext(RecordContext);
  const { addRecord, current, clearCurrent, updateRecord } = recordContext;
  const [item, setItem] = useState(emptyItemObject);
  const [exhibitedDate, setExhibitedDate] = useState(item.exhibited[0].date);
  const [submissionDate, setSubmissionDate] = useState(item.submission[0].date);
  const [soldDate, setSoldDate] = useState(item.sales.soldDate);
  const autoCompleteOptions = PopulateAutoComplete();

  //Destructuring of Item object
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
    editions,
    mediaLinks,
    notes,
    exhibited,
    submission,
    sales,
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
    // console.log(e);
    // if (e.target.type !== undefined && e.target.type === 'text') {
    setItem({ ...item, [e.target.name]: e.target.value });
    // }
  };

  const handleAutocompleteChange = (
    value,
    category,
    subCategory = 'noName'
  ) => {
    if (subCategory !== 'noName') {
      if (Array.isArray(item[category])) {
        setItem({
          ...item,
          [category]: [
            {
              ...item[category][0],
              [subCategory]: value,
            },
          ],
        });
        console.log(item);
      } else {
        setItem({
          ...item,
          [category]: { ...item[category], [subCategory]: value },
        });

        console.log(item);
      }
    } else {
      setItem({ ...item, [category]: value });
    }
  };

  const handleDateChange = (date: Date | null, label: string) => {
    console.log('handleDateChange called');
    setItem({ ...item, [label]: date });
  };

  const handleDropzoneChange = (files: File[]) => {};

  const onSubmit = (e: { preventDefault: () => void }) => {
    console.log('onSubmit called');
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

  useEffect(() => {
    if (
      exhibitedDate !== null &&
      exhibitedDate.getTime() === exhibitedDate.getTime()
    ) {
      setItem({
        ...item,
        exhibited: [
          {
            ...item.exhibited[0],
            date: exhibitedDate,
          },
        ],
      });
    }
  }, [exhibitedDate]);
  useEffect(() => {
    if (
      submissionDate !== null &&
      submissionDate.getTime() === submissionDate.getTime()
    ) {
      setItem({
        ...item,
        submission: [
          {
            ...item.submission[0],
            date: submissionDate,
          },
        ],
      });
    }
  }, [submissionDate]);

  useEffect(() => {
    if (soldDate !== null && soldDate.getTime() === soldDate.getTime()) {
      setItem({
        ...item,
        sales: {
          ...item.sales,
          soldDate: soldDate,
        },
      });
    }
  }, [soldDate]);

  const handleExhibitedDateChange = (date: Date | null) => {
    setExhibitedDate(date);
  };
  const handleSubmissionDateChange = (date: Date | null) => {
    setSubmissionDate(date);
  };

  const handleSoldDateChange = (date: Date | null) => {
    setSoldDate(date);
  };
  return (
    <Dialog
      open={displayAddRecord}
      onClose={close}
      aria-labelledby='add-record-dialog'
      fullWidth={true}
      maxWidth='md'
    >
      <>
        <DialogTitle id='add-record-dialog-title'>
          {current ? 'Edit Item' : 'Add Item'}
        </DialogTitle>
        <IconButton
          style={{ right: '12px', top: '8px', position: 'absolute' }}
          onClick={close}
        >
          <CloseIcon />
        </IconButton>
      </>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmit}
      >
        <DialogContent>
          <AutoCompleteTextField
            id='title-text-field'
            label='Title'
            autocompleteOptions={autoCompleteOptions.title}
            value={title}
            onChange={handleAutocompleteChange}
            name='title'
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
          <AutoCompleteTextField
            id='collection-text-field'
            label='Collection'
            autocompleteOptions={autoCompleteOptions.collectionName}
            value={collectionName}
            onChange={handleAutocompleteChange}
            name='collectionName'
          />
          <KeyboardDatePicker
            label='Date'
            margin='normal'
            format='dd/MM/yyyy'
            value={date}
            inputVariant='outlined'
            onChange={(date) => setItem({ ...item, date: date })}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <AutoCompleteTextField
            id='size-text-field'
            label='Size'
            autocompleteOptions={autoCompleteOptions.size}
            value={size}
            onChange={handleAutocompleteChange}
            name='size'
          />
          <AutoCompleteTextField
            id='medium-text-field'
            label='Medium'
            autocompleteOptions={autoCompleteOptions.medium}
            value={medium}
            onChange={handleAutocompleteChange}
            name='medium'
          />
          <AutoCompleteTextField
            id='current-location-text-field'
            label='Current Location'
            autocompleteOptions={autoCompleteOptions.currentLocation}
            value={currentLocation}
            onChange={handleAutocompleteChange}
            name='currentLocation'
          />
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
            label='Editions'
            variant='outlined'
            margin='normal'
            type='number'
            name='editions'
            value={editions}
            onChange={onChange}
          />
          <Container>
            <AutoCompleteTextField
              id='exhibited-title-text-field'
              label='Exhibited Title'
              autocompleteOptions={autoCompleteOptions.exhibited.title}
              value={exhibited[0].title}
              onChange={handleAutocompleteChange}
              name='exhibited'
              subName='title'
            />
            <AutoCompleteTextField
              id='exhibited-address-text-field'
              label='Exhibited Address'
              autocompleteOptions={autoCompleteOptions.exhibited.address}
              value={exhibited[0].address}
              onChange={handleAutocompleteChange}
              name='exhibited'
              subName='address'
            />
            <KeyboardDatePicker
              label='Exhibited Date'
              margin='normal'
              format='dd/MM/yyyy'
              value={exhibitedDate}
              inputVariant='outlined'
              onChange={(date) => handleExhibitedDateChange(date)}
              KeyboardButtonProps={{
                'aria-label': 'change exhibited date',
              }}
            />
          </Container>
          <Container>
            <AutoCompleteTextField
              id='submission-title-text-field'
              label='Submission Title'
              autocompleteOptions={autoCompleteOptions.submission.title}
              value={submission[0].title}
              onChange={handleAutocompleteChange}
              name='submission'
              subName='title'
            />
            <AutoCompleteTextField
              id='submission-address-text-field'
              label='Submission Address'
              autocompleteOptions={autoCompleteOptions.submission.address}
              value={submission[0].address}
              onChange={handleAutocompleteChange}
              name='submission'
              subName='address'
            />
            <KeyboardDatePicker
              label='Submission Date'
              margin='normal'
              format='dd/MM/yyyy'
              value={submission[0].date}
              inputVariant='outlined'
              onChange={(date) => handleSubmissionDateChange(date)}
              KeyboardButtonProps={{
                'aria-label': 'change exhibited date',
              }}
            />
          </Container>
          <Container>
            <AutoCompleteTextField
              id='sold-to-text-field'
              label='Sold To'
              autocompleteOptions={autoCompleteOptions.sales.soldTo}
              value={sales.soldTo}
              onChange={handleAutocompleteChange}
              name='sales'
              subName='soldTo'
            />
            <AutoCompleteTextField
              id='sold-by-text-field'
              label='Sold By'
              autocompleteOptions={autoCompleteOptions.sales.soldBy}
              value={sales.soldBy}
              onChange={handleAutocompleteChange}
              name='sales'
              subName='soldBy'
            />
            <KeyboardDatePicker
              label='Date Sold'
              margin='normal'
              format='dd/MM/yyyy'
              value={sales['soldDate']}
              inputVariant='outlined'
              onChange={(date) => handleSoldDateChange(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date sold',
              }}
            />
          </Container>
          <Container>
            <AutoCompleteTextField
              id='media-link-text-field'
              label='Media Link Title'
              autocompleteOptions={autoCompleteOptions.mediaLinks.title}
              value={mediaLinks[0].title}
              onChange={handleAutocompleteChange}
              name='mediaLinks'
              subName='title'
            />

            <AutoCompleteTextField
              id='media-link-address-field'
              label='Media Link Address'
              autocompleteOptions={autoCompleteOptions.mediaLinks.address}
              value={mediaLinks[0].address}
              onChange={handleAutocompleteChange}
              name='mediaLinks'
              subName='address'
            />
          </Container>
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
          <Container>
            <ImageDialog />
          </Container>
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
      </form>
    </Dialog>
  );
};

export default RecordFormDialog;
