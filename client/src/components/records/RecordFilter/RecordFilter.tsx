import React, { useContext, useEffect, useState } from 'react';
import RecordContext from '../../../context/record/RecordContext';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import indigo from '@material-ui/core/colors/indigo';
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  IconButton,
} from '@material-ui/core';

const RecordFilter = () => {
  const recordContext = useContext(RecordContext);
  const { filterRecordsNew, filterRecords, clearFilter } = recordContext;

  const [searchBy, setSearchBy] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const useStyles = makeStyles((theme) =>
    createStyles({
      filter: {
        width: '100%',
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
      clearIcon: {
        margin: theme.spacing(1),
        display: searchTerm === '' ? 'none' : 'flex',
        '&:hover': {
          color: indigo[500],
        },
      },
    })
  );
  const classes = useStyles();

  useEffect(() => {
    if (searchTerm !== '') {
      if (
        searchBy === 'title' ||
        searchBy === 'artist' ||
        searchBy === 'reference' ||
        searchBy === 'collectionName' ||
        searchBy === 'size' ||
        searchBy === 'medium' ||
        searchBy === 'currentLocation' ||
        searchBy === 'notes'
      ) {
        filterRecords(searchTerm, searchBy);
      } else {
        filterRecordsNew(searchTerm, searchBy);
      }
    } else {
      clearFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBy, searchTerm]);

  const handleOnChange = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSearchBy(event.target.value as string);
  };

  const searchOptions = [
    {
      title: 'All',
      value: 'all',
    },
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
    // {
    //   title: 'Date',
    //   value: 'date',
    // },
    {
      title: 'Size',
      value: 'size',
    },
    {
      title: 'Medium',
      value: 'medium',
    },
    // {
    //   title: 'Price',
    //   value: 'price',
    // },
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
      value: 'soldDate',
    },
    {
      title: 'Exhibition Title',
      value: 'exhibitionTitle',
    },
    {
      title: ' Exhibition Address',
      value: 'exhibitionAddress',
    },
    {
      title: ' Exhibition Date',
      value: 'exhibitionsDate',
    },
    {
      title: 'Submission Title',
      value: 'submissionTitle',
    },
    {
      title: 'Submission Address',
      value: 'submissionAddress',
    },
    {
      title: 'Submission Date',
      value: 'submissionDate',
    },
  ];
  return (
    <>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='search-by-label'>Search By:</InputLabel>
        <Select
          labelId='search-by-label'
          id='search-by-select'
          value={searchBy}
          onChange={handleSearchByChange}
          label='Search By'
        >
          {searchOptions.map((e) => (
            <MenuItem value={e.value} key={e.value}>
              {e.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={classes.filter}
        variant='outlined'
        label='Filter Records'
        onChange={handleOnChange}
        size='medium'
        value={searchTerm}
        InputProps={{
          endAdornment: (
            <InputAdornment position='start'>
              <IconButton
                aria-label='delete'
                className={classes.clearIcon}
                size='small'
                onClick={() => {
                  setSearchTerm('');
                  clearFilter();
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default RecordFilter;
