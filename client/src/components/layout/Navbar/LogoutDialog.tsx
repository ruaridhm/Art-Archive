import React, { useContext } from 'react';
//Material UI
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';

//Context
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
import Typography from '@material-ui/core/Typography/Typography';

interface LogoutDialogProps {
  open: boolean;
  handleClose: () => void;
}

const LogoutDialog = ({ open, handleClose }: LogoutDialogProps) => {
  const authContext = useContext(AuthContext);
  const recordContext = useContext(RecordContext);
  const { logout } = authContext;
  const { clearRecords } = recordContext;

  const onLogout = () => {
    logout();
    clearRecords();
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='Confirm Logout'>
      <DialogTitle id='logout-confirm-title'>
        <Typography>Are you sure you want to logout?</Typography>
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose();
            onLogout();
          }}
          color='primary'
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
