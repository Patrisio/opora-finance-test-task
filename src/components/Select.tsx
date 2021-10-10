import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MaterialSelect } from '@mui/material';
import { Option } from '../types';

type SelectProps = {
  options: Option[],
  label: string,
};

export default function Select({ options, label }: SelectProps) {
  const menuItems = options.map(({ ID, name }) => (
    <MenuItem
      key={ID}
      value={ID}
    >
      { name }
    </MenuItem>
  ));

  const handleChange = () => {

  };

  return (
    <Box sx={{ m: .5, width: 160 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{ label }</InputLabel>
        <MaterialSelect
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label={label}
          onChange={handleChange}
        >
          { menuItems }
        </MaterialSelect>
      </FormControl>
    </Box>
  );
}