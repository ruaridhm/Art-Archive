import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
//Context
import RecordContext from '../../../context/record/RecordContext';
import AlertContext from '../../../context/alert/AlertContext';
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
import { RecordInterface, SalesInterface } from '../RecordItem/RecordItem';
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
  exhibitions: [],
  submissions: [],
  sales: [],
  lastEdited: null,
};

const RecordFormDialog = ({
  displayAddRecord,
  setDisplayAddRecord,
}: RecordFormProps) => {
  const alertContext = useContext(AlertContext);
  const recordContext = useContext(RecordContext);
  const { setAlert } = alertContext;
  const { addRecord, current, clearCurrent, updateRecord } = recordContext;
  const [item, setItem] = useState(emptyItemObject);
  const autoCompleteOptions = PopulateAutoComplete();

  const classes = useStyles();

  //Destructuring of Item object
  const {
    title,
    reference,
    collectionName,

    date,
    size,
    medium,
    price,
    currentLocation,
    editions,

    notes,
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

  const onChangeEditions = (e: {
    target: { type: any; name: string; value: any };
  }) => {
    //set number of editions
    let tempVar = e.target.value;
    if (tempVar >= 1000) {
      tempVar = 1000;
    } else if (tempVar < 1) {
      tempVar = 1;
    }
    setItem({
      ...item,
      editions: tempVar,
    });
  };

  const newCalcSalesArrFcn = (editions: number) => {
    let tempArr: SalesInterface[] = [];
    if (item.sales!.length !== 0) {
      tempArr = [...item.sales!];
    }

    if (item.sales!.length === 0) {
      for (let i = 0; i < editions; i++) {
        tempArr.push({
          edition: i + 1,
          soldTo: '',
          soldBy: '',
          soldDate: null,
          sold: false,
        });
      }
      return tempArr;
    } else if (editions >= item.sales!.length) {
      let numberOfExistingSalesObjects = item.sales!.length;

      for (let i = numberOfExistingSalesObjects; i < editions!; i++) {
        tempArr.push({
          edition: i,
          soldTo: '',
          soldBy: '',
          soldDate: null,
          sold: false,
        });
      }
      return tempArr;
    } else if (editions < item.sales!.length) {
      setAlert(
        'Reducing the number of editions may cause sales data to be lost',
        'danger'
      );

      return tempArr.slice(0, editions);
    }
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

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newItem: RecordInterface = {
      ...item,
      sales: newCalcSalesArrFcn(editions!),
    };
    setItem({
      ...newItem,
    });

    if (current === null) {
      addRecord(newItem);
      setDisplayAddRecord(false);
    } else {
      updateRecord(newItem);
      clearCurrent();
      setDisplayAddRecord(false);
    }
  };

  const close = () => {
    setDisplayAddRecord(!displayAddRecord);
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
              onChange={onChangeEditions}
            />
          </FormGroup>

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
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RecordFormDialog;
