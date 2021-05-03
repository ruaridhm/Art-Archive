import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import RecordContext from '../../../context/record/RecordContext';
import RecordItem from '../RecordItem/RecordItem';
import Spinner from '../../layout/Spinner/Spinner';
//Material-UI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface RecordsProps {
  setDisplayAddRecord: Dispatch<SetStateAction<boolean>>;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: '1em',
      paddingRight: '1em',
    },
    item: {
      flexWrap: 'wrap',
      maxWidth: '16%',
      minWidth: '16%',
    },
  })
);

const Records2 = ({ setDisplayAddRecord }: RecordsProps) => {
  const recordContext = useContext(RecordContext);
  const { records, filtered, getRecords, loading } = recordContext;
  const classes = useStyles();

  useEffect(() => {
    getRecords();
    // eslint-disable-next-line
  }, []);
  return records !== null && records.length === 0 && !loading ? (
    <h4>Please add a record</h4>
  ) : (
    <div className={classes.root}>
      {records !== null && !loading ? (
        <Grid
          spacing={3}
          container
          alignContent='space-around'
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
            : records.map((record) => (
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
    </div>
  );
};

export default Records2;
