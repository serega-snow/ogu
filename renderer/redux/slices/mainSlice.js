import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toastr from 'toastr';
import mysql from 'mysql2/promise';

export const getVehiclesFromBD = createAsyncThunk(
  'main-slice/getVehiclesFromBD',
  async (_, { rejectWithValue }) => {
    try {
      const [responseData] = await window.connectMySQL.execute(
        `SELECT * FROM vehicles`
      );

      return responseData;
    } catch (errorObject) {
      return rejectWithValue(errorObject);
    }
  }
);

const mainSlice = createSlice({
  name: 'main-slice',

  initialState: {
    allVehicles: null,
  },

  reducers: {
    clearStateAllVehicle(state, action) {
      state.allVehicles = null;
    },
  },

  extraReducers: {
    [getVehiclesFromBD.pending]: (state, action) => {},
    [getVehiclesFromBD.rejected]: (state, action) => {},
    [getVehiclesFromBD.fulfilled]: (state, action) => {
      state.allVehicles = action.payload;
    },
  },
});

export const { clearStateAllVehicle } = mainSlice.actions;
export default mainSlice.reducer;
