import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

//Context
import AuthContext from '../../../context/auth/AuthContext';

//MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import makeStyles from '@mui/material/styles/makeStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';

//Components
import LogoutDialog from './LogoutDialog';
import Sidebar from '../sidebar/SideBar';

//MUI Icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Portal from '@mui/material/Portal';
import MenuIcon from '@mui/icons-material/Menu';

//Functions

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#fff',
    marginRight: '2em',
    cursor: 'pointer',
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
  },
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
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const show = useMediaQuery('(max-width:800px)');

  const ThemeToggle = () => {
    return (
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
    );
  };
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
      setShowSidebar(showSidebar);
    };

  const authLinks = (
    <>
      <Link to='/user' className={classes.link}>
        Collection Stats
      </Link>
      <Link to='/gallery' className={classes.link}>
        Gallery
      </Link>
      <Link to='/settings' className={classes.link}>
        Settings
      </Link>
      <ThemeToggle />
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
            <>
              <ThemeToggle />
              {isAuthenticated && (
                <IconButton aria-label='Menu' onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}
            </>
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
