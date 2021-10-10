import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type InputProps = {
  label: string,
};

export default function Input({ label }: InputProps) {
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: .5, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='outlined-basic'
        label={label}
        variant='outlined'
      />
    </Box>
  );
}