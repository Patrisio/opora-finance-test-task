import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MaterialSelect, SelectChangeEvent } from '@mui/material';
import { Option } from '../types';

type SelectProps = {
  options: Option[],
  label: string,
  value: string | number,
  readOnly?: boolean,
  onChange: (event: SelectChangeEvent<string | number>) => void,
};

export default function Select({ options, label, value, readOnly, onChange }: SelectProps) {
  const menuItems = options.map(({ ID, name }) => (
    <MenuItem
      key={ID}
      value={ID}
    >
      { name }
    </MenuItem>
  ));

  return (
    <Box sx={{ m: .5 }}>
      <FormControl fullWidth>
        <InputLabel>{ label }</InputLabel>
        <MaterialSelect
          label={label}
          value={value || ''}
          onChange={onChange}
          inputProps={{ readOnly }}
        >
          { menuItems }
        </MaterialSelect>
      </FormControl>
    </Box>
  );
}