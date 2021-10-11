import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getStatusGroupsFilter, getStatusGroupsUse,
  getCurrencyList, getOperationTypeList,
  getAdminOrders,
  StatusGroups, AdminOrdersFilterData,
} from '../api/adminOrdersApi';
import { AppThunk } from '.';
import { Filter, Option } from '../types';

type OrderByFilter = 'updated_at_DESC' | 'updated_at_ASC' | 'created_at_DESC' | 'created_at_ASC';

export type SelectedFilters = {
  [key: string]: string | number | number[] | null,

  publicID: string | null,
	timeFrom: string | null,
	timeTo: string | null,
	currencyID: string | null,
	operationTypeID: string | null,
	nearAmount: number | null,
	limit: number,
	offset: number,
	currencyFromID: string | null,
	currencyToID: string | null,
	walletID: string | null,
	userID: string | null,
	statusGroupList: number[],
	toChangeStatusGroupID: number | null,
	userPrivateName: string | null,
	orderBy: OrderByFilter | null,
};

type SelectedFiltersKeys = Partial<keyof SelectedFilters>;

type AdminOrderEntity = {
  orderID: number,
  publicID: string,
  createdDate: number,
  orderType: string,
  direction: string,
  statusName: string,
  percentage: number | null,
  amount: number,
  meetTime: number,
  city: string,
  userPrivateName: string,
  type: string,
};

type AdminOrders = {
  totalLen: number,
  data: AdminOrderEntity[],
};

type AdminOrdersState = {
  filters: Filter[],
  selectedFilters: SelectedFilters,
  filtersLoading: boolean,
  filtersError: string | null,
  adminOrdersLoading: boolean,
  adminOrdersError: string | null,
  adminOrders: AdminOrders,
}

type FiltersLoaded = any
// {
//   [key: string]: StatusGroups[] | AdminOrdersFilterData[],
  
//   statusGroupList: StatusGroups[],
//   toChangeStatusGroupID: StatusGroups[],
//   operationTypeID: AdminOrdersFilterData[],
//   currencyID: AdminOrdersFilterData[],
// }

const sortingOptions: Option[] = [
  {
    ID: 'updated_at_DESC',
    name: 'Сортировать по дате оновления от старых к новым',
  },
  {
    ID: 'updated_at_ASC',
    name: 'Сортировать по дате оновления от новыx к старым',
  },
  {
    ID: 'created_at_DESC',
    name: 'Сортировать по дате создания от старых к новым',
  },
  {
    ID: 'created_at_ASC',
    name: 'Сортировать по дате создания от новыx к старым',
  },
];

const defaultSelectedFilters: SelectedFilters = {
	publicID: null,
	timeFrom: null,
	timeTo: null,
	currencyID: null,
	operationTypeID: null,
	nearAmount: null,
	limit: 100,
	offset: 0,
	currencyFromID: null,
	currencyToID: null,
	walletID: null,
	userID: null,
	statusGroupList: [],
	toChangeStatusGroupID: null,
	userPrivateName: null,
	orderBy: null
};

const initialState: AdminOrdersState = {
  filters: [
    {
      type: 'select',
      filterName: 'toChangeStatusGroupID',
      label: 'Выбор статуса',
      options: [],
    },
    {
      type: 'multiselect',
      filterName: 'statusGroupList',
      label: 'Добавить теги',
      options: [],
    },
    {
      type: 'select',
      filterName: 'orderBy',
      label: 'Сортировка',
      options: sortingOptions,
    },
    {
      type: 'input',
      filterName: 'publicID',
      label: 'ID заявки',
    },
    {
      type: 'select',
      filterName: 'operationTypeID',
      label: 'Тип операции',
      options: [],
    },
    {
      type: 'select',
      filterName: 'currencyID',
      label: 'Валюта',
      options: [],
    },
    {
      type: 'date',
      filterName: 'timeFrom',
      label: 'Время от',
    },
    {
      type: 'date',
      filterName: 'timeTo',
      label: 'Время до',
    },
  ],
  selectedFilters: defaultSelectedFilters,
  filtersLoading: false,
  filtersError: null,

  adminOrdersLoading: false,
  adminOrdersError: null,
  adminOrders: {
    totalLen: 0,
    data: [],
  },
}

const adminOrders = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    fetchFiltersStart(state) {
      state.filtersLoading = true;
      state.filtersError = null;
    },
    fetchFiltersSuccess(state, action: PayloadAction<FiltersLoaded>) {
      const payload = action.payload;
      for (let key in payload) {
        const foundFilter = state.filters.find(filter => filter.filterName === key);
        if (foundFilter) {
          foundFilter.options = payload[key];
        }
      }

      state.filtersLoading = false;
      state.filtersError = null;
    },
    fetchFiltersFailure(state, action: PayloadAction<string>) {
      state.filtersLoading = false;
      state.filtersError = action.payload;
    },
    updateSelectedFilters(state, action: PayloadAction<Record<string, string | number | number[] | null>>) {
      state.selectedFilters = Object.assign(state.selectedFilters, action.payload);
    },
    resetSelectedFilters(state) {
      state.selectedFilters = defaultSelectedFilters;
    },
    fetchAdminOrdersStart(state) {
      state.adminOrdersLoading = true;
      state.adminOrdersError = null;
    },
  }
});

export const {
  fetchFiltersStart,
  fetchFiltersSuccess,
  fetchFiltersFailure,
  updateSelectedFilters,
  resetSelectedFilters,
  fetchAdminOrdersStart,
} = adminOrders.actions;
export default adminOrders.reducer;

export const fetchFilters = (): AppThunk => async (dispatch: any) => {
  const allPromises = Promise.all([
    getStatusGroupsFilter(),
    getStatusGroupsUse(),
    getCurrencyList(),
    getOperationTypeList()
  ]);

  try {
    dispatch(fetchFiltersStart());

    const [
      statusGroupsFilter,
      statusGroupsUse,
      currencyList,
      operationTypeList,
    ] = await allPromises;

    dispatch(fetchFiltersSuccess({
      statusGroupList: statusGroupsFilter,
      toChangeStatusGroupID: statusGroupsUse,
      operationTypeID: operationTypeList,
      currencyID: currencyList,
    }));
  } catch (err) {
    // dispatch(fetchFiltersFailure(err));
  }
};

export const fetchAdminOrders = (selectedFilters: SelectedFilters): AppThunk => async (dispatch: any) => {
  try {
    dispatch(fetchAdminOrdersStart());

    const { data } = await getAdminOrders(selectedFilters);
  } catch (err) {
    console.log(err, '__ERROR__');
  }
};