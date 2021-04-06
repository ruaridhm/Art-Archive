import React, { useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import RecordContext from '../../context/record/RecordContext';
import mainLogo from '../../images/Logo.png';

import { SideBarLogo } from './Style';

type SidebarProps = {
  pageWrapId: string;
  outerContainerId: string;
};

const SideBar = () => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearRecords } = recordContext;

  const onLogout = () => {
    logout();
    clearRecords();
  };

  if (isAuthenticated) {
    return (
      <Menu right>
        <Link to='/'>
          <SideBarLogo src={mainLogo} alt='Ed Miliano Archive' />
        </Link>

        <Link to='/register'>Register New User</Link>

        <Link to='/user'>Collection Stats. {user && user.name}</Link>

        <Link to='/gallery'>Gallery</Link>

        <Link onClick={onLogout} to='#!'>
          <i className='fas fa-sign-out-alt'></i> <span>Logout</span>
        </Link>
      </Menu>
    );
  } else {
    return (
      <Menu right>
        <Link to='/'>
          <SideBarLogo src={mainLogo} alt='Ed Miliano Archive' />
        </Link>

        <Link to='/login'>Login</Link>
      </Menu>
    );
  }
};
export default SideBar;
