import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import RecordContext from '../../../context/record/RecordContext';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
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
  RecordFormStepButtonContainer,
  StepContainer,
} from './Style';
import { RecordInterface } from '../RecordItem/RecordItem';

import CloseIcon from '@material-ui/icons/Close';

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
        label='Title'
        variant='outlined'
        type='text'
        name='title'
        value={title}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='Artist'
        name='artist'
        value={artist}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='Ref'
        name='reference'
        value={reference}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='Collection'
        name='collectionName'
        value={collectionName}
        onChange={onChange}
      />
      <TextField
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
  date?: Date | string;
  size?: string;
  medium?: string;
  price?: Number;
  currentLocation?: string;
  onChange: (e: any) => void;
}

const Step2 = ({
  date,
  size,
  medium,
  price,
  currentLocation,
  onChange,
}: Step2Props) => {
  return (
    <StepContainer>
      <TextField
        variant='outlined'
        type='date'
        label='Date'
        name='date'
        value={date}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='Size'
        name='size'
        value={size}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='Medium'
        name='medium'
        value={medium}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='number'
        label='Price'
        name='price'
        value={price}
        onChange={onChange}
      />
      <TextField
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
}

const Step3 = ({
  mediaLinks,
  notes,
  salesHistorySoldTo,
  salesHistorySoldBy,
  salesHistoryDateSold,
  onChange,
}: Step3Props) => {
  return (
    <StepContainer>
      <TextField
        multiline
        variant='outlined'
        type='text'
        label='Media Links'
        name='mediaLinks'
        value={mediaLinks}
        onChange={onChange}
      />
      <TextField
        multiline
        variant='outlined'
        type='text'
        label='Notes'
        name='notes'
        value={notes}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='Sold To'
        name='salesHistorySoldTo'
        value={salesHistorySoldTo}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='Sold By'
        name='salesHistorySoldBy'
        value={salesHistorySoldBy}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='date'
        label='Date Sold'
        name='salesHistoryDateSold'
        value={salesHistoryDateSold}
        onChange={onChange}
      />
    </StepContainer>
  );
};

interface Step4Props {
  firstExhibitedDate?: Date | null;
  firstExhibitedTitle?: string;
  firstExhibitedAddress?: string;
  exhibited?: any;
  submission?: any;
  onChange: (e: any) => void;
}

const Step4 = ({
  firstExhibitedDate,
  firstExhibitedTitle,
  firstExhibitedAddress,
  exhibited,
  submission,
  onChange,
}: Step4Props) => {
  return (
    <StepContainer>
      <TextField
        variant='outlined'
        type='date'
        label='First Exhibition Date'
        name='firstExhibitedDate'
        value={firstExhibitedDate}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='First Exhibition Title'
        name='firstExhibitedTitle'
        value={firstExhibitedTitle}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='First Exhibition Address'
        name='firstExhibitedAddress'
        value={firstExhibitedAddress}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='date'
        label='Submission Date'
        name='submissionDate'
        value={submission.submissionDate}
        onChange={onChange}
      />
      <TextField
        variant='outlined'
        type='text'
        label='Submission Exhibition Title'
        name='submissionExhibitionTitle'
        value={submission.submissionExhibitionTitle}
        onChange={onChange}
      />
      <TextField
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
    // }
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
              <IconButton>
                <CloseIcon />
              </IconButton>
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
            />

            <Step3
              mediaLinks={mediaLinks}
              notes={notes}
              salesHistorySoldTo={salesHistorySoldTo}
              salesHistorySoldBy={salesHistorySoldBy}
              salesHistoryDateSold={salesHistoryDateSold}
              onChange={onChange}
            />

            <Step4
              firstExhibitedDate={firstExhibitedDate}
              firstExhibitedTitle={firstExhibitedTitle}
              firstExhibitedAddress={firstExhibitedAddress}
              exhibited={exhibited}
              submission={submission}
              onChange={onChange}
            />
          </ShowAllRecordForm>
          <RecordFormStepButtonContainer>
            <IconButton
              color='secondary'
              onClick={() => {
                setShowAllSteps(!showAllSteps);
                setCurrentStep(1);
              }}
              type='button'
              aria-label='Show all steps'
            >
              All
            </IconButton>
          </RecordFormStepButtonContainer>
          <RecordFormButtonContainer>
            <Button type='submit' variant='contained' color='primary'>
              {current ? 'Update Item' : 'Add Item'}
            </Button>

            {current && (
              <Button variant='contained' onClick={clearAll} color='secondary'>
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
              <IconButton>
                <CloseIcon />
              </IconButton>
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
            />
          ) : currentStep === 3 ? (
            <Step3
              mediaLinks={mediaLinks}
              notes={notes}
              salesHistorySoldTo={salesHistorySoldTo}
              salesHistorySoldBy={salesHistorySoldBy}
              salesHistoryDateSold={salesHistoryDateSold}
              onChange={onChange}
            />
          ) : currentStep === 4 ? (
            <Step4
              firstExhibitedDate={firstExhibitedDate}
              firstExhibitedTitle={firstExhibitedTitle}
              firstExhibitedAddress={firstExhibitedAddress}
              exhibited={exhibited}
              submission={submission}
              onChange={onChange}
            />
          ) : null}

          <RecordFormStepButtonContainer>
            <IconButton
              color='primary'
              onClick={() => {
                setCurrentStep(1);
              }}
              type='button'
              aria-label='Form Step 1'
            >
              1
            </IconButton>
            <IconButton
              color='primary'
              onClick={() => {
                setCurrentStep(2);
              }}
              type='button'
              aria-label='Form Step 2'
            >
              2
            </IconButton>
            <IconButton
              color='primary'
              onClick={() => {
                setCurrentStep(3);
              }}
              type='button'
              aria-label='Form Step 3'
            >
              3
            </IconButton>
            <IconButton
              color='primary'
              onClick={() => {
                setCurrentStep(4);
              }}
              type='button'
              aria-label='Form Step 4'
            >
              4
            </IconButton>

            <IconButton
              color='secondary'
              onClick={() => {
                setShowAllSteps(!showAllSteps);
                setCurrentStep(null);
              }}
              type='button'
              aria-label='Show all steps'
            >
              All
            </IconButton>
          </RecordFormStepButtonContainer>
          <RecordFormButtonContainer>
            <Button type='submit' variant='contained' color='primary'>
              {current ? 'Update Item' : 'Add Item'}
            </Button>

            {current && (
              <Button variant='contained' onClick={clearAll} color='secondary'>
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
