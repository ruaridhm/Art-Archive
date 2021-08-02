import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

const StatTable = ({ rows }) => {
  return rows.map((row) => (
    <TableRow key={row.name}>
      <TableCell component='th' scope='row'>
        {row.name}
      </TableCell>
      <TableCell align='right'>{row.value}</TableCell>
      <TableCell align='right'>{row.item}</TableCell>
    </TableRow>
  ));
};

export default StatTable;
