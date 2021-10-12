type FilterType = 'autocomplete' | 'input' | 'select' | 'multiselect' | 'date';

export type Option = {
  ID: number | string,
  name: string,
  color?: string,
};

export type Filter = {
  type: FilterType,
  filterName: string,
  label: string,
  options: Option[] | null,
  inputType: 'text' | 'number' | null,
};