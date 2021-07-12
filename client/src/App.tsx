import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import PrivateRoute from './components/routing/PrivateRoute';
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
//Material UI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//Date functionality
import 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '@fontsource/roboto';

localStorage.token && setAuthToken(localStorage.token);

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [palette, setPalette] = useState(prefersDarkMode);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontFamily: 'roboto',
        },
        palette: {
          type: palette ? 'dark' : 'light',
        },
      }),
    [palette]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AuthState>
          <RecordState>
            <AlertState>
              <Router>
                <Navbar title='Archive' setTheme={setPalette} theme={palette} />
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
