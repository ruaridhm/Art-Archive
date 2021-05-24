import React, { useContext, useEffect } from 'react';
import Spinner from '../../layout/Spinner/Spinner';
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';

const User = () => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { getRecords, records, loading } = recordContext;
  const { user } = authContext;

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
      if (!total.includes(elem.collectionName)) {
        total.push(elem.collectionName);
      }
    });
    return total.length;
  };

  const calcEarliestDate = () => {
    let earliest = Date.now();
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

    const result = new Date(earliest);

    return [
      `${result.getUTCDay()}/${result.getMonth()}/${result.getFullYear()}`,
      ' , ',
      title,
    ];
  };
  const calcLatestDate = (value: string) => {
    let latest = Date.now();
    let title: string;
    records.forEach((elem) => {
      if (elem[value] !== null) {
        let current = new Date(elem[value]).getTime();
        console.log(current);
        if (latest < current) {
          console.log(current);
          latest = current;
          title = elem.title;
        }
      }
    });

    const result = new Date(latest);

    return [
      `${result.getUTCDay()}/${result.getMonth()}/${result.getFullYear()}`,
      ' , ',
      title,
    ];
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
    return total / recordsWithPrice;
  };

  const calcHighPrice = () => {
    let highest = 0;
    records.forEach((elem) => {
      if (elem.price !== 0) {
        if (elem.price > highest) {
          highest = elem.price;
        }
      }
    });
    return highest;
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
    return lowest;
  };

  if (!loading && records) {
    return (
      <ul>
        <li>
          Total Items: <span>{records.length}</span>
        </li>
        <li>
          Total Items incl Editions: <span>{calcEditionsTotal()}</span>
        </li>
        <li>
          Number of Collections: <span>{calcCollectionsTotal()}</span>
        </li>
        <li>
          earliest item: <span>{calcEarliestDate()}</span>
        </li>
        <li>
          newest item: <span>{calcLatestDate('date')}</span>
        </li>
        <li>
          avg. price: €<span>{calcAvgPrice()}</span>
        </li>
        <li>
          Highest Price: €<span>{calcHighPrice()}</span>
        </li>
        <li>
          Lowest price: €<span>{calcLowPrice()}</span>
        </li>
        <li>total exhibitions</li>
        <li>total submissions</li>
        <li>
          latest sold<span>{calcLatestDate('sales.soldDate')}</span>
        </li>
        <li>Most popular medium</li>
        <li>Most popular size</li>
        <li>most editions</li>
      </ul>
    );
  } else {
    return <Spinner description='Loading User' />;
  }
};

export default User;
