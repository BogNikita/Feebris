import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ENPOINTS, fakeAxios} from '../../fakeServer/fakeAxios';
import {Checkups} from './type';

const initialState: Checkups = {
  loading: 'idle',
  data: [],
};

export const fetchCheckups = createAsyncThunk(
  'checkups/setCheckups',
  async (patientId: number) => {
    try {
      const response = await fakeAxios(ENPOINTS.CHECKUPS, patientId);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const checkupsSlice = createSlice({
  name: 'checkups',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCheckups.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(fetchCheckups.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchCheckups.rejected, state => {
      state.loading = 'failed';
    });
  },
});

export default checkupsSlice.reducer;
