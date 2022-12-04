import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toastr from 'toastr';
import {
  MAIN_STATUS__APP_AUTH_NOT,
  MAIN_STATUS__APP_AUTH_ERR,
  MAIN_STATUS__APP_AUTH_SUCCESS,
} from '../../types';

export const actionAuthAccount = createAsyncThunk(
  'main-slice/actionAuthAccount',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const [checkUser] = await window.connectMySQL.execute(
        `SELECT * FROM users WHERE login = '${login}' limit 1`
      );

      if (!checkUser.length) {
        throw new Error('Логин не найден');
      }

      const currectUser = checkUser[0];

      if (currectUser.password !== password) {
        throw new Error('Пароль не правильный');
      }

      return currectUser;
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);

const mainSlice = createSlice({
  name: 'main-slice',

  initialState: {
    mainAppStatusAuth: MAIN_STATUS__APP_AUTH_NOT,
  },

  reducers: {
    // clearStateAllVehicle(state, action) {},
  },

  extraReducers: {
    [actionAuthAccount.pending]: (state, action) => {},
    [actionAuthAccount.rejected]: (state, action) => {
      state.mainAppStatusAuth = MAIN_STATUS__APP_AUTH_ERR;

      toastr.error(action.payload, `Ошибка авторизации`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });
    },
    [actionAuthAccount.fulfilled]: (state, action) => {
      state.mainAppStatusAuth = MAIN_STATUS__APP_AUTH_SUCCESS;
    },
  },
});

export const { clearStateAllVehicle } = mainSlice.actions;
export default mainSlice.reducer;
