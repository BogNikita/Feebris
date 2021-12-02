import type {RootState} from '../../store';

export const selectCheckups = (state: RootState) => state.checkups.data;
export const selectCheckupsLoading = (state: RootState) =>
  state.checkups.loading === 'pending';
export const selectCheckupsError = (state: RootState) =>
  state.checkups.loading === 'failed';
