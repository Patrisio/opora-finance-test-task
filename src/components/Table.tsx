import React from 'react';
import Paper from '@mui/material/Paper';
import { Table as MaterialTable } from '@mui/material';
import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';

export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  format?: (value: number) => string,
};

type TableProps = {
  columns: Column[],
  rows: any,
  isLoading?: boolean,
};

export default function Table({ columns, rows, isLoading }: TableProps) {
  const tableColumns = columns.map((column) => (
    <TableCell
      key={column.id}
      style={{ minWidth: column.minWidth }}
    >
      {column.label}
    </TableCell>
  ));

  const getTableCellValue = (column: Column, value: string | number) => {
    return column.format && typeof value === 'number'
      ? column.format(value * 1000)
      : value;
  };

  const tableRows = rows.length > 0 ?
    rows.map((row: any) => {
      return (
        <TableRow
          hover
          role='checkbox'
          tabIndex={-1}
          key={row.orderID}
        >
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={column.id}>
                { getTableCellValue(column, value) }
              </TableCell>
            );
          })}
        </TableRow>
      );
    }) :
    <Typography
      variant='h6'
      gutterBottom
      component='div'
    >
      Нет данных
    </Typography>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <MaterialTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              { tableColumns }
            </TableRow>
          </TableHead>

          <TableBody>
            { isLoading ? <CircularProgress /> : tableRows }
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </Paper>
  );
}