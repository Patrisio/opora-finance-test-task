import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type InputProps = {
  label: string,
  value: string,
  disabled?: boolean,
  type: 'text' | 'number',
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

export default function Input({ label, value, disabled, type, onChange }: InputProps) {
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
        disabled={disabled}
        type={type}
      />
    </Box>
  );
}