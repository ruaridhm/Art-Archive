import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
//Material-UI
import AppBar from '@material-ui/core/AppBar';

interface NavbarProps {
  title: string;
  toggleTheme: () => void;
}
