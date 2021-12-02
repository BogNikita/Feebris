import type {RootState} from '../../store';

export const selectCareHomes = (state: RootState) => state.careHomes.data;
export const selectActiveCareHomes = (state: RootState) =>
  state.careHomes.activeCareHomes;
export const selectCareHomesLoading = (state: RootState) =>
  state.careHomes.loading === 'pending';
export const selectCareHomesError = (state: RootState) =>
  state.careHomes.loading === 'failed';
