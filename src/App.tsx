import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
// import { TablePagination as Pagination } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Pagination } from 'antd';

import Filters from './components/Filters';
import { MemoizedTable, Column } from './components/Table';

import { useActions } from'./hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { convertTimestampToDate } from './utils';
import { DEFAULT_PAGE_NUMBER, DEFAULT_ROWS_PER_PAGE } from './constants';

import './App.css';
import { SelectedFilters } from './store/adminOrdersSlice';

export default function App() {
  const {
    filters, selectedFilters, adminOrdersLoading,
    adminOrdersLength, adminOrders, filtersError, adminOrdersError,
  } = useTypedSelector(state => state.adminOrders);
  const {
    fetchFilters, resetSelectedFilters,
    updateSelectedFilters, fetchAdminOrders,
  } = useActions();
  const [pageNumber, updatePageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);

  const handlePageChange = (page: number, size: number | undefined) => {
    if (size && (size !== selectedFilters.limit)) {
      updateSelectedFilters({
        limit: size,
        offset: 0,
      });
      updatePageNumber(DEFAULT_PAGE_NUMBER);
      return;
    }

    updatePageNumber(page);
    updateSelectedFilters({ offset: (page - 1) * selectedFilters.limit });
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
      format: null,
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
      format: null,
    },
    {
      id: 'direction',
      label: 'Направление',
      minWidth: 170,
      format: null,
    },
    {
      id: 'statusName',
      label: 'Статус',
      minWidth: 170,
      format: null,
    },
    {
      id: 'amount',
      label: 'Сумма',
      minWidth: 170,
      format: null,
    },
    {
      id: 'city',
      label: 'Город',
      minWidth: 170,
      format: null,
    },
    {
      id: 'userPrivateName',
      label: 'Имя пользователя',
      minWidth: 170,
      format: null,
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
          getData={(selectedFilters: SelectedFilters) => {
            updatePageNumber(DEFAULT_PAGE_NUMBER);
            fetchAdminOrders({
              ...selectedFilters,
              offset: 0,
            });
          }}
          resetFilters={resetSelectedFilters}
        />
      </Box>

      <MemoizedTable
        columns={columns}
        rows={adminOrders || []}
        isLoading={adminOrdersLoading}
      />

      <Pagination
        total={adminOrdersLength}
        current={pageNumber}
        defaultCurrent={DEFAULT_PAGE_NUMBER}
        pageSizeOptions={DEFAULT_ROWS_PER_PAGE}
        pageSize={selectedFilters.limit}
        showSizeChanger
        onChange={handlePageChange}
      />
    </Container>
  );
}