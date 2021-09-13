import React, { useState, useContext, useEffect } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import statRows from './statRows';
import RecordContext from '../../../context/record/RecordContext';
export interface TableRowInterface {
  name: string;
  value: string | number;
  item?: string;
}

const StatTable = () => {
  const recordContext = useContext(RecordContext);
  const { records } = recordContext;
  const [tableRows, setTableRows] = useState<TableRowInterface[]>([]);

  useEffect(() => {
    if (records !== null) {
      setTableRows(statRows(records));
    }
  }, [records]);

  return (
    <>
      {tableRows.map(
        (row: { name: string; value: string | number; item?: string }) => (
          <TableRow key={row.name}>
            <TableCell component='th' scope='row'>
              {row.name}
            </TableCell>
            <TableCell align='right'>{row.value}</TableCell>
            <TableCell align='right'>{row.item}</TableCell>
          </TableRow>
        )
      )}
    </>
  );
};

export default StatTable;
