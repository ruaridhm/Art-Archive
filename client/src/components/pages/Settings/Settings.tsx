import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material//Settings';
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const InitialSettingState = {
  title: true,
  artist: false,
  reference: true,
  collectionName: true,
  image: true,
  date: false,
  size: false,
  medium: true,
  price: true,
  currentLocation: false,
  editions: false,
  mediaLinks: false,
  notes: false,
  exhibitions: false,
  submissions: false,
  sales: false,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Settings = () => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value: number, dbName: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push({ value: value, dbName: dbName });
    } else {
      console.log('else');
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const listItems = [
    { text: 'Title', value: 0, dbName: 'title' },
    { text: 'Artist', value: 1, dbName: 'artist' },
    { text: 'Reference', value: 2, dbName: 'reference' },
    { text: 'Collection Name', value: 3, dbName: 'collectionName' },
    { text: 'Image', value: 4, dbName: 'image' },
    { text: 'Date', value: 5, dbName: 'date' },
    { text: 'Size', value: 6, dbName: 'size' },
    { text: 'Medium', value: 7, dbName: 'medium' },
    { text: 'Price', value: 8, dbName: 'price' },
    { text: 'Current Location', value: 9, dbName: 'currentLocation' },
    { text: 'Editions', value: 10, dbName: 'editions' },
    // { text: 'Media Links', value: 11, dbName:'mediaLinks' },
    // { text: 'Notes', value: 12, dbName:'notes' },
    // { text: 'Exhibitions', value: 13, dbName:'exhibitions' },
    // { text: 'Submissions', value: 14, dbName:'submissions' },
    // { text: 'Sales', value: 15, dbName:'sales' },
  ];

  return (
    <div>
      <h2>
        <SettingsIcon /> Settings
      </h2>
      <h3>Item tile settings</h3>
      <p>Select upto 5 items to include in the item tile (order matters)</p>
      <List className={classes.root}>
        {listItems.map((item) => {
          const labelId = `checkbox-list-label-${item.text.toLowerCase()}`;

          return (
            <ListItem
              key={item.value}
              role={undefined}
              dense
              button
              onClick={handleToggle(item.value, item.dbName)}
            >
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={checked.indexOf(item.value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Settings;
