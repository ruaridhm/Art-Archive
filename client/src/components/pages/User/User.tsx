import React, { useContext, useEffect } from 'react';
//Custom Components
import Spinner from '../../layout/Spinner/Spinner';
//Context
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import StatTable from './StatTable';

const useStyles = makeStyles({
  container: {
    margin: '1rem',
    maxWidth: 'calc(100% - 2rem)',
  },
  noRecordContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
  boldHeader: {
    fontSize: '1.25rem',
  },
  table: {},
});

export interface tableRowInterface {
  item: string | undefined;
  name: string;
  value: string | number | Date;
}

const User = () => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { getRecords, loading, records } = recordContext;
  const classes = useStyles();

  useEffect(() => {
    authContext.loadUser();
    getRecords();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // records.length >= 1 && useStatsTable(records, setRenderReady);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (records && records.length === 0) {
    return (
      <Box className={classes.noRecordContainer}>
        <Typography align='center' variant='h3'>
          No items exist,
        </Typography>
        <Typography align='center' variant='h4'>
          Please add a few items to get statistics on your collection.
        </Typography>
      </Box>
    );
  }

  if (!loading) {
    return (
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label='archive statistics'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.boldHeader}>Statistic</TableCell>
              <TableCell className={classes.boldHeader} align='right'>
                Value
              </TableCell>
              <TableCell className={classes.boldHeader} align='right'>
                Item
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StatTable />
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <Spinner description='Loading User' />;
  }
};

export default User;
