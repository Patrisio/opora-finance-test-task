import React, { useState } from 'react';
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
};

export default function MultiSelect({ options, label }: MultiSelectProps) {
  const [personName, setPersonName] = useState<string[]>([]);

  const menuItems = options.map(({ ID, name }) => (
    <MenuItem
      key={ID}
      value={ID}
    >
      { name }
    </MenuItem>
  ));

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: .5, width: 220 }}>
        <InputLabel id="demo-multiple-chip-label">{ label }</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          { menuItems }
        </Select>
      </FormControl>
    </div>
  );
}