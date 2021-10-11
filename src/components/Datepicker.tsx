import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

type DatepickerProps = {
  label: string,
  value: Date | null,
  disabled?: boolean,
  onChange: (date: Date | null) => void,
};

export default function Datepicker(props: DatepickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(params: any) => <TextField {...params} />}
        { ...props }
      />
    </LocalizationProvider>
  );
}