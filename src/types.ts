type FilterType = 'input' | 'select' | 'multiselect' | 'date';

export type Option = {
  ID: number,
  name: string,
  color?: string,
};

export type Filter = {
  type: FilterType,
  filterName: string,
  label: string,
  options?: Option[],
};