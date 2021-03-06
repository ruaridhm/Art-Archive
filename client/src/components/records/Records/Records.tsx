import React, { Dispatch, SetStateAction, useContext } from 'react';
//Context
import RecordContext from '../../../context/record/RecordContext';
//Components
import RecordItem, { RecordInterface } from '../RecordItem/RecordItem';
import Spinner from '../../layout/Spinner/Spinner';
//Material-UI
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import AddRecordButton from '../../../components/addRecordButton/AddRecordButton';

interface RecordsProps {
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
  sortedRecords: any;
}
const useStyles = makeStyles(() =>
  createStyles({
    recordContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    noRecordContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
    },
  })
);

const Records = ({ setDisplayAddRecord, sortedRecords }: RecordsProps) => {
  const recordContext = useContext(RecordContext);
  const { records, filtered, loading } = recordContext;
  const classes = useStyles();

  return sortedRecords !== null && records?.length === 0 && !loading ? (
    <Container className={classes.noRecordContainer}>
      <Typography variant='h3'>Please add a record</Typography>
      <AddRecordButton setDisplayAddRecord={setDisplayAddRecord} />
    </Container>
  ) : (
    <>
      {sortedRecords !== null && !loading ? (
        <div className={classes.recordContainer}>
          {filtered !== null
            ? filtered.map((record) => (
                <RecordItem
                  key={record._id}
                  record={record}
                  setDisplayAddRecord={setDisplayAddRecord}
                />
              ))
            : sortedRecords.map((record: RecordInterface) => (
                <RecordItem
                  key={record._id}
                  record={record}
                  setDisplayAddRecord={setDisplayAddRecord}
                />
              ))}
        </div>
      ) : (
        <Spinner description='Loading Items' />
      )}
    </>
  );
};

export default Records;
