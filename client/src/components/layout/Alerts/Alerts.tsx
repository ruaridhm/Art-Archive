import React, { useContext } from 'react';
import AlertContext from '../../../context/alert/AlertContext';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    danger: {
      background: '#db302d',
      padding: '0.7em',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '1em',
      marginBottom: '1em',
      opacity: '0.85',
      borderRadius: '0.5em',
      alignSelf: 'centre',
    },
    success: {
      background: '#14a837',
      padding: '0.7em',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '1em',
      marginBottom: '1em',
      opacity: '0.85',
      borderRadius: '0.5em',
      alignSelf: 'centre',
    },
  })
);

const Alerts: Function = () => {
  const alertContext = useContext(AlertContext);
  const classes = useStyles();

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <Container key={alert.id} className={classes.danger}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </Container>
    ))
  );
};

export default Alerts;
