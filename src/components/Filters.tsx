import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { SelectChangeEvent } from '@mui/material';
import Select from './Select';
import MultiSelect from './MultiSelect';
import Input from './Input';
import Datepicker from './Datepicker';
import { Filter, Option } from '../types';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { convertDateToTimestamp } from '../utils';

type FiltersProps = {
  filters: Filter[],
};

export default function Filters({ filters }: FiltersProps) {
  const { selectedFilters } = useTypedSelector(state => state.adminOrdersSlice);
  const { updateSelectedFilters } = useActions();

  const handleChange = (filterName: string, value: string | number | number[]) => {
    updateSelectedFilters({ [filterName]: value });
  };

  const getFilterValue = (filterValue: number[], filterData: Option[]) => {
    const formattedValues = [];

    for (let filterItem of filterValue) {
      const foundFilterValue = filterData.find(item => item.ID === filterItem);
      if (foundFilterValue) {
        formattedValues.push(JSON.stringify({
          ID: foundFilterValue.ID,
          name: foundFilterValue.name,
        }));
      }
    }

    return formattedValues;
  };

  const renderFilter = (filter: Filter) => {
    switch (filter.type) {
      case 'input':
        return (
          <Grid item xs={3}>
            <Input
              key={filter.filterName}
              label={filter.label}
              value={selectedFilters[filter.filterName] as string}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                handleChange(filter.filterName, value);
              }}
            />
          </Grid>
        );
      case 'select':
        return (
          <Grid item xs={2}>
            <Select
              key={filter.filterName}
              options={filter.options as Option[]}
              label={filter.label}
              value={selectedFilters[filter.filterName] as string}
              onChange={(event: SelectChangeEvent<string | number>) => {
                const selectedValue = event.target.value;
                handleChange(filter.filterName, selectedValue)
              }}
            />
          </Grid>
        );
      case 'multiselect':
        return (
          <Grid item xs={3}>
            <MultiSelect
              key={filter.filterName}
              options={filter.options as Option[]}
              label={filter.label}
              value={getFilterValue(selectedFilters[filter.filterName] as number[], filter.options as Option[]) as string[]}
              onChange={(event: SelectChangeEvent<string[]>) => {
                const values = event.target.value as string[];
                const selectedValues: number[] = values.map(selectedValue => JSON.parse(selectedValue).ID);
                handleChange(filter.filterName, selectedValues);
              }}
            />
          </Grid>
        );
      case 'date':
        return (
          <Grid item xs={2}>
            <Datepicker
              key={filter.filterName}
              onChange={(date: Date | null) => {
                console.log(date, '__DATE__');
                const timestamp = convertDateToTimestamp(String(date));
                handleChange(filter.filterName, timestamp);
              }}
              label={filter.label}
              value={selectedFilters[filter.filterName] as Date | null}
            />
          </Grid>
        );
    }
  };

  return (
    // <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
    //   { filters.map(filter => renderFilter(filter)) }
    // </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        { filters.map(filter => renderFilter(filter)) }
      </Grid>
    </Box>
  );
}