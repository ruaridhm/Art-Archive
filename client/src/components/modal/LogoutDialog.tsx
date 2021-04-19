import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
//Context
import AuthContext from '../../context/auth/AuthContext';
import RecordContext from '../../context/record/RecordContext';

const LogoutDialog = (toggleModal: any) => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { logout } = authContext;
  const { clearRecords } = recordContext;

  const handleClose = () => {
    // toggleModal
  };

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
        {'Are you sure you want to logout?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose();
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
