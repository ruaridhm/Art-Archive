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
      <UserStatsContainer>
        <UserTitle>User Stats</UserTitle>
        <UserStats>
          <UserStat>
            <strong>User name: </strong>
            {user && user.name}
          </UserStat>
          <UserStat>
            <strong>Total records: </strong>
            {records && records.length}
          </UserStat>
          <UserStat>
            <strong>Highest Price: </strong>
            {records && records.length}
          </UserStat>
          <UserStat>
            <strong>Average Price: </strong>
            {records && records.length}
          </UserStat>
          <UserStat>
            <strong>Most Common Medium: </strong>
            {records && records.length}
          </UserStat>
          <UserStat>
            <strong>Most Exhibited: </strong>
            {records && records.length}
          </UserStat>
          <UserStat>
            <strong>Most Submissions: </strong>
            {records && records.length}
          </UserStat>
        </UserStats>
      </UserStatsContainer>
    );
  } else {
    return <Spinner />;
  }
};

export default User;
