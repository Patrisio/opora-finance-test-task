import { combineReducers } from '@reduxjs/toolkit';
import adminOrdersReducer from './adminOrdersSlice';

const rootReducer = combineReducers({
  adminOrdersSlice: adminOrdersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;