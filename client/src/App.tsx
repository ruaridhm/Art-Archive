import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute.js';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import User from './components/pages/User/User';
import Gallery from './components/pages/Gallery/Gallery';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts/Alerts';
import AlertState from './context/alert/AlertState';
import RecordState from './context/record/RecordState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

import SideBar from './components/hamburger/SideBar';

import { ThemeProvider } from 'styled-components';
import { ColorVariables, DarkModeColorVariables } from './variables';

import './App.scss';

localStorage.token && setAuthToken(localStorage.token);

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeProvider
      theme={theme === 'light' ? ColorVariables : DarkModeColorVariables}
    >
      <AuthState>
        <RecordState>
          <AlertState>
            <Router>
              <Fragment>
                <SideBar pageWrapId='page-wrap' outerContainerId='App' />
                <Navbar title='Ed Miliano' toggleTheme={toggleTheme} />
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/user' component={User} />
                  <PrivateRoute exact path='/gallery' component={Gallery} />
                  <PrivateRoute exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </Fragment>
            </Router>
          </AlertState>
        </RecordState>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;
