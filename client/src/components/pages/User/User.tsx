import React, { useContext, useEffect, useState } from 'react';
//Custom Components
import Spinner from '../../layout/Spinner/Spinner';
//Context
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import StatTable from './StatTable';

const useStyles = makeStyles({
  container: {
    margin: '1rem',
    maxWidth: 'calc(100% - 2rem)',
  },
  boldHeader: {
    fontSize: '1.25rem',
  },
  table: {},
});

const User = () => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { getRecords, records, loading } = recordContext;
  const classes = useStyles();
  const [renderReady, setRenderReady] = useState<boolean>(false);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    authContext.loadUser();
    getRecords();
    // eslint-disable-next-line
  }, []);

  const totalItems = (): number => {
    return records!.length;
  };

  const totalEditions = () => {
    let total: number = 0;
    records?.forEach((elem) => {
      if (elem.editions) {
        total += elem.editions;
      }
    });
    return total;
  };
  const totalCollections = () => {
    let total: string[] = [];
    records?.forEach((elem) => {
      if (elem.collectionName !== '' && elem.collectionName !== undefined) {
        if (!total.includes(elem.collectionName)) {
          total.push(elem.collectionName);
        }
      }
    });
    return total.length;
  };

  const earliestDate = () => {
    const dates = records!.map((elem) => {
      return { title: elem.title, date: elem.date };
    });

    if (dates.length === 0) return null;
    let earliestDate = dates[0];
    for (let i = 1; i < dates.length; i++) {
      let currentDate = dates[i];
      if (currentDate.date < earliestDate.date) {
        earliestDate = currentDate;
      }
    }
    return earliestDate;
  };

  const latestDate = () => {
    const dates = [];
    records!.forEach((elem) => {
      elem.sales.forEach((item) => {
        item.soldDate !== null &&
          dates.push({
            title: elem.title,
            edition: item.edition,
            soldDate: item.soldDate,
          });
      });
    });
    let latest = dates[0];
    for (let i = 1; i < dates.length; i++) {
      let newDate = new Date(dates[i].soldDate).getTime();
      let latestDate = new Date(latest.soldDate).getTime();
      if (newDate > latestDate) {
        latest = dates[i];
      }
    }
    latest.soldDate = `${latest.soldDate.substring(
      8,
      10
    )}/${latest.soldDate.substring(5, 7)}/${latest.soldDate.substring(0, 4)}`;

    return latest;
  };

  const avgPrice = () => {
    const prices = records!.map((elem) => {
      return elem.price;
    });
    var average =
      prices.reduce((total, prices) => total + prices) / prices.length;
    return average.toFixed(2);
  };

  const highLowNumb = (value: string, lowest?: boolean) => {
    let result: { value: number; title: string } = {
      value: lowest ? 99999999999 : 0,
      title: '',
    };
    records?.forEach((elem) => {
      if (lowest) {
        if (elem[value] < result.value) {
          result = { value: elem[value], title: elem.title };
        }
      } else {
        if (elem[value] > result.value) {
          result = { value: elem[value], title: elem.title };
        }
      }
    });
    if (lowest) {
      if (result.value === 99999999999) {
        return { value: 0, title: 'No values set.' };
      } else {
        return result;
      }
    } else {
      if (result.value === 0) {
        return { value: 0, title: 'No values set.' };
      } else {
        return result;
      }
    }
  };

  const totalArrTitleCount = (value: string) => {
    const total: string[] = [];
    records?.forEach((record) => {
      record[value].forEach((elem: { title: string }) => {
        if (
          (total.includes(elem.title) && elem) ||
          elem.title === undefined ||
          elem.title === ''
        ) {
          return;
        } else {
          total.push(elem.title);
        }
      });
    });
    return total.length;
  };

  interface KeyInterface {
    [val: string]: any;
  }

  const mostPopularCount = (value: string) => {
    let total: any[] = [];
    records?.forEach((elem) => {
      if (elem[value] !== '') {
        const matched = (element) => element.value === elem[value];
        const matchedIndex = total.findIndex(matched);
        if (matchedIndex === -1) {
          total.push({ value: elem[value], count: 1 });
        } else {
          //elem is in array +1 to count
          total[matchedIndex] = {
            value: elem[value],
            count: total[matchedIndex].count + 1,
          };
        }
      }
    });

    let max = Math.max(...total.map((i) => i.count));

    let result = [];

    total.forEach((item) => {
      if (item.count === max) {
        result = [...result, item];
      }
    });

    let resultString = '';
    result.forEach((item) => {
      if (resultString.length === 0) {
        console.log('if');
        resultString = resultString.concat(item.value);
      } else {
        console.log('else');
        resultString = resultString.concat(`, ${item.value}`);
      }
    });
    console.log({ result: resultString, count: max });
    return { result: resultString, count: max };
  };

  const createData = (name: string, value: any, item?: string) => {
    return { name, value, item };
  };

  const populateRows = () => {
    setTableRows((prevState) => [
      ...prevState,
      createData('Total Items: ', totalItems()),
    ]);

    setTableRows((prevState) => [
      ...prevState,
      createData('Total Items Including Editions:', totalEditions()),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData('Number of Collections: ', totalCollections()),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData(
        'Earliest Item',
        earliestDate().date.toString().slice(0, 10),
        earliestDate().title
      ),
    ]);
    // setTableRows((prevState) => [
    //   ...prevState,
    //   createData('Latest Item', latestDate()),
    // ]);
    setTableRows((prevState) => [
      ...prevState,
      createData(
        'Highest Price',
        `€${highLowNumb('price').value}`,
        highLowNumb('price').title
      ),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData(
        'Lowest Price',
        `€${highLowNumb('price', true).value}`,
        highLowNumb('price', true).title
      ),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData('Average Price', `€${avgPrice()}`),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData('Total Exhibitions', totalArrTitleCount('exhibitions')),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData('Total Submissions', totalArrTitleCount('submissions')),
    ]);

    setTableRows((prevState) => [
      ...prevState,
      createData(
        'Latest Sold',
        `${latestDate().title}, edition: ${latestDate().edition}`,
        latestDate().soldDate
      ),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData(
        'Most Popular Medium',
        mostPopularCount('medium').result,
        mostPopularCount('medium').count.toString()
      ),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData(
        'Most Popular Size',
        mostPopularCount('size').result,
        mostPopularCount('size').count.toString()
      ),
    ]);
    setTableRows((prevState) => [
      ...prevState,
      createData(
        'Most Editions',
        highLowNumb('editions').value,
        highLowNumb('editions').title
      ),
    ]);

    setRenderReady(true);
  };

  useEffect(() => {
    populateRows();
  }, []);

  if (!loading && renderReady) {
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
            <StatTable rows={tableRows} />
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <Spinner description='Loading User' />;
  }
};

export default User;
