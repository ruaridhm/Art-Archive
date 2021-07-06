import React, { Fragment } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';

const StyledTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const FilterToolTip = () => {
  return (
    <StyledTooltip
      title={
        <Fragment>
          <Typography color='primary'>Filterable Categories:</Typography>
          <ul>
            <li>Title</li>
            <li>Artist</li>
            <li>Reference</li>
            <li>Collection Name</li>
            <li>Size</li>
            <li>Medium</li>
            <li>Location</li>
            <li>Notes</li>
            <li>Sold To</li>
            <li>Sold By</li>
          </ul>
        </Fragment>
      }
    >
      <Button>
        <HelpIcon color='primary' />
      </Button>
    </StyledTooltip>
  );
};

export default FilterToolTip;
