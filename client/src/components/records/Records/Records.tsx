import React, { Dispatch, SetStateAction, useContext } from 'react';
//Context
import RecordContext from '../../../context/record/RecordContext';
//Components
import RecordItem, { RecordInterface } from '../RecordItem/RecordItem';
import Spinner from '../../layout/Spinner/Spinner';
//Material-UI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface RecordsProps {
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
  sortedRecords: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    recordContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
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
