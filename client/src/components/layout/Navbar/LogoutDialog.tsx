import React, { useContext } from 'react';
//Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material//DialogActions/DialogActions';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';

//Context
import AuthContext from '../../../context/auth/AuthContext';
import RecordContext from '../../../context/record/RecordContext';
import Typography from '@mui/material/Typography';

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
