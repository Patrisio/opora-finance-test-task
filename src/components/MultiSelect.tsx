import React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Option } from '../types';

type MultiSelectProps = {
  options: Option[],
  label: string,
  value: string[],
  readOnly?: boolean,
  onChange: (event: SelectChangeEvent<string[]>) => void,
};

export default function MultiSelect({ options, label, value, readOnly, onChange }: MultiSelectProps) {
  const menuItems = options.map(({ ID, name }) => (
    <MenuItem
      key={ID}
      value={JSON.stringify({ ID, name })}
    >
      { name }
    </MenuItem>
  ));

  return (
    <div>
      <FormControl sx={{ m: .5, width: '100%' }}>
        <InputLabel>{ label }</InputLabel>
        <Select
          multiple
          value={value}
          inputProps={{ readOnly }}
          onChange={onChange}
          input={<OutlinedInput label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const { ID, name } = JSON.parse(value);
                
                return (
                  <Chip
                    key={ID}
                    label={name}
                  />
                );
              })}
            </Box>
          )}
        >
          { menuItems }
        </Select>
      </FormControl>
    </div>
  );
}