import React, { useState } from 'react';
import { AutoComplete as AntdAutoComplete } from 'antd';

type AutocompleteProps = {
  options: { value: string }[],
  placeholder: string,
  isDisabled: boolean,
  onChange: (value: string) => void,
  onBlur: (value: string) => void,
};

export default function AutoComplete({ options, placeholder, isDisabled, onChange, onBlur }: AutocompleteProps) {
  const [value, updateValue] = useState<string>('');

  return (
    <AntdAutoComplete
      style={{ width: 200 }}
      filterOption={(inputValue: string, option: any) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onChange={(value: string) => {
        updateValue(value);
        onChange(value);
      }}
      onBlur={() => onBlur(value)}
      options={options}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  );
}