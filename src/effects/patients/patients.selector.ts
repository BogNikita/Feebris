import type {RootState} from '../../store';

export const selectPatients = (state: RootState) => state.patients.data;
export const selectActivePatient = (state: RootState) =>
  state.patients.activePatient;
export const selecPatientLoading = (state: RootState) =>
  state.patients.loading === 'pending';
export const selectPatientError = (state: RootState) =>
  state.patients.loading === 'failed';
