import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type InputProps = {
  label: string,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

export default function Input({ label, value, onChange }: InputProps) {
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: .5, width: '100%' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='outlined-basic'
        label={label}
        variant='outlined'
        value={value || ''}
        onChange={onChange}
      />
    </Box>
  );
}