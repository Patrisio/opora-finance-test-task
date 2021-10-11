import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Filters from './components/Filters';
import Table, { Column } from './components/Table';

import { useActions } from'./hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

import './App.css';

export default function App() {
  const { filters, adminOrders } = useTypedSelector(state => state.adminOrdersSlice);
  const { fetchFilters, resetSelectedFilters, fetchAdminOrders } = useActions();

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom component="div">
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
        pagination={{
          rowsPerPage: 10,
          page: 1,
        }}
        rows={adminOrders}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Container>
  );
}