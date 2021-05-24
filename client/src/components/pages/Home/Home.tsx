import React, { useContext, useEffect, useState } from 'react';
//Context
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
//Material-UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from '@material-ui/core';
//Material-UI Icons
import AddIcon from '@material-ui/icons/Add';
//Custom Components
import RecordFormDialog from '../../records/RecordForm/RecordFormDialog';
import Records from '../../records/Records/Records';
import RecordFilter from '../../records/RecordFilter/RecordFilter';
//Interfaces
import { RecordInterface } from '../../records/RecordItem/RecordItem';

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
    value: 'reference',
  },
  {
    title: 'Collection',
    value: 'collectionName',
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
    value: 'sales.soldTo',
  },
  {
    title: 'Sold By',
    value: 'sales.soldBy',
  },
  {
    title: 'Date Sold',
    value: 'sales.soldDate',
  },
  {
    title: 'First Exhibition Title',
    value: 'exhibited[0].title',
  },
  {
    title: 'First Exhibition Date',
    value: 'exhibited[0].date',
  },
  {
    title: 'Submission Title',
    value: 'submission[0].title',
  },
  {
    title: 'Submission Date',
    value: 'submission[0].date',
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
    homeContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    controls: {
      display: 'grid',
      gridTemplateColumns: ' 1fr 1fr 1fr',
      placeItems: 'center',
      placeContent: 'center',
    },
    sortControls: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5em 0 0.5em 0',
      margin: '0.5em 0 0.5em 0',
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.5em',
      margin: '0.5em',
    },
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
  const recordContext = useContext(RecordContext);
  const { records, getRecords } = recordContext;
  const [displayAddRecord, setDisplayAddRecord] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('');
  const [sortedRecords, setSortedRecords] =
    useState<RecordInterface[]>(records);

  const classes = useStyles();

  useEffect(() => {
    getRecords();
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  //Sorts records depending on user input from sortOptions and orderOptions
  useEffect(() => {
    if (sort === '') {
      setSortedRecords(records);
    } else {
      const compareValues = (key: string, order = 'ascending') => {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }

          const varA =
            typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
          const varB =
            typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return order === 'descending' ? comparison * -1 : comparison;
        };
      };

      let sorted = [...sortedRecords];
      sorted.sort(compareValues(sort, order));

      setSortedRecords(sorted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order, records]);

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);
  };

  const handleOrderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrder(event.target.value as string);
  };

  return (
    <div className={classes.homeContainer}>
      {displayAddRecord ? (
        <RecordFormDialog
          displayAddRecord={displayAddRecord}
          setDisplayAddRecord={setDisplayAddRecord}
        />
      ) : null}
      <div className={classes.controls}>
        <Container className={classes.sortControls}>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='sort-by-label'>Sort By:</InputLabel>
            <Select
              labelId='sort-by-label'
              id='sort-by-select'
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
            <InputLabel id='order-by-label'>Order By:</InputLabel>
            <Select
              labelId='order-by-label'
              id='order-by-select'
              value={order}
              onChange={handleOrderChange}
              label='Order By'
            >
              {orderOptions.map((e) => (
                <MenuItem value={e.value} key={e.value}>
                  {e.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
        <Container className={classes.filterContainer}>
          <RecordFilter />
        </Container>
        <Container className={classes.buttonContainer}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            startIcon={<AddIcon />}
            onClick={() => setDisplayAddRecord(!displayAddRecord)}
          >
            Add Record
          </Button>
        </Container>
      </div>

      <Records
        setDisplayAddRecord={setDisplayAddRecord}
        sortedRecords={sortedRecords}
      />
    </div>
  );
};

export default Home;
