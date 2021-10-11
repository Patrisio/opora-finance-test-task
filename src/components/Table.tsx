import React from 'react';
import Paper from '@mui/material/Paper';
import { Table as MaterialTable }from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export type Column = {
  id: string;
  label: string;
  minWidth?: number;
};

type Pagination = {
  page: number,
  rowsPerPage: number,
};

type TableProps = {
  columns: Column[],
  pagination: Pagination,
  rows: any,
  onPageChange: any,
  onRowsPerPageChange: any,
};

export default function Table({
  columns, pagination, rows,
  onPageChange, onRowsPerPageChange,
}: TableProps) {
  const { page, rowsPerPage } = pagination;

  const tableColumns = columns.map((column) => (
    <TableCell
      key={column.id}
      // align={column.align}
      style={{ minWidth: column.minWidth }}
    >
      {column.label}
    </TableCell>
  ));

  const tableRows = rows
    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
    .map((row: any) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={column.id}>
                { value }
              </TableCell>
            );
          })}
        </TableRow>
      );
    });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MaterialTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              { tableColumns }
            </TableRow>
          </TableHead>

          <TableBody>
            { tableRows }
          </TableBody>
        </MaterialTable>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}