import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getStatusGroupsFilter, getStatusGroupsUse,
  getCurrencyList, getOperationTypeList,
  StatusGroups, AdminOrdersFilterData,
} from '../api/adminOrdersApi';
import { AppThunk } from '.';
import { Filter } from '../types';

interface AdminOrdersState {
  filters: Filter[],  
  loading: boolean
  error: string | null
}

type FiltersLoaded = any
// {
//   [key: string]: StatusGroups[] | AdminOrdersFilterData[],
  
//   statusGroupList: StatusGroups[],
//   toChangeStatusGroupID: StatusGroups[],
//   operationTypeID: AdminOrdersFilterData[],
//   currencyID: AdminOrdersFilterData[],
// }

const initialState: AdminOrdersState = {
  filters: [
    {
      type: 'select',
      filterName: 'statusGroupList',
      label: 'Выбор статуса',
      options: [],
    },
    {
      type: 'multiselect',
      filterName: 'toChangeStatusGroupID',
      label: 'Добавить теги',
      options: [],
    },
    {
      type: 'select',
      filterName: 'orderBy',
      label: 'Сортировка',
      options: [],
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
  ],
  loading: false,
  error: null,
}

const adminOrders = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    fetchFiltersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFiltersSuccess(state, action: PayloadAction<FiltersLoaded>) {
      // const {
      //   statusGroupList,
      //   toChangeStatusGroupID,
      //   operationTypeID,
      //   currencyID,
      // } = action.payload;
      const payload = action.payload;

      for (let key in payload) {
        const foundFilter = state.filters.find(filter => filter.filterName === key);

        if (foundFilter) {
          foundFilter.options = payload[key]
        }
      }
      state.loading = false;
      state.error = null;
    },
    fetchFiltersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchFiltersStart,
  fetchFiltersSuccess,
  fetchFiltersFailure,
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
    // const comments = await getComments(issue.comments_url)
    const [
      statusGroupsFilter,
      statusGroupsUse,
      currencyList,
      operationTypeList,
    ] = await allPromises;
    dispatch(fetchFiltersSuccess({
      statusGroupList: statusGroupsFilter,
      toChangeStatusGroupID: statusGroupsUse,
      operationTypeID: currencyList,
      currencyID: operationTypeList,
    }));
  } catch (err) {
    // dispatch(fetchFiltersFailure(err));
  }
}