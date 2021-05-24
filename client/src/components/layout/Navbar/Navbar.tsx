import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

//Context
import AuthContext from '../../../context/auth/AuthContext';

//Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';

//Components
import LogoutDialog from './LogoutDialog';
import Sidebar from '../../sidebar/Sidebar';

//Material-UI Icons
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Portal from '@material-ui/core/Portal/Portal';
import MenuIcon from '@material-ui/icons/Menu';

//Fumctions

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#fff',
    marginRight: '2em',
    '&:hover': {
      textDecoration: 'underline',
      opacity: '0.9',
    },
  },
  menuRight: {
    flexGrow: 1,
  },
  switchBase: {
    marginRight: '1.25em',
    color: '#000',
    '&$checked': {
      color: 'red',
    },
  },
  hamburger: {},
});
interface NavbarProps {
  title: string;
  setTheme: any;
  theme: boolean;
}

const Navbar = ({ title, theme, setTheme }: NavbarProps) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const classes = useStyles();
  const [showLogoutDialog, setShowLogoutDialog] = useState<Boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const show = useMediaQuery('(max-width:800px)');

  const toggleDrawer =
    (showSidebar: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setShowSidebar(!showSidebar);
    };

  const authLinks = (
    <>
      <Link to='/user' className={classes.link}>
        Collection Stats
      </Link>
      <Link to='/gallery' className={classes.link}>
        Gallery
      </Link>
      <Switch
        className={classes.switchBase}
        size='medium'
        icon={<WbSunnyIcon />}
        checkedIcon={<NightsStayIcon />}
        checked={theme}
        onChange={() => {
          setTheme(!theme);
        }}
        name='themeToggle'
        inputProps={{ 'aria-label': 'Theme Toggle' }}
      />
      <Link
        to='#!'
        className={classes.link}
        onClick={() => {
          setShowLogoutDialog(true);
        }}
      >
        Logout
      </Link>
    </>
  );

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h4' className={classes.menuRight}>
            <Link to='/' className={classes.link}>
              {title}
            </Link>
          </Typography>
          {isAuthenticated && !show ? (
            authLinks
          ) : (
            <IconButton aria-label='Menu' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {showLogoutDialog && (
        <Portal>
          <LogoutDialog
            open={showLogoutDialog}
            handleClose={() => {
              setShowLogoutDialog(false);
            }}
          />
          ;
        </Portal>
      )}
      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          toggleDrawer={toggleDrawer}
          setShowLogoutDialog={setShowLogoutDialog}
        />
      )}
    </>
  );
};

export default Navbar;
