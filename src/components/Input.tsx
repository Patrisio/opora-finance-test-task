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

export default function Input({ value, ...restProps }: InputProps) {
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
        variant='outlined'
        value={value || ''}
        { ..restProps }
      />
    </Box>
  );
}