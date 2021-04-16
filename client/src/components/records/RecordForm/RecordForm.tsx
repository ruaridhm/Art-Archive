import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import RecordContext from '../../../context/record/RecordContext';
import Button from '@material-ui/core/Button';
//Icons
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';

import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';

import useKey from '../../../hooks/useKey';
import {
  RecordFormContainer,
  FormHeader,
  IconContainer,
  FormHeaderText,
  RecordFormForm,
  ShowAllRecordFormForm,
  ShowAllRecordForm,
  RecordFormCloseButton,
  RecordFormButtonContainer,
  RecordFormCloseButtonIcon,
  RecordFormStepButtonContainer,
  RecordFormStepButton,
  ShowAllRecordFormStepButton,
  StepContainer,
} from './Style';
import { RecordInterface } from '../RecordItem/RecordItem';

const getFormattedCurrentDate = () => {
  const padDates = (dates) => {
    if (dates <= 9) {
      return `0${dates}`;
    }
    return dates.toString();
  };

  const todaysDate = new Date();
  let day = padDates(todaysDate.getDate());
  let month = padDates(todaysDate.getMonth());
  let year = todaysDate.getFullYear();

  return `${year}-${month}-${day}`;
};

const currentDate = getFormattedCurrentDate();

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
interface Step1Props {
  title?: string;
  artist?: string;
  reference?: string;
  collectionName?: string;
  image?: string;
  onChange: (e: any) => void;
}

const Step1 = ({
  title,
  artist,
  reference,
  collectionName,
  image,
  onChange,
}: Step1Props) => {
  return (
    <StepContainer>
      <TextField
        size='medium'
        variant='outlined'
        label='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Artist'
        name='artist'
        value={artist}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Ref'
        name='reference'
        value={reference}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Collection'
        name='collectionName'
        value={collectionName}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Image'
        name='image'
        value={image}
        onChange={onChange}
      />
    </StepContainer>
  );
};

interface Step2Props {
  date?: Date;
  size?: string;
  medium?: string;
  price?: Number;
  currentLocation?: string;
  onChange: (e: any) => void;
  handleDateChange: (date: Date | null, name: string) => void;
}

const Step2 = ({
  date,
  size,
  medium,
  price,
  currentLocation,
  onChange,
  handleDateChange,
}: Step2Props) => {
  return (
    <StepContainer>
      <KeyboardDatePicker
        margin='normal'
        id='date'
        label='Date'
        format='dd/MM/yyyy'
        value={date}
        onChange={() => {
          handleDateChange(date, 'date');
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />

      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Size'
        name='size'
        value={size}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Medium'
        name='medium'
        value={medium}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='number'
        label='Price'
        name='price'
        value={price}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Current Location'
        name='currentLocation'
        value={currentLocation}
        onChange={onChange}
      />
    </StepContainer>
  );
};

interface Step3Props {
  mediaLinks?: string;
  notes?: string;
  salesHistorySoldTo?: string;
  salesHistorySoldBy?: string;
  salesHistoryDateSold?: Date;
  onChange: (e: any) => void;
  handleDateChange: (date: Date | null, name: string) => void;
}

const Step3 = ({
  mediaLinks,
  notes,
  salesHistorySoldTo,
  salesHistorySoldBy,
  salesHistoryDateSold,
  onChange,
  handleDateChange,
}: Step3Props) => {
  return (
    <StepContainer>
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Media Links'
        name='mediaLinks'
        value={mediaLinks}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Notes'
        name='notes'
        value={notes}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Sold To'
        name='salesHistorySoldTo'
        value={salesHistorySoldTo}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Sold By'
        name='salesHistorySoldBy'
        value={salesHistorySoldBy}
        onChange={onChange}
      />
      <KeyboardDatePicker
        margin='normal'
        id='date-sold'
        label='Date Sold'
        format='MM/dd/yyyy'
        value={salesHistoryDateSold}
        onChange={() => {
          handleDateChange(salesHistoryDateSold, 'salesHistoryDateSold');
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </StepContainer>
  );
};

interface Step4Props {
  firstExhibitedDate?: Date;
  firstExhibitedTitle?: string;
  firstExhibitedAddress?: string;
  exhibited?: any;
  submission?: any;
  onChange: (e: any) => void;
  handleDateChange: (date: Date | null, name: string) => void;
}

const Step4 = ({
  firstExhibitedDate,
  firstExhibitedTitle,
  firstExhibitedAddress,
  exhibited,
  submission,
  onChange,
  handleDateChange,
}: Step4Props) => {
  return (
    <StepContainer>
      <KeyboardDatePicker
        margin='normal'
        id='date-first-exhibited'
        label='First Exhibition Date'
        format='MM/dd/yyyy'
        value={firstExhibitedDate}
        onChange={() => {
          handleDateChange(firstExhibitedDate, 'firstExhibitedDate');
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='First Exhibition Title'
        name='firstExhibitedTitle'
        value={firstExhibitedTitle}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='First Exhibition Address'
        name='firstExhibitedAddress'
        value={firstExhibitedAddress}
        onChange={onChange}
      />

      <KeyboardDatePicker
        margin='normal'
        id='submission-date'
        label='Submission Date'
        format='MM/dd/yyyy'
        value={submission.submissionDate}
        onChange={() => {
          handleDateChange(submission.submissionDate, 'submissionDate');
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />

      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Submission Exhibition Title'
        name='submissionExhibitionTitle'
        value={submission.submissionExhibitionTitle}
        onChange={onChange}
      />
      <TextField
        size='medium'
        variant='outlined'
        type='text'
        label='Submission Venue Address'
        name='submissionVenueAddress'
        value={submission.submissionVenueAddress}
        onChange={onChange}
      />
    </StepContainer>
  );
};

interface RecordFormProps {
  displayAddRecord: boolean;
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
}

const RecordForm = ({
  displayAddRecord,
  setDisplayAddRecord,
}: RecordFormProps) => {
  const recordContext = useContext(RecordContext);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { addRecord, current, clearCurrent, updateRecord } = recordContext;

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (windowWidth < 1100) {
      setShowAllSteps(false);
      setCurrentStep(1);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (current !== null) {
      setItem(current);
    } else {
      setItem(emptyItemObject);
    }
  }, [recordContext, current]);

  const [item, setItem] = useState<RecordInterface>(emptyItemObject);

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

  const onChange = (e: { target: { type: any; name: string; value: any } }) => {
    // if (e.target.type !== undefined && e.target.type === 'text') {
    setItem({ ...item, [e.target.name]: e.target.value });
    console.log('on change set item called');
    // }
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setItem({ ...item, [name]: date });
    console.log('date change set item called');
  };

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

  useKey('Escape', close);

  if (showAllSteps === true) {
    return (
      <RecordFormContainer>
        <ShowAllRecordFormForm onSubmit={onSubmit}>
          <FormHeader>
            <IconContainer></IconContainer>
            <FormHeaderText>
              {current ? 'Edit Item' : 'Add Item'}
            </FormHeaderText>
            <RecordFormCloseButton onClick={close}>
              <RecordFormCloseButtonIcon className='fas fa-times'></RecordFormCloseButtonIcon>
            </RecordFormCloseButton>
          </FormHeader>
          <ShowAllRecordForm>
            <Step1
              title={title}
              artist={artist}
              reference={reference}
              collectionName={collectionName}
              image={image}
              onChange={onChange}
            />

            <Step2
              date={date}
              size={size}
              medium={medium}
              price={price}
              currentLocation={currentLocation}
              onChange={onChange}
              handleDateChange={handleDateChange}
            />

            <Step3
              mediaLinks={mediaLinks}
              notes={notes}
              salesHistorySoldTo={salesHistorySoldTo}
              salesHistorySoldBy={salesHistorySoldBy}
              salesHistoryDateSold={salesHistoryDateSold}
              onChange={onChange}
              handleDateChange={handleDateChange}
            />

            <Step4
              firstExhibitedDate={firstExhibitedDate}
              firstExhibitedTitle={firstExhibitedTitle}
              firstExhibitedAddress={firstExhibitedAddress}
              exhibited={exhibited}
              submission={submission}
              onChange={onChange}
              handleDateChange={handleDateChange}
            />
          </ShowAllRecordForm>
          <RecordFormStepButtonContainer>
            <RecordFormStepButton
              onClick={() => {
                setShowAllSteps(!showAllSteps);
                setCurrentStep(1);
              }}
              type='button'
              aria-label='Show all steps'
            >
              All
            </RecordFormStepButton>
          </RecordFormStepButtonContainer>
          <RecordFormButtonContainer>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={clearAll}
              startIcon={current ? <UpdateIcon /> : <AddIcon />}
            >
              {current ? 'Update Item' : 'Add Item'}
            </Button>

            {current && (
              <Button
                variant='contained'
                color='secondary'
                startIcon={<ClearAllIcon />}
                onClick={clearAll}
              >
                Clear
              </Button>
            )}
          </RecordFormButtonContainer>
        </ShowAllRecordFormForm>
      </RecordFormContainer>
    );
  } else if (showAllSteps === false) {
    return (
      <RecordFormContainer>
        <RecordFormForm onSubmit={onSubmit}>
          <FormHeader>
            <IconContainer></IconContainer>
            <FormHeaderText>
              {current ? 'Edit Item' : 'Add Item'}
            </FormHeaderText>
            <RecordFormCloseButton onClick={close}>
              <RecordFormCloseButtonIcon className='fas fa-times'></RecordFormCloseButtonIcon>
            </RecordFormCloseButton>
          </FormHeader>
          {currentStep === 1 ? (
            <Step1
              title={title}
              artist={artist}
              reference={reference}
              collectionName={collectionName}
              image={image}
              onChange={onChange}
            />
          ) : currentStep === 2 ? (
            <Step2
              date={date}
              size={size}
              medium={medium}
              price={price}
              currentLocation={currentLocation}
              onChange={onChange}
              handleDateChange={handleDateChange}
            />
          ) : currentStep === 3 ? (
            <Step3
              mediaLinks={mediaLinks}
              notes={notes}
              salesHistorySoldTo={salesHistorySoldTo}
              salesHistorySoldBy={salesHistorySoldBy}
              salesHistoryDateSold={salesHistoryDateSold}
              onChange={onChange}
              handleDateChange={handleDateChange}
            />
          ) : currentStep === 4 ? (
            <Step4
              firstExhibitedDate={firstExhibitedDate}
              firstExhibitedTitle={firstExhibitedTitle}
              firstExhibitedAddress={firstExhibitedAddress}
              exhibited={exhibited}
              submission={submission}
              onChange={onChange}
              handleDateChange={handleDateChange}
            />
          ) : null}

          <RecordFormStepButtonContainer>
            <RecordFormStepButton
              onClick={() => {
                setCurrentStep(1);
              }}
              type='button'
              aria-label='Form Step 1'
            >
              1
            </RecordFormStepButton>
            <RecordFormStepButton
              onClick={() => {
                setCurrentStep(2);
              }}
              type='button'
              aria-label='Form Step 2'
            >
              2
            </RecordFormStepButton>
            <RecordFormStepButton
              onClick={() => {
                setCurrentStep(3);
              }}
              type='button'
              aria-label='Form Step 3'
            >
              3
            </RecordFormStepButton>
            <RecordFormStepButton
              onClick={() => {
                setCurrentStep(4);
              }}
              type='button'
              aria-label='Form Step 4'
            >
              4
            </RecordFormStepButton>

            <ShowAllRecordFormStepButton
              onClick={() => {
                setShowAllSteps(!showAllSteps);
                setCurrentStep(null);
              }}
              type='button'
              aria-label='Show all steps'
            >
              All
            </ShowAllRecordFormStepButton>
          </RecordFormStepButtonContainer>
          <RecordFormButtonContainer>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              startIcon={current ? <UpdateIcon /> : <AddIcon />}
              onClick={clearAll}
            >
              {current ? 'Update Item' : 'Add Item'}
            </Button>
            {current && (
              <Button
                variant='contained'
                color='secondary'
                startIcon={<ClearAllIcon />}
                onClick={clearAll}
              >
                Clear
              </Button>
            )}
          </RecordFormButtonContainer>
        </RecordFormForm>
      </RecordFormContainer>
    );
  }
};

export default RecordForm;
