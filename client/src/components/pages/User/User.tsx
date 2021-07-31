import React, { useContext, useEffect } from 'react';
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
import { RecordInterface } from '../../records/RecordItem/RecordItem';

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
    const dates = records!.map((elem) => {
      return { title: elem.title, date: elem.date };
    });

    if (dates.length === 0) return null;
    let latestDate = dates[0];
    for (let i = 1; i < dates.length; i++) {
      let currentDate = dates[i];
      if (currentDate.date > latestDate.date) {
        latestDate = currentDate;
      }
    }
    return latestDate;
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
    let result: { price: number; title: string } = {
      price: lowest ? 99999999999 : 0,
      title: '',
    };
    records?.forEach((elem) => {
      if (lowest) {
        if (elem[value] < result[value]) {
          result = { price: elem.price, title: elem.title };
        }
      } else {
        if (elem[value] > result[value]) {
          result = { price: elem.price, title: elem.title };
        }
      }
    });
    if (lowest) {
      if (result.price === 99999999999) {
        return { price: 0, title: 'No prices set.' };
      } else {
        return result;
      }
    } else {
      if (result.price === 0) {
        return { price: 0, title: 'No prices set.' };
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
    let total: string[] = [];
    records?.forEach((elem) => {
      elem[value] !== '' && total.push(elem[value]);
    });
    console.log('total', total);
    const obj = total.reduce(
      (key: KeyInterface, val) => ({ ...key, [val]: (key[val] | 0) + 1 }),
      {}
    );
    console.log('reduce', obj);

    let keys = Object.keys(obj);
    let largest = Math.max.apply(
      null,
      keys.map((x) => obj[x])
    );
    console.log('largest', largest);
    let result = keys.reduce((result, key: string) => {
      if (obj[key] === largest) {
        console.log('key', obj[key]);
        result.push(obj);
      }
      return result;
    }, []);
    console.log('result', result);
    let ans = ' ';
    for (let i = 0; i < result.length; i++) {
      if (i !== result.length - 1) {
        ans += `${result[i]}, `;
      } else {
        ans += `${result[i]}`;
      }
    }
    console.log(ans);
    return ans;
  };

  const createData = (name: string, value: any, item?: string) => {
    return { name, value, item };
  };

  const rows = [
    createData('Total Items: ', totalItems()),
    createData('Total Items Including Editions:', totalEditions()),
    createData('Number of Collections: ', totalCollections()),
    createData(
      'Earliest Item',
      earliestDate().date.toString().slice(0, 10),
      earliestDate().title
    ),
    createData(
      'Latest Item',
      latestDate().date.toString().slice(0, 10),
      latestDate().title
    ),

    createData(
      'Highest Price',
      `€${highLowNumb('price').price}`,
      highLowNumb('price').title
    ),
    createData(
      'Lowest Price',
      `€${highLowNumb('price', true).price}`,
      highLowNumb('price', true).title
    ),
    createData('Average Price', `€${avgPrice()}`),
    createData('Total Exhibitions', totalArrTitleCount('exhibitions')),
    createData('Total Submissions', totalArrTitleCount('submissions')),
    //createData('Latest Sold', calcLatestDate('sales.soldDate')),
    createData('Most Popular Medium', mostPopularCount('medium')),
    // createData('Most Popular Size', mostPopularCount('size')),
    //  createData('Most Editions', calcHighPrice('editions')),
  ];

  if (!loading && records) {
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.value}</TableCell>
                <TableCell align='right'>{row.item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <Spinner description='Loading User' />;
  }
};

export default User;
