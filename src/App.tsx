import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from './hooks/useTypedSelector';
import Container from '@mui/material/Container';
import Filters from './components/Filters';
import { fetchFilters } from './store/adminOrdersSlice';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const { filters } = useTypedSelector(state => state.adminOrdersSlice);
  
  useEffect(() => {
    dispatch(fetchFilters());
  }, [dispatch]);

  return (
    <Container>
      <Filters filters={filters} />
    </Container>
  );
}