import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { useTypedSelector } from './hooks/useTypedSelector';
import Container from '@mui/material/Container';
import Filters from './components/Filters';
import { useActions } from'./hooks/useActions';
import './App.css';

export default function App() {
  const { filters } = useTypedSelector(state => state.adminOrdersSlice);
  const { fetchFilters, resetSelectedFilters, fetchAdminOrders } = useActions();

  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <Container>
      <Box sx={{ flexWrap: 'wrap' }}>
        <Filters
          filters={filters}
          getData={fetchAdminOrders}
          resetFilters={resetSelectedFilters}
        />
      </Box>
    </Container>
  );
}