import React, { useContext, useEffect, useState } from 'react';
//Context
import AuthContext from '../../../context/auth/AuthContext';
//Material-UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
//Material-UI Icons
import AddIcon from '@material-ui/icons/Add';

import RecordForm from '../../records/RecordForm/RecordForm';
import RecordFormDialog from '../../records/RecordForm/RecordFormDialog';
import Records from '../../records/Records/Records';
import RecordFilter from '../../records/RecordFilter/RecordFilter';

import {
  HomeContainer,
  HomeFilterContainer,
  MobileFilterContainer,
  AddRecordButtonWrapper,
  MobileControlsContainer,
  MobileRecordFilterContainer,
  SortRecords,
  Controls,
} from './Style';

const sortOptions = [
  {
    title: 'Title',
    value: 'title',
  },
  {
    title: 'Artist',
    value: 'artist',
  },
  {
    title: 'Ref',
    value: 'ref',
  },
  {
    title: 'Collection',
    value: 'collection',
  },
  {
    title: 'Date',
    value: 'date',
  },
  {
    title: 'Size',
    value: 'size',
  },
  {
    title: 'Medium',
    value: 'medium',
  },
  {
    title: 'Price',
    value: 'price',
  },
  {
    title: 'Current Location',
    value: 'currentLocation',
  },
  {
    title: 'Sold To',
    value: 'soldTo',
  },
  {
    title: 'Sold By',
    value: 'soldBy',
  },
  {
    title: 'Date Sold',
    value: 'dateSold',
  },
  {
    title: 'First Exhibition Date',
    value: 'firstExhibitionDate',
  },
  {
    title: 'First Exhibition Title',
    value: 'firstExhibitionTitle',
  },
  {
    title: 'Submission Date',
    value: 'submissionDate',
  },
  {
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const Home = () => {
  const authContext = useContext(AuthContext);
  const [displayAddRecord, setDisplayAddRecord] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('');

  const classes = useStyles();

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);
  };

  const handleOrderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrder(event.target.value as string);
  };

  return (
    <HomeContainer>
      {displayAddRecord ? (
        <RecordFormDialog
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

          <Fab
            color='primary'
            aria-label='add Item'
            onClick={() => setDisplayAddRecord(!displayAddRecord)}
          >
            <AddIcon />
          </Fab>
        </MobileControlsContainer>
      )}

      <Controls>
        <SortRecords>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>
              Sort By:
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={sort}
              onChange={handleSortChange}
              label='Sort By'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {sortOptions.map((e) => (
                <MenuItem value={e.value} key={e.value}>
                  {e.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>
              Order By:
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={order}
              onChange={handleOrderChange}
              label='Order By'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {orderOptions.map((e) => (
                <MenuItem value={e.value} key={e.value}>
                  {e.title}{' '}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SortRecords>
        <HomeFilterContainer>
          <RecordFilter />
        </HomeFilterContainer>
        <AddRecordButtonWrapper>
          <Button
            variant='contained'
            color='primary'
            size='large'
            startIcon={<AddIcon />}
            onClick={() => setDisplayAddRecord(!displayAddRecord)}
          >
            Add Record
          </Button>
        </AddRecordButtonWrapper>
      </Controls>

      <Records setDisplayAddRecord={setDisplayAddRecord} />
    </HomeContainer>
  );
};

export default Home;
