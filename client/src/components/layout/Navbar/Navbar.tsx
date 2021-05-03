import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/AuthContext';

//Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import makeStyles from '@material-ui/core/styles/makeStyles';
//Components
import LogoutDialog from './LogoutDialog';

//Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu';
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
  switch: {
    marginRight: '1.25em',
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
  toggleTheme: () => void;
}

const Navbar = ({ title, toggleTheme }: NavbarProps) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const classes = useStyles();
  const [showLogoutDialog, setShowLogoutDialog] = useState<Boolean>(false);

  const authLinks = (
    <>
      <StyledLink to='/user'>Collection Stats</StyledLink>
      <StyledLink to='/gallery'>Gallery</StyledLink>
      <Switch
        className={classes.switch}
        // color='#f90'
        icon={<WbSunnyIcon />}
        checkedIcon={<NightsStayIcon />}
        checked={true}
        onChange={() => {}}
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
      <Switch
        // color='#f90'
        icon={<WbSunnyIcon />}
        checkedIcon={<NightsStayIcon />}
        checked={true}
        onChange={() => {}}
        name='themeToggle'
        inputProps={{ 'aria-label': 'Theme Toggle' }}
      />
      <StyledLink to='/login'>Login</StyledLink>
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
