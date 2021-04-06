import React, { useContext, useEffect, useState } from 'react';
import Records from '../../records/Records/Records';
import RecordFilter from '../../records/RecordFilter/RecordFilter';
import AuthContext from '../../../context/auth/AuthContext';
import Button from '../../button/Button';
import Dropdown from '../../dropdown/Dropdown';
import RecordForm from '../../records/RecordForm/RecordForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  HomeContainer,
  HomeFilterContainer,
  MobileFilterContainer,
  AddRecordButtonWrapper,
  MobileControlsContainer,
  MobileRecordFilterContainer,
  AddRecordButtonContainer,
  AddRecordButtonDescription,
  SortRecords,
  Controls,
} from './Style';

const sortOptions = [
  {
    id: 1,
    title: 'Title',
    value: 'title',
  },
  {
    id: 2,
    title: 'Artist',
    value: 'artist',
  },
  {
    id: 3,
    title: 'Ref',
    value: 'ref',
  },
  {
    id: 4,
    title: 'Collection',
    value: 'collection',
  },
  {
    id: 5,
    title: 'Date',
    value: 'date',
  },
  {
    id: 6,
    title: 'Size',
    value: 'size',
  },
  {
    id: 7,
    title: 'Medium',
    value: 'medium',
  },
  {
    id: 8,
    title: 'Price',
    value: 'price',
  },
  {
    id: 9,
    title: 'Current Location',
    value: 'currentLocation',
  },
  {
    id: 10,
    title: 'Sold To',
    value: 'soldTo',
  },
  {
    id: 11,
    title: 'Sold By',
    value: 'soldBy',
  },
  {
    id: 12,
    title: 'Date Sold',
    value: 'dateSold',
  },
  {
    id: 13,
    title: 'First Exhibition Date',
    value: 'firstExhibitionDate',
  },
  {
    id: 14,
    title: 'First Exhibition Title',
    value: 'firstExhibitionTitle',
  },
  {
    id: 15,
    title: 'Submission Date',
    value: 'submissionDate',
  },
  {
    id: 16,
    title: 'Submission Title',
    value: 'submissionTitle',
  },
];

const orderOptions = [
  {
    id: 1,
    title: 'Ascending',
    value: 'ascending',
  },
  {
    id: 2,
    title: 'Descending',
    value: 'descending',
  },
];
const Home = () => {
  const authContext = useContext(AuthContext);
  const [displayAddRecord, setDisplayAddRecord] = useState<boolean>(false);
  const [sort, setSort] = useState([]);
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState<string>('');

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <HomeContainer>
      {displayAddRecord ? (
        <RecordForm
          displayAddRecord={displayAddRecord}
          setDisplayAddRecord={setDisplayAddRecord}
        />
      ) : null}

      {true && (
        <MobileControlsContainer className='MobileControlsContainer'>
          <MobileFilterContainer>
            <MobileRecordFilterContainer>
              <RecordFilter />
            </MobileRecordFilterContainer>
          </MobileFilterContainer>
          <Button
            medium
            circleSuccess
            onClick={() => setDisplayAddRecord(!displayAddRecord)}
            label={<FontAwesomeIcon icon={faPlus} />}
            type='button'
          />
        </MobileControlsContainer>
      )}

      <Controls>
        <SortRecords>
          <Dropdown
            title='Sort by:'
            items={sortOptions}
            selection={sort}
            setSelection={setSort}
            open={open}
            setOpen={setOpen}
          />
          <Dropdown
            title='Order by:'
            items={orderOptions}
            selection={order}
            setSelection={setOrder}
            open={open}
            setOpen={setOpen}
          />
        </SortRecords>
        <HomeFilterContainer>
          <RecordFilter />
        </HomeFilterContainer>
        <AddRecordButtonWrapper>
          <AddRecordButtonContainer>
            <Button
              medium
              circleSuccess
              onClick={() => setDisplayAddRecord(!displayAddRecord)}
              label={<FontAwesomeIcon icon={faPlus} />}
              type='button'
            />
            <AddRecordButtonDescription>Add Record</AddRecordButtonDescription>
          </AddRecordButtonContainer>
        </AddRecordButtonWrapper>
      </Controls>

      <Records setDisplayAddRecord={setDisplayAddRecord} />
    </HomeContainer>
  );
};

export default Home;
