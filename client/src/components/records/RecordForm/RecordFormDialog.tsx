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
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  FormGroup,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
//Material-UI Icons
import CloseIcon from '@material-ui/icons/Close';
//Components
import ImageDialog from './ImageDialog';
//Util functions
import PopulateAutoComplete from '../../../utils/populateAutoComplete';
//Types
import { RecordInterface } from '../RecordItem/RecordItem';
import AutoCompleteTextField from './AutoCompleteTextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
interface RecordFormProps {
  displayAddRecord: boolean;
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles(() => ({
  formGroup: {
    alignItems: 'center',
    marginBottom: '8px',
  },
  marginTopLeft: {
    marginTop: '0px',
    marginLeft: '8px',
    marginBottom: '0px',
  },
  marginLeft: {
    marginLeft: '8px',
  },
  minWidth: {
    width: '300px',
  },
  widthAndVerticalMargins: {
    width: '300px',
    marginTop: '0px',
    marginBottom: '0px',
  },
  verticalMargins: {
    marginTop: '0px',
    marginBottom: '0px',
  },
}));

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
  mediaLinks: [],
  notes: '',
  exhibited: [],
  submission: [],
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
  // const [newMediaLinks, setnewMediaLinks] = useState({
  //   title: '',
  //   address: '',
  // });
  // const [newExhibited, setNewExhibited] = useState({
  //   title: '',
  //   date: null,
  //   address: '',
  // });
  // const [newSubmission, setnewSubmission] = useState({
  //   title: '',
  //   date: null,
  //   address: '',
  // });
  // const [exhibitedDate, setExhibitedDate] = useState<Date | null>(null);
  // const [submissionDate, setSubmissionDate] = useState<Date | null>(null);
  // const [soldDate, setSoldDate] = useState<Date | null>(item!.sales!.soldDate!);
  const autoCompleteOptions = PopulateAutoComplete();

  const classes = useStyles();

  //Destructuring of Item object
  const {
    title,
    reference,
    collectionName,
    // image,
    date,
    size,
    medium,
    price,
    currentLocation,
    editions,
    // mediaLinks,
    notes,
    // exhibited,
    // submission,
    // sales,
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

  const handleAutocompleteChange = (
    value: string,
    category: string,
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
      } else {
        setItem({
          ...item,
          [category]: { ...item[category], [subCategory]: value },
        });
      }
    } else {
      setItem({ ...item, [category]: value });
    }
  };

  // const handleDropzoneChange = (files: File[]) => {};

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (current === null) {
      addRecord(item);
      setDisplayAddRecord(false);
    } else {
      updateRecord(item);
      clearCurrent();
      setDisplayAddRecord(false);
    }
  };

  // const clearAll = () => {
  //   clearCurrent();
  // };

  const close = () => {
    setDisplayAddRecord(!displayAddRecord);
  };

  // useEffect(() => {
  //   if (
  //     exhibitedDate !== null &&
  //     exhibitedDate!.getTime() === exhibitedDate!.getTime()
  //   ) {
  //     setItem((prevItem) => {
  //       return {
  //         ...prevItem,
  //         exhibited: [
  //           {
  //             ...prevItem.exhibited[0],
  //             date: exhibitedDate,
  //           },
  //         ],
  //       };
  //     });
  //   }
  // }, [exhibitedDate]);
  // useEffect(() => {
  //   if (
  //     submissionDate !== null &&
  //     submissionDate?.getTime() === submissionDate?.getTime()
  //   ) {
  //     setItem((prevItem) => {
  //       return {
  //         ...prevItem,
  //         submission: [
  //           {
  //             ...prevItem.submission[0],
  //             date: submissionDate,
  //           },
  //         ],
  //       };
  //     });
  //   }
  // }, [submissionDate]);

  // useEffect(() => {
  //   if (soldDate !== null && soldDate?.getTime() === soldDate?.getTime()) {
  //     setItem((prevItem) => {
  //       return {
  //         ...prevItem,
  //         sales: {
  //           ...prevItem.sales,
  //           soldDate: soldDate,
  //         },
  //       };
  //     });
  //   }
  // }, [soldDate]);

  // const handleExhibitedDateChange = (date: Date | null) => {
  //   setExhibitedDate(date);
  // };
  // const handleSubmissionDateChange = (date: Date | null) => {
  //   setSubmissionDate(date);
  // };

  // const handleSoldDateChange = (date: Date | null) => {
  //   setSoldDate(date);
  // };
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
          <FormGroup row={true} className={classes.formGroup}>
            <AutoCompleteTextField
              id='title-text-field'
              label='Title'
              autocompleteOptions={autoCompleteOptions.title}
              value={title}
              onChange={handleAutocompleteChange}
              name='title'
            />
            <TextField
              className={classes.marginTopLeft}
              style={{ width: 300 }}
              label='Reference'
              variant='outlined'
              margin='normal'
              type='text'
              name='reference'
              value={reference}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup row={true} className={classes.formGroup}>
            <AutoCompleteTextField
              id='collection-text-field'
              label='Collection'
              autocompleteOptions={autoCompleteOptions.collectionName}
              value={collectionName}
              onChange={handleAutocompleteChange}
              name='collectionName'
            />
            <AutoCompleteTextField
              className={classes.marginLeft}
              id='current-location-text-field'
              label='Current Location'
              autocompleteOptions={autoCompleteOptions.currentLocation}
              value={currentLocation}
              onChange={handleAutocompleteChange}
              name='currentLocation'
            />
          </FormGroup>
          <FormGroup row={true} className={classes.formGroup}>
            <AutoCompleteTextField
              id='size-text-field'
              label='Size'
              autocompleteOptions={autoCompleteOptions.size}
              value={size}
              onChange={handleAutocompleteChange}
              name='size'
            />
            <AutoCompleteTextField
              className={classes.marginLeft}
              id='medium-text-field'
              label='Medium'
              autocompleteOptions={autoCompleteOptions.medium}
              value={medium}
              onChange={handleAutocompleteChange}
              name='medium'
            />
          </FormGroup>
          <FormGroup row={true} className={classes.formGroup}>
            <KeyboardDatePicker
              className={classes.widthAndVerticalMargins}
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
          </FormGroup>
          <FormGroup row={true} className={classes.formGroup}>
            <TextField
              className={classes.widthAndVerticalMargins}
              label='Price'
              variant='outlined'
              margin='normal'
              type='number'
              name='price'
              value={price}
              onChange={onChange}
            />

            <TextField
              style={{ width: 300 }}
              className={`${classes.marginLeft} ${classes.widthAndVerticalMargins}`}
              label='Editions'
              variant='outlined'
              margin='normal'
              type='number'
              name='editions'
              value={editions}
              onChange={onChange}
            />
          </FormGroup>
          {/* <Typography variant='subtitle1'>Exhibitions</Typography>
          <FormGroup row={true} className={classes.formGroup}>
            <AutoCompleteTextField
              id='exhibited-title-text-field'
              label='Exhibited Title'
              autocompleteOptions={autoCompleteOptions.exhibited.title}
              value={newExhibited.title}
              onChange={handleAutocompleteChange}
              name='exhibited'
              subName='title'
            />
            <AutoCompleteTextField
              className={classes.marginLeft}
              id='exhibited-address-text-field'
              label='Exhibited Address'
              autocompleteOptions={autoCompleteOptions.exhibited.address}
              value={newExhibited.address}
              onChange={handleAutocompleteChange}
              name='exhibited'
              subName='address'
            />
            <KeyboardDatePicker
              className={classes.marginTopLeft}
              label='Exhibited Date'
              margin='normal'
              format='dd/MM/yyyy'
              value={newExhibited.date}
              inputVariant='outlined'
              onChange={(date) => handleExhibitedDateChange(date)}
              KeyboardButtonProps={{
                'aria-label': 'change exhibited date',
              }}
            />
          </FormGroup>
          <Typography variant='subtitle1'>Submissions</Typography>
          <FormGroup row={true} className={classes.formGroup}>
            <AutoCompleteTextField
              id='submission-title-text-field'
              label='Submission Title'
              autocompleteOptions={autoCompleteOptions.submission.title}
              value={newSubmission.title}
              onChange={handleAutocompleteChange}
              name='submission'
              subName='title'
            />
            <AutoCompleteTextField
              className={classes.marginLeft}
              id='submission-address-text-field'
              label='Submission Address'
              autocompleteOptions={autoCompleteOptions.submission.address}
              value={newSubmission.address}
              onChange={handleAutocompleteChange}
              name='submission'
              subName='address'
            />
            <KeyboardDatePicker
              className={classes.marginTopLeft}
              label='Submission Date'
              margin='normal'
              format='dd/MM/yyyy'
              value={newSubmission.date}
              inputVariant='outlined'
              onChange={(date) => handleSubmissionDateChange(date)}
              KeyboardButtonProps={{
                'aria-label': 'change exhibited date',
              }}
            />
          </FormGroup>
          <Typography variant='subtitle1'>Sales</Typography>
          <FormGroup row={true} className={classes.formGroup}>
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
              className={classes.marginLeft}
              id='sold-by-text-field'
              label='Sold By'
              autocompleteOptions={autoCompleteOptions.sales.soldBy}
              value={sales.soldBy}
              onChange={handleAutocompleteChange}
              name='sales'
              subName='soldBy'
            />
            <KeyboardDatePicker
              className={classes.marginTopLeft}
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
          </FormGroup>
          <Typography variant='subtitle1'>Media Links</Typography>
          <FormGroup row={true} className={classes.formGroup}> */}
          {/* <AutoCompleteTextField
              id='media-link-text-field'
              label='Media Link Title'
              autocompleteOptions={autoCompleteOptions.mediaLinks.title}
              value={newMediaLinks.title}
              onChange={handleAutocompleteChange}
              name='mediaLinks'
              subName='title'
            />

            <AutoCompleteTextField
              className={classes.marginLeft}
              id='media-link-address-field'
              label='Media Link Address'
              autocompleteOptions={autoCompleteOptions.mediaLinks.address}
              value={newMediaLinks.address}
              onChange={handleAutocompleteChange}
              name='mediaLinks'
              subName='address'
            />
          </FormGroup> */}
          <FormGroup row={true} className={classes.formGroup}>
            <TextField
              className={classes.verticalMargins}
              fullWidth={true}
              label='Notes'
              variant='outlined'
              margin='normal'
              type='text'
              name='notes'
              value={notes}
              onChange={onChange}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <ImageDialog />
          <Button type='submit' variant='contained' color='primary'>
            {current ? 'Update Item' : 'Add Item'}
          </Button>

          {/* {!current && (
            <Button variant='contained' onClick={clearAll} color='secondary'>
              Clear
            </Button>
          )} */}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RecordFormDialog;
