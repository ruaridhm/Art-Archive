import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { tableRowInterface } from './User';
interface StatTableInterface {
  rows: [] | tableRowInterface[];
}

const StatTable = ({ rows }: StatTableInterface) => {
  return (
    <>
      {rows.map((row) => (
        <TableRow key={row.name}>
          <TableCell component='th' scope='row'>
            {row.name}
          </TableCell>
          <TableCell align='right'>{row.value}</TableCell>
          <TableCell align='right'>{row.item}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default StatTable;
