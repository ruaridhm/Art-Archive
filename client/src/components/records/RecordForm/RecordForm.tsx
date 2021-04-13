import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import RecordContext from '../../../context/record/RecordContext';
import Button from '../../button/Button';
import TextField from '../../text field/TextField';
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

const emptyItemObject = {
  title: '',
  artist: 'Ed Miliano',
  reference: '',
  collectionName: '',
  image: '',
  date: '',
  size: '',
  medium: '',
  price: 0,
  currentLocation: '',
  mediaLinks: '',
  notes: '',
  firstExhibitedDate: '',
  firstExhibitedTitle: '',
  firstExhibitedAddress: '',
  exhibited: [],
  submission: [],
  salesHistorySoldTo: '',
  salesHistorySoldBy: '',
  salesHistoryDateSold: '',
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
        medium
        outline
        type='text'
        title='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Artist'
        name='artist'
        value={artist}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Ref'
        name='reference'
        value={reference}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Collection'
        name='collectionName'
        value={collectionName}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Image'
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
        medium
        outline
        type='date'
        title='Date'
        name='date'
        value={date}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Size'
        name='size'
        value={size}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Medium'
        name='medium'
        value={medium}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='number'
        title='Price'
        name='price'
        value={price}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Current Location'
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
        medium
        outline
        type='text'
        title='Media Links'
        name='mediaLinks'
        value={mediaLinks}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Notes'
        name='notes'
        value={notes}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Sold To'
        name='salesHistorySoldTo'
        value={salesHistorySoldTo}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Sold By'
        name='salesHistorySoldBy'
        value={salesHistorySoldBy}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='date'
        title='Date Sold'
        name='salesHistoryDateSold'
        value={salesHistoryDateSold}
        onChange={onChange}
      />
    </StepContainer>
  );
};

interface Step4Props {
  firstExhibitedDate?: string;
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
        medium
        outline
        type='date'
        title='First Exhibition Date'
        name='firstExhibitedDate'
        value={firstExhibitedDate}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='First Exhibition Title'
        name='firstExhibitedTitle'
        value={firstExhibitedTitle}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='First Exhibition Address'
        name='firstExhibitedAddress'
        value={firstExhibitedAddress}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='date'
        title='Submission Date'
        name='submissionDate'
        value={submission.submissionDate}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Submission Exhibition Title'
        name='submissionExhibitionTitle'
        value={submission.submissionExhibitionTitle}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Submission Venue Address'
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
              small
              solidSuccess
              label={current ? 'Update Item' : 'Add Item'}
            />

            {current && (
              <Button
                medium
                solidDanger
                type='button'
                onClick={clearAll}
                label='Clear'
              />
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
              small
              solidSuccess
              label={current ? 'Update Item' : 'Add Item'}
            />

            {current && (
              <Button
                medium
                solidDanger
                type='button'
                onClick={clearAll}
                label='Clear'
              />
            )}
          </RecordFormButtonContainer>
        </RecordFormForm>
      </RecordFormContainer>
    );
  }
};

export default RecordForm;
