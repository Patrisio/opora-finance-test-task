import React from 'react';
import Box from '@mui/material/Box';
import Select from './Select';
import MultiSelect from './MultiSelect';
import Input from './Input';
import Datepicker from './Datepicker';
import { Filter, Option } from '../types';

type FiltersProps = {
  filters: Filter[],
};

export default function Filters({ filters }: FiltersProps) {
  const renderFilter = (filter: Filter) => {
    switch (filter.type) {
      case 'input':
        return (
          <Input
            key={filter.filterName}
            label={filter.label}
          />
        );
      case 'select':
        return (
          <Select
            key={filter.filterName}
            options={filter.options as Option[]}
            label={filter.label}
          />
        );
      case 'multiselect':
        return (
          <MultiSelect
            key={filter.filterName}
            options={filter.options as Option[]}
            label={filter.label}
          />
        );
      case 'date':
        return <Datepicker key={filter.filterName}/>;
    }
  };
  console.log(filters, '__INTO__');
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      { filters.map(filter => renderFilter(filter)) }
    </Box>
  );
}