import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import PrivateRoute from './components/routing/PrivateRoute.js';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import User from './components/pages/User/User';
import Gallery from './components/pages/Gallery/Gallery';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts/Alerts';
import AlertState from './context/alert/AlertState';
import RecordState from './context/record/RecordState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

import { ThemeProvider } from 'styled-components';
import { ColorVariables, DarkModeColorVariables } from './variables';

import 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './App.scss';

localStorage.token && setAuthToken(localStorage.token);

const App = () => {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeProvider
      theme={theme === true ? ColorVariables : DarkModeColorVariables}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AuthState>
          <RecordState>
            <AlertState>
              <Router>
                <Navbar
                  title='Ed Miliano Archive'
                  setTheme={setTheme}
                  theme={theme}
                />
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/user' component={User} />
                  <PrivateRoute exact path='/gallery' component={Gallery} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </Router>
            </AlertState>
          </RecordState>
        </AuthState>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
