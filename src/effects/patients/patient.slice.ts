import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ENDPOINTS, fakeAxios} from '../../fakeServer/fakeAxios';
import {Patients} from './type';

const initialState: Patients = {
  loading: 'idle',
  data: [],
  activePatient: '',
};

export const fetchPatients = createAsyncThunk(
  'patients/setPatients',
  async (careHomeId: number) => {
    try {
      const response = await fakeAxios(ENDPOINTS.PATIENTS, careHomeId);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setActivePatients: (state, action) => {
      const findPatients = state.data.find(item => item.id === action.payload);
      if (findPatients) {
        const {firstName, lastName} = findPatients;
        state.activePatient = firstName + ' ' + lastName;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPatients.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchPatients.rejected, state => {
      state.loading = 'failed';
    });
  },
});

export const {setActivePatients} = patientsSlice.actions;

export default patientsSlice.reducer;
