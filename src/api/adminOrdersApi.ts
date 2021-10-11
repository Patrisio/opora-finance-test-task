import axios from 'axios';
import { SelectedFilters } from '../store/adminOrdersSlice';

const productionHost = 'http://135.181.39.55:15551';

export type AdminOrdersFilterData = {
  ID: number,
  name: string,
};

export type StatusGroups = {
  color: string,
} & AdminOrdersFilterData;

const api = axios.create({
  baseURL: productionHost,
  headers: {
    'Authorization': '19cedeae-9496-4a25-af06-5a2af2b15567',
    'Fingerprint': 'admin fingerprint',
  }
});

export async function getStatusGroupsFilter() {
  const url = `/list/fetch_status_groups_filter`;

  const { data } = await api.get<StatusGroups[]>(url);
  return data;
}

export async function getStatusGroupsUse() {
  const url = `/list/fetch_status_groups_use`;

  const { data } = await api.get<StatusGroups[]>(url);
  return data;
}

export async function getCurrencyList() {
  const url = `/list/fetch_currency_list`;

  const { data } = await api.get<AdminOrdersFilterData[]>(url);
  return data;
}

export async function getOperationTypeList() {
  const url = `/list/fetch_operation_type_list`;

  const { data } = await api.get<AdminOrdersFilterData[]>(url);
  return data;
}

export async function getAdminOrders(selectedFilters: SelectedFilters) {
  const url = `/order/fetch_admin_orders`;

  const { data } = await api.post<any>(url, selectedFilters);
  return data;
}