import React, { useEffect, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material';

import AutoComplete from './AutoComplete';
import Select from './Select';
import MultiSelect from './MultiSelect';
import Input from './Input';
import Datepicker from './Datepicker';

import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

import { Filter, Option } from '../types';
import { convertDateToTimestamp, isCorrectDate } from '../utils';
import { SelectedFilters } from '../store/adminOrdersSlice';

type FiltersProps = {
  filters: Filter[],
  getData: (selectedFilters: SelectedFilters) => void,
  resetFilters: () => void,
};

export default function Filters({ filters, getData, resetFilters }: FiltersProps) {
  const { selectedFilters, adminOrdersLoading, filtersLoading } = useTypedSelector(state => state.adminOrders);
  const { updateSelectedFilters } = useActions();

  const isDisabled = filtersLoading || adminOrdersLoading;

  const handleChange = (filterName: string, value: string | number | number[] | null) => {
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
      case 'autocomplete':
        const getOptions = (options: Option[]) => options.map((option) => ({ value: option.name }));
        const getIdByValue = (options: Option[], value: string) => {
          const foundOption = options.find(option => option.name.toLowerCase() === value?.toLowerCase());
          return foundOption ? foundOption.ID : null;
        };

        return (
          <Grid item xs={2} key={filter.filterName}>
            <AutoComplete
              placeholder={filter.label}
              options={getOptions(filter.options as Option[])}
              onChange={(value: string) => {
                const id = getIdByValue(filter.options as Option[], value);
                handleChange(filter.filterName, id);
              }}
              onBlur={(value: string) => {
                const id = getIdByValue(filter.options as Option[], value);
                handleChange(filter.filterName, id);
              }}
              isDisabled={filtersLoading}
            />
          </Grid>
        );
      case 'input':
        return (
          <Grid item xs={2} key={filter.filterName}>
            <Input
              label={filter.label}
              value={selectedFilters[filter.filterName] as string}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                const formattedValue = filter.inputType === 'number' ?
                  !!Number(value) ? Number(value) : null :
                  value;
                handleChange(filter.filterName, formattedValue);
              }}
              disabled={filtersLoading}
              type={filter.inputType as 'number' | 'text'}
            />
          </Grid>
        );
      case 'select':
        return (
          <Grid item xs={2} key={filter.filterName}>
            <Select
              options={filter.options as Option[]}
              label={filter.label}
              value={selectedFilters[filter.filterName] as string}
              onChange={(event: SelectChangeEvent<string | number>) => {
                const selectedValue = event.target.value;
                handleChange(filter.filterName, selectedValue)
              }}
              readOnly={isDisabled}
            />
          </Grid>
        );
      case 'multiselect':
        return (
          <Grid item xs={3} key={filter.filterName}>
            <MultiSelect
              options={filter.options as Option[]}
              label={filter.label}
              value={getFilterValue(selectedFilters[filter.filterName] as number[], filter.options as Option[]) as string[]}
              onChange={(event: SelectChangeEvent<string[]>) => {
                const values = event.target.value as string[];
                const selectedValues: number[] = values.map(selectedValue => JSON.parse(selectedValue).ID);
                handleChange(filter.filterName, selectedValues);
              }}
              readOnly={isDisabled}
            />
          </Grid>
        );
      case 'date':
        const getDatePickerValue = (value: number | null) => value ? value * 1000 : null; 
        return (
          <Grid item xs={2} key={filter.filterName}>
            <Datepicker
              onChange={(date: Date | null) => {
                if (date === null || isCorrectDate(date)) {
                  const timestamp = date ? convertDateToTimestamp(String(date)) : null;
                  handleChange(filter.filterName, timestamp);
                }
              }}
              label={filter.label}
              value={getDatePickerValue(selectedFilters[filter.filterName] as number | null) as any}
              disabled={isDisabled}
            />
          </Grid>
        );
      default:
        return;
    }
  };

  const deps = filters.map(filter => selectedFilters[filter.filterName]);

  useEffect(() => {
    getData(selectedFilters);
  }, deps);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        { filters.map(filter => renderFilter(filter)) }

        <Grid item xs={2}>
          <Button
            variant='contained'
            onClick={resetFilters}
            disabled={isDisabled}
          >
            Сбросить фильтры
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}