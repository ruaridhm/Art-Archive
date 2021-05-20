import React, { Dispatch, SetStateAction, useContext } from 'react';
//Context
import RecordContext from '../../../context/record/RecordContext';
//Components
import RecordItem, { RecordInterface } from '../RecordItem/RecordItem';
import Spinner from '../../layout/Spinner/Spinner';
//Material-UI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

interface RecordsProps {
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
  sortedRecords: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    record: {},
    item: {
      flexWrap: 'wrap',
      maxWidth: '16%',
      minWidth: '16%',
    },
  })
);

const Records = ({ setDisplayAddRecord, sortedRecords }: RecordsProps) => {
  const recordContext = useContext(RecordContext);
  const { records, filtered, loading } = recordContext;
  const classes = useStyles();

  return sortedRecords !== null && records.length === 0 && !loading ? (
    <h4>Please add a record</h4>
  ) : (
    <>
      {sortedRecords !== null && !loading ? (
        <Grid
          spacing={3}
          container
          alignContent='space-between'
          alignItems='center'
          justify='center'
        >
          {filtered !== null
            ? filtered.map((record) => (
                <Grid
                  item
                  xs={6}
                  sm={3}
                  className={classes.item}
                  key={record._id}
                >
                  <RecordItem
                    record={record}
                    setDisplayAddRecord={setDisplayAddRecord}
                  />
                </Grid>
              ))
            : sortedRecords.map((record: RecordInterface) => (
                <Grid
                  item
                  xs={6}
                  sm={3}
                  className={classes.item}
                  key={record._id}
                >
                  <RecordItem
                    record={record}
                    setDisplayAddRecord={setDisplayAddRecord}
                  />
                </Grid>
              ))}
        </Grid>
      ) : (
        <Spinner description='Loading Items' />
      )}
    </>
  );
};

export default Records;
