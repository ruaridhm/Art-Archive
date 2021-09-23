import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import User from './components/pages/User/User';
import Gallery from './components/pages/Gallery/Gallery';
import Settings from './components/pages/Settings/Settings';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts/Alerts';
import AlertState from './context/alert/AlertState';
import RecordState from './context/record/RecordState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import { CloudinaryContext } from 'cloudinary-react';
//Material UI
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//Date functionality
import 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '@fontsource/roboto';
import LogRocket from 'logrocket';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


localStorage.token && setAuthToken(localStorage.token);

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [palette, setPalette] = useState(prefersDarkMode);
  LogRocket.init('2n9oqs/art-archive');
  const theme = React.useMemo(
    () =>
      createTheme(adaptV4Theme({
        typography: {
          fontFamily: 'roboto',
        },
        palette: {
          mode: palette ? 'dark' : 'light',
        },
      })),
    [palette]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AuthState>
            <RecordState>
              <AlertState>
                <CloudinaryContext
                  cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                >
                  <Router>
                    <Navbar
                      title='Archive'
                      setTheme={setPalette}
                      theme={palette}
                    />
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path='/' component={Home} />
                      <PrivateRoute exact path='/user' component={User} />
                      <PrivateRoute exact path='/gallery' component={Gallery} />
                      <PrivateRoute exact path='/settings' component={Settings} />
                      <Route exact path='/login' component={Login} />
                    </Switch>
                  </Router>
                </CloudinaryContext>
              </AlertState>
            </RecordState>
          </AuthState>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
