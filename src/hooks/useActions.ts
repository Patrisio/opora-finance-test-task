import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchFiltersStart,
  fetchFiltersSuccess,
  fetchFiltersFailure,
  fetchFilters,
  updateSelectedFilters,
  resetSelectedFilters,
  fetchAdminOrders,
} from '../store/adminOrdersSlice';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    fetchFiltersStart,
    fetchFiltersSuccess,
    fetchFiltersFailure,
    fetchFilters,
    updateSelectedFilters,
    resetSelectedFilters,
    fetchAdminOrders,
  }, dispatch);
}