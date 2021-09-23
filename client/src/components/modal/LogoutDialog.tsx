import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
//Context
import AuthContext from '../../context/auth/AuthContext';
import RecordContext from '../../context/record/RecordContext';

const LogoutDialog = (toggleModal: any) => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { logout } = authContext;
  const { clearRecords } = recordContext;

  const onLogout = () => {
    logout();
    clearRecords();
  };

  return (
    <Dialog
      open={toggleModal}
      onClose={toggleModal}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        'Are you sure you want to logout?'
      </DialogTitle>
      <DialogActions>
        <Button onClick={toggleModal} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            toggleModal();
            onLogout();
          }}
          color='primary'
          autoFocus
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LogoutDialog;
