import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ToggleSwitch from '../../toggleSwitch/ToggleSwitch';
import ModalPortal from '../../modal/ModalPortal';

import {
  NavbarContainer,
  NavLinkList,
  NavLinkListRight,
  NavListItem,
  NavTitle,
  ThemeToggleContainer,
} from './Style';
import LogoutDialog from '../../modal/LogoutDialog';

interface NavbarProps {
  title: string;
  toggleTheme: () => void;
}

const Navbar = ({ title, toggleTheme }: NavbarProps) => {
  const authContext = useContext(AuthContext);
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState<boolean>(
    false
  );
  const { isAuthenticated } = authContext;

  const [mode, setMode] = useState(false);

  const toggleModal = () => {
    setShowLogoutConfirmModal(!showLogoutConfirmModal);
  };

  const authLinks = (
    <Fragment>
      <NavListItem>
        <Link to='/user'>Collection Stats.</Link>
      </NavListItem>
      <NavListItem>
        <Link to='/gallery'>Gallery</Link>
      </NavListItem>
      <NavListItem>
        <ToggleSwitch
          name='newsletter'
          onValue={
            <FontAwesomeIcon icon={faMoon} style={{ color: '#121212' }} />
          }
          offValue={<FontAwesomeIcon icon={faSun} style={{ color: '#f90' }} />}
          checked={mode}
          onChange={() => {
            setMode(!mode);
            toggleTheme();
          }}
          icon
        />
      </NavListItem>
      <NavListItem>
        <Link
          onClick={() => {
            toggleModal();
          }}
          to='#!'
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className=''>Logout</span>
        </Link>
      </NavListItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavListItem>
        <Link to='/login'>Login</Link>
      </NavListItem>
      <NavListItem>
        <ToggleSwitch
          name='newsletter'
          onValue={
            <FontAwesomeIcon icon={faMoon} style={{ color: '#121212' }} />
          }
          offValue={<FontAwesomeIcon icon={faSun} style={{ color: '#f90' }} />}
          checked={mode}
          onChange={() => {
            setMode(!mode);
            toggleTheme();
          }}
          icon
        />
      </NavListItem>
    </Fragment>
  );

  return (
    <>
      <NavbarContainer>
        <NavLinkList>
          <NavListItem>
            <Link to='/'>
              <NavTitle>{title}</NavTitle>
            </Link>
          </NavListItem>
        </NavLinkList>
        <NavLinkListRight>
          {isAuthenticated ? authLinks : guestLinks}
        </NavLinkListRight>

        <ThemeToggleContainer>
          <ToggleSwitch
            name='newsletter'
            onValue={
              <FontAwesomeIcon icon={faMoon} style={{ color: '#121212' }} />
            }
            offValue={
              <FontAwesomeIcon icon={faSun} style={{ color: '#f90' }} />
            }
            checked={mode}
            onChange={() => {
              setMode(!mode);
              toggleTheme();
            }}
            icon
          />
        </ThemeToggleContainer>
      </NavbarContainer>

      {showLogoutConfirmModal && (
        <ModalPortal>
          <LogoutDialog toggleModal={toggleModal} />
        </ModalPortal>
      )}
    </>
  );
};

export default Navbar;
