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

  const calcEditionsTotal = () => {
    let total = 0;
    records.forEach((elem) => {
      total += elem.editions;
    });
    return total;
  };
  const calcCollectionsTotal = () => {
    let total = [];
    records.forEach((elem) => {
      if (elem.collectionName !== '') {
        if (!total.includes(elem.collectionName)) {
          total.push(elem.collectionName);
        }
      }
    });
    return total.length;
  };

  const calcEarliestDate = () => {
    let earliest = 0;
    let title: string;
    records.forEach((elem) => {
      if (elem.date !== null) {
        let current = new Date(elem.date).getTime();
        if (earliest > current) {
          earliest = current;
          title = elem.title;
        }
      }
    });
    if (earliest === 0) {
      return 'No valid dates set';
    } else {
      return new Date(earliest).toDateString();
    }
  };
  const calcLatestDate = (value: string) => {
    let latest = 170000000000000;
    let title: string;
    records.forEach((elem) => {
      if (elem[value] !== null) {
        let current = new Date(elem[value]).getTime();

        if (latest < current) {
          latest = current;
          title = elem.title;
        }
      }
    });

    if (latest > Date.now()) {
      return 'No valid dates set';
    } else {
      return new Date(latest).toDateString();
    }
  };

  const calcAvgPrice = () => {
    let total = 0;
    let recordsWithPrice = 0;
    records.forEach((elem) => {
      if (elem.price !== 1) {
        total += elem.price;
        recordsWithPrice++;
      }
    });

    if (total / recordsWithPrice === 0) {
      return 'No prices set.';
    } else {
      return `€ ${total / recordsWithPrice}`;
    }
  };

  const calcHighPrice = (value: string) => {
    let highest = 0;
    records.forEach((elem) => {
      if (elem[value] !== 0) {
        if (elem[value] > highest) {
          highest = elem[value];
        }
      }
    });
    if (highest === 0) {
      return 'No prices set.';
    } else if (value === 'editions') {
      return highest;
    } else {
      return `€ ${highest}`;
    }
  };
  const calcLowPrice = () => {
    let lowest = 9999999;

    records.forEach((elem) => {
      if (elem.price !== 0) {
        if (elem.price < lowest) {
          lowest = elem.price;
        }
      }
    });
    if ((lowest = 9999999)) {
      return 'No prices set.';
    } else {
      return `€ ${lowest}`;
    }
  };
  const totalArrTitleCount = (value: string) => {
    const total = [];
    records.forEach((record) => {
      record[value].forEach((elem: { title: string }) => {
        if (
          total.includes(elem.title) ||
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

  const mostPopularCount = (value: string) => {
    let total = [];
    records.forEach((elem) => {
      elem[value] !== '' && total.push(elem[value]);
    });
    const obj = total.reduce(
      (key, val) => ({ ...key, [val]: (key[val] | 0) + 1 }),
      {}
    );

    let keys = Object.keys(obj);
    let largest = Math.max.apply(
      null,
      keys.map((x) => obj[x])
    );
    let result = keys.reduce((result, key) => {
      if (obj[key] === largest) {
        result.push(key);
      }
      return result;
    }, []);
    let ans = ' ';
    for (let i = 0; i < result.length; i++) {
      if (i !== result.length - 1) {
        ans += `${result[i]}, `;
      } else {
        ans += `${result[i]}`;
      }
    }

    return ans;
  };

  const getTotalRecords = () => {
    return records.length;
  };

  const createData = (name: string, value) => {
    return { name, value };
  };

  const rows = [
    createData('Total Items: ', getTotalRecords()),
    createData('Total Items Including Editions:', calcEditionsTotal()),
    createData('Number of Collections: ', calcCollectionsTotal()),
    createData('Earliest Item', calcEarliestDate()),
    createData('Latest Item', calcLatestDate('date')),
    createData('Average Price', calcAvgPrice()),
    createData('Highest Price', calcHighPrice('price')),
    createData('Lowest Price', calcLowPrice()),
    createData('Total Exhibitions', totalArrTitleCount('exhibited')),
    createData('Total Submissions', totalArrTitleCount('submission')),
    createData('Latest Sold', calcLatestDate('sales.soldDate')),
    createData('Most Popular Medium', mostPopularCount('medium')),
    createData('Most Popular Size', mostPopularCount('size')),
    createData('Most Editions', calcHighPrice('editions')),
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
                {/* <TableCell align="right">{row.item}</TableCell> */}
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
