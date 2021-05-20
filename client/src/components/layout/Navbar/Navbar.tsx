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
//Components
import LogoutDialog from './LogoutDialog';

//Material-UI Icons
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Portal from '@material-ui/core/Portal/Portal';

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
});

interface StyledLinkInterface {
  to: string;
  children: any;
  onClick?: () => void;
}

const StyledLink = ({ to, children, onClick }: StyledLinkInterface) => {
  const classes = useStyles();
  return (
    <Link className={classes.link} to={to} onClick={onClick}>
      {children}
    </Link>
  );
};

interface NavbarProps {
  title: string;
  setTheme: any;
  theme: boolean;
}

const Navbar = ({ title, setTheme, theme }: NavbarProps) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const classes = useStyles();
  const [showLogoutDialog, setShowLogoutDialog] = useState<Boolean>(false);

  const authLinks = (
    <>
      <StyledLink to='/user'>Collection Stats</StyledLink>
      <StyledLink to='/gallery'>Gallery</StyledLink>
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
      <StyledLink
        to='#!'
        onClick={() => {
          setShowLogoutDialog(true);
        }}
      >
        Logout
      </StyledLink>
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
    </>
  );
  const guestLinks = (
    <>
      {/* <Switch
        size='small'
        color='secondary'
        icon={<WbSunnyIcon />}
        checkedIcon={<NightsStayIcon />}
        checked={theme}
        onChange={() => {
          setTheme(!theme);
        }}
        name='themeToggle'
        inputProps={{ 'aria-label': 'Theme Toggle' }}
      />
      <StyledLink to='/login'>Login</StyledLink> */}
    </>
  );

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h4' className={classes.menuRight}>
          <StyledLink to='/'>{title}</StyledLink>
        </Typography>

        {isAuthenticated ? authLinks : guestLinks}

        {/* <IconButton>
            <MenuIcon />
          </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
