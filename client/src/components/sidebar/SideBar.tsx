import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//Context
import AuthContext from '../../context/auth/AuthContext';

const useStyles = makeStyles({
  list: {
    width: 250,
    maxWidth: '33vw',
  },
  fullList: {
    width: 'auto',
  },
});

const ListItemLink = (props) => {
  return <ListItem button component={Link} to={props.to} {...props} />;
};

interface SidebarInterface {
  showSidebar: boolean;
  toggleDrawer: (
    showSidebar: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;

  setShowLogoutDialog: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Sidebar = ({
  showSidebar,
  toggleDrawer,
  setShowLogoutDialog,
}: SidebarInterface) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const classes = useStyles();

  return (
    <Drawer anchor='right' open={showSidebar} onClose={toggleDrawer(false)}>
      <div
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {isAuthenticated && (
          <>
            <List className={classes.list}>
              <ListItemLink button to='/'>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemLink>

              <ListItemLink button to='/user'>
                <ListItemIcon>
                  <BubbleChartIcon />
                </ListItemIcon>
                <ListItemText primary='Collection Stats' />
              </ListItemLink>
              <ListItemLink button to='/gallery'>
                <ListItemIcon>
                  <PhotoLibraryIcon />
                </ListItemIcon>
                <ListItemText primary='Gallery' />
              </ListItemLink>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => {
                  setShowLogoutDialog(true);
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            </List>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default Sidebar;
