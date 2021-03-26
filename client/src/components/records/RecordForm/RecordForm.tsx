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
  artist: '',
  ref: '',
  collectionName: '',
  image: '',
  date: null,
  size: '',
  medium: '',
  price: null,
  currentLocation: '',
  mediaLinks: null,
  notes: '',
  firstDateExhibited: null,
  firstExhibitionTitle: '',
  firstVenueAddress: '',
  exhibited: {},
  submission: {},
  salesHistorySoldTo: '',
  salesHistorySoldBy: '',
  salesHistoryDateSold: null,
};
interface Step1Props {
  title?: string;
  artist?: string;
  ref?: string;
  collectionName?: string;
  image?: string;
  onChange: (e: any) => void;
}

const Step1 = ({
  title,
  artist,
  ref,
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
        name='ref'
        value={ref}
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
  date?: string;
  size?: string;
  medium?: string;
  price?: string;
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
        type='text'
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
        type='text'
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
  salesHistoryDateSold?: string;
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
        type='text'
        title='Date Sold'
        name='salesHistoryDateSold'
        value={salesHistoryDateSold}
        onChange={onChange}
      />
    </StepContainer>
  );
};

interface Step4Props {
  exhibited?: any;
  submission?: any;
  onChange: (e: any) => void;
}

const Step4 = ({
  exhibited,
  submission,

  onChange,
}: Step4Props) => {
  return (
    <StepContainer>
      <TextField
        medium
        outline
        type='text'
        title='Exhibition Date'
        name='exhibitionDate'
        value={exhibited.exhibitionDate}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Exhibition Title'
        name='exhibitionTitle'
        value={exhibited.exhibitionTitle}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
        title='Exhibition Address'
        name='exhibitionAddress'
        value={exhibited.exhibitionAddress}
        onChange={onChange}
      />
      <TextField
        medium
        outline
        type='text'
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
      setRecord(current);
    } else {
      setRecord(emptyItemObject);
    }
  }, [recordContext, current]);

  const [record, setRecord] = useState<RecordInterface>(emptyItemObject);

  const {
    title,
    artist,
    label,
    catalogNumber,
    releaseDate,
    // format,
    country,
    coverFront,
    // coverBack,
    // coverLp,
    recordCondition,
    sleeveCondition,
    barcode,
    locationPrimary,
    locationSecondary,
    // want,
    // have,
    genre,
    style,
    cover,
    innerSleeve,
    outerSleeve,
    comment,
    rating,
    wishList,
  } = record;

  const onChange = (e: { target: { type: string; name: any; value: any } }) => {
    if (e.target.type !== undefined && e.target.type === 'text') {
      setRecord({ ...record, [e.target.name]: e.target.value });
    }
  };

  const handleChecked = (e: {
    current: { type: string; checked: boolean; name: any };
  }) => {
    if (e.current.type === 'checkbox') {
      console.log(e.current.checked);
      e.current.checked = !e.current.checked;
      console.log(e.current.checked);
      setRecord({ ...record, [e.current.name]: e.current.checked });
    }
  };
  const handleRating = (e: any) => {
    setRecord({ ...record, rating: e });
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (current === null) {
      addRecord(record);
    } else {
      updateRecord(record);
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
  // useKey('Digit1', () => {
  //   setCurrentStep(1);
  // });
  // useKey('Digit2', () => {
  //   setCurrentStep(2);
  // });
  // useKey('Digit3', () => {
  //   setCurrentStep(3);
  // });
  // useKey('Digit4', () => {
  //   setCurrentStep(4);
  // });
  // useKey('KeyA', () => {
  //   setShowAllSteps(!showAllSteps);
  // });

  if (showAllSteps === true) {
    return (
      <RecordFormContainer>
        <ShowAllRecordFormForm onSubmit={onSubmit}>
          <FormHeader>
            <IconContainer></IconContainer>
            <FormHeaderText>
              {current ? 'Edit Record' : 'Add Record'}
            </FormHeaderText>
            <RecordFormCloseButton onClick={close}>
              <RecordFormCloseButtonIcon className='fas fa-times'></RecordFormCloseButtonIcon>
            </RecordFormCloseButton>
          </FormHeader>
          <ShowAllRecordForm>
            <Step1
              title={title}
              artist={artist}
              label={label}
              catalogNumber={catalogNumber}
              releaseDate={releaseDate}
              onChange={onChange}
            />

            <Step2
              recordCondition={recordCondition}
              sleeveCondition={sleeveCondition}
              country={country}
              locationPrimary={locationPrimary}
              locationSecondary={locationSecondary}
              onChange={onChange}
            />

            <Step3
              barcode={barcode}
              coverFront={coverFront}
              genre={genre}
              style={style}
              comment={comment}
              onChange={onChange}
            />

            <Step4
              rating={rating}
              cover={cover}
              innerSleeve={innerSleeve}
              outerSleeve={outerSleeve}
              wishList={wishList}
              handleChecked={handleChecked}
              handleRating={handleRating}
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
              label={current ? 'Update Record' : 'Add Record'}
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
              {current ? 'Edit Record' : 'Add Record'}
            </FormHeaderText>
            <RecordFormCloseButton onClick={close}>
              <RecordFormCloseButtonIcon className='fas fa-times'></RecordFormCloseButtonIcon>
            </RecordFormCloseButton>
          </FormHeader>
          {currentStep === 1 ? (
            <Step1
              title={title}
              artist={artist}
              label={label}
              catalogNumber={catalogNumber}
              releaseDate={releaseDate}
              onChange={onChange}
            />
          ) : currentStep === 2 ? (
            <Step2
              recordCondition={recordCondition}
              sleeveCondition={sleeveCondition}
              country={country}
              locationPrimary={locationPrimary}
              locationSecondary={locationSecondary}
              onChange={onChange}
            />
          ) : currentStep === 3 ? (
            <Step3
              barcode={barcode}
              coverFront={coverFront}
              genre={genre}
              style={style}
              comment={comment}
              onChange={onChange}
            />
          ) : currentStep === 4 ? (
            <Step4
              rating={rating}
              cover={cover}
              innerSleeve={innerSleeve}
              outerSleeve={outerSleeve}
              wishList={wishList}
              handleChecked={handleChecked}
              handleRating={handleRating}
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
              label={current ? 'Update Record' : 'Add Record'}
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
