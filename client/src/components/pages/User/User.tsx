import React, { useContext, useEffect } from 'react';
import Spinner from '../../layout/Spinner/Spinner';
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
import { UserStatsContainer, UserTitle, UserStats, UserStat } from './Style';

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

  if (!loading) {
    return (
      <ul>
        <li>Total Items</li>
        <li>Total Items incl Editions</li>
        <li>Number of Collections</li>
        <li>earliest item</li>
        <li>newest item</li>
        <li>avg. price</li>
        <li>Most expensive</li>
        <li>Lowest price</li>
        <li>total exhibitions</li>
        <li>total submissions</li>
        <li>latest sold</li>
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
