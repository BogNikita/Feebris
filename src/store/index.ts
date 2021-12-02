import {configureStore} from '@reduxjs/toolkit';
import careHomeSlice from '../effects/careHomes/careHome.slice';
import checkupsSlice from '../effects/checkups/checkup.slice';
import patientSlice from '../effects/patients/patient.slice';

export const store = configureStore({
  reducer: {
    careHomes: careHomeSlice,
    patients: patientSlice,
    checkups: checkupsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
