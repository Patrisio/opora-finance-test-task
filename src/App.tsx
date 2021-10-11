import React, { useEffect, useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { TablePagination as Pagination } from '@mui/material';
import Alert from '@mui/material/Alert';

import Filters from './components/Filters';
import Table, { Column } from './components/Table';

import { useActions } from'./hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { convertTimestampToDate } from './utils';
import { DEFAULT_PAGE_NUMBER, DEFAULT_ROWS_PER_PAGE } from './constants';

import './App.css';

export default function App() {
  const {
    filters, selectedFilters, adminOrdersLoading,
    adminOrdersLength, adminOrders, filtersError, adminOrdersError,
  } = useTypedSelector(state => state.adminOrdersSlice);
  const {
    fetchFilters, resetSelectedFilters,
    updateSelectedFilters, fetchAdminOrders,
  } = useActions();
  const [pageNumber, updatePageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);

  const handleRowPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSelectedFilters({
      limit: +event.target.value,
      offset: 0,
    });
    updatePageNumber(DEFAULT_PAGE_NUMBER);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    updatePageNumber(newPage);
    updateSelectedFilters({ offset: newPage * selectedFilters.limit });
  };

  const renderAlert = () => {
    const errorMessage = filtersError || adminOrdersError;
    return errorMessage && <Alert severity='error'>{ errorMessage }</Alert>;
  };

  const columns: Column[] = [
    {
      id: 'publicID',
      label: 'Публичный ID ордера',
      minWidth: 170,
    },
    {
      id: 'createdDate',
      label: 'Время создания',
      minWidth: 100,
      format: (value: number) => convertTimestampToDate(value),
    },
    {
      id: 'orderType',
      label: 'Тип ордера',
      minWidth: 170,
    },
    {
      id: 'direction',
      label: 'Направление',
      minWidth: 170,
    },
    {
      id: 'statusName',
      label: 'Статус',
      minWidth: 170,
    },
    {
      id: 'amount',
      label: 'Сумма',
      minWidth: 170,
    },
    {
      id: 'city',
      label: 'Город',
      minWidth: 170,
    },
    {
      id: 'userPrivateName',
      label: 'Имя пользователя',
      minWidth: 170,
    },
  ];

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchAdminOrders(selectedFilters);
  }, [selectedFilters.limit, selectedFilters.offset]);

  return (
    <Container>
      { renderAlert() }

      <Typography
        variant='h4'
        gutterBottom
        component='div'
      >
        Список заявок транзакций
      </Typography>

      <Box sx={{ flexWrap: 'wrap' }}>
        <Filters
          filters={filters}
          getData={fetchAdminOrders}
          resetFilters={resetSelectedFilters}
        />
      </Box>

      <Table
        columns={columns}
        rows={adminOrders || []}
        isLoading={adminOrdersLoading}
      />

      <Pagination
        rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE}
        component='div'
        count={adminOrdersLength}
        rowsPerPage={selectedFilters.limit}
        page={pageNumber}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowPerPageChange}
      />
    </Container>
  );
}