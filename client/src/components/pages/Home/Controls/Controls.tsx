import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import clsx from 'clsx';

//Material-UI Icons
import RecordFilter from '../../../records/RecordFilter/RecordFilter';
import AddRecordButton from '../../../addRecordButton/AddRecordButton';
import FilterToolTip from '../../../records/RecordFilter/FilterToolTip';

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
    controlsGrid: {
      flexGrow: 1,
      padding: theme.spacing(2),
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2),
        margin: 0,
        rowGap: '10px',
      },
    },
    gridContainers: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        width: '33%',
      },
      [theme.breakpoints.down('lg')]: {
        width: '33%',
      },
      [theme.breakpoints.down('xl')]: {
        width: '33%',
      },
    },
    sortControls: {
      flexDirection: 'row',
      '&>:nth-child(2)': {
        marginLeft: '10px',
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
        justifyContent: 'space-between',
        marginLeft: 0,
        '&>:nth-child(1)': {
          width: '50%',
        },
        '&>:nth-child(2)': {
          width: '50%',
        },
      },
    },
    filterControls: {
      [theme.breakpoints.down('sm')]: {
        width: '31%',
      },
      [theme.breakpoints.down('xs')]: {
        width: '75%',
        justifyContent: 'flex-start',
      },
    },
    addButton: {
      [theme.breakpoints.down('xs')]: {
        width: '25%',
      },
    },
    formControl: {
      width: 200,
      [theme.breakpoints.down('sm')]: {
        width: 150,
      },
      [theme.breakpoints.down('xs')]: {
        width: 150,
      },
    },
  })
);

interface ControlsInterface {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  setDisplayAddRecord: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls = ({
  sort,
  setSort,
  order,
  setOrder,
  setDisplayAddRecord,
}: ControlsInterface) => {
  const classes = useStyles();

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);
  };

  const handleOrderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrder(event.target.value as string);
  };

  return (
    <Grid
      container
      spacing={2}
      direction='row'
      className={classes.controlsGrid}
      justify-content='center'
      alignItems='center'
      alignContent='center'
      justify='space-between'
    >
      <div className={clsx(classes.gridContainers, classes.sortControls)}>
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
      </div>
      <div className={clsx(classes.gridContainers, classes.filterControls)}>
        <RecordFilter />
        <FilterToolTip />
      </div>
      <div className={clsx(classes.gridContainers, classes.addButton)}>
        <AddRecordButton setDisplayAddRecord={setDisplayAddRecord} />
      </div>
    </Grid>
  );
};

export default Controls;
