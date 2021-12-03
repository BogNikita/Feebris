import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ENDPOINTS, fakeAxios} from '../../fakeServer/fakeAxios';
import {CareHomes} from './type';

const initialState: CareHomes = {
  loading: 'idle',
  data: [],
  activeCareHomes: '',
};

export const fetchCareHomes = createAsyncThunk(
  'careHomes/setCareHomes',
  async () => {
    try {
      const response = await fakeAxios(ENDPOINTS.CARE_HOMES);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const careHomesSlice = createSlice({
  name: 'careHomes',
  initialState,
  reducers: {
    setActiveCareHomes: (state, action) => {
      state.activeCareHomes =
        state.data.find(item => item.id === action.payload)?.name || '';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCareHomes.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(fetchCareHomes.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchCareHomes.rejected, state => {
      state.loading = 'failed';
    });
  },
});

export const {setActiveCareHomes} = careHomesSlice.actions;

export default careHomesSlice.reducer;
