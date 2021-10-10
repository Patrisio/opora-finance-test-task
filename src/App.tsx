import React from 'react';
import Container from '@mui/material/Container';
import Filters from './components/Filters';
import { Filter } from './types';
import './App.css';

export default function App() {
  const filters: Filter[] = [
    {
      type: 'select',
      filterName: 'statusGroupList',
      label: 'Выбор статуса',
      options: [],
    },
    {
      type: 'multiselect',
      filterName: 'toChangeStatusGroupID',
      label: 'Добавить теги',
      options: [],
    },
    {
      type: 'select',
      filterName: 'orderBy',
      label: 'Сортировка',
      options: [],
    },
    {
      type: 'input',
      filterName: 'publicID',
      label: 'ID заявки',
    },
    {
      type: 'select',
      filterName: 'operationTypeID',
      label: 'Тип операции',
      options: [],
    },
    {
      type: 'select',
      filterName: 'currencyID',
      label: 'Валюта',
      options: [],
    },
  ];

  return (
    <Container>
      <Filters filters={filters} />
    </Container>
  );
}