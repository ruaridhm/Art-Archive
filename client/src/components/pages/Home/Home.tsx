import React, { useContext, useEffect, useState } from 'react';
//Context
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
//Material-UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
//Custom Components
import RecordFormDialog from '../../records/RecordForm/RecordFormDialog';
import Records from '../../records/Records/Records';
import Controls from './Controls/Controls';
//Interfaces
import { RecordInterface } from '../../records/RecordItem/RecordItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeContainer: {
      display: 'flex',
      flexDirection: 'column',
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
  const [sortedRecords, setSortedRecords] = useState<RecordInterface[] | null>(
    records
  );

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
        return function innerSort(
          a: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
          b: { [x: string]: any; hasOwnProperty: (arg0: string) => any }
        ) {
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

      let sorted = sortedRecords;
      sorted!.sort(compareValues(sort, order));

      setSortedRecords(sorted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order, records]);

  return (
    <div className={classes.homeContainer}>
      {displayAddRecord && (
        <RecordFormDialog
          displayAddRecord={displayAddRecord}
          setDisplayAddRecord={setDisplayAddRecord}
        />
      )}

      <Controls
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        setDisplayAddRecord={setDisplayAddRecord}
      />

      <Records
        setDisplayAddRecord={setDisplayAddRecord}
        sortedRecords={sortedRecords}
      />
    </div>
  );
};

export default Home;
