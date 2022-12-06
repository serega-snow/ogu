import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toastr from 'toastr';
import {
  MAIN_STATUS__APP_AUTH_NOT,
  MAIN_STATUS__APP_AUTH_ERR,
  MAIN_STATUS__APP_AUTH_SUCCESS,
  //
  MAIN_NAV__HOME_PAGE,
  MAIN_NAV__PROFILE_PAGE,
  MAIN_NAV__REPORT_PAGE,
  MAIN_NAV__MODES_PAGE,
  MAIN_NAV__HELPS_PAGE,
  MAIN_NAV__SIGNOUT_PAGE,
} from '../../types';

// процесс авторизации
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
// процесс авторизации

const mainSlice = createSlice({
  name: 'main-slice',

  initialState: {
    mainAppStatusAuth: MAIN_STATUS__APP_AUTH_NOT,
    mainAppAuthUser: null,
    mainAppNavSelected: null,
  },

  reducers: {
    selectItemMenuNav(state, action) {
      state.mainAppNavSelected = action.payload;
    },
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

      const currectUser = action.payload;

      currectUser.roles = JSON.parse(currectUser.roles);

      state.mainAppAuthUser = currectUser;

      toastr.success(`Авторизация успешно прошла`, `Успех авторизации`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });
    },
  },
});

export const { selectItemMenuNav } = mainSlice.actions;
export default mainSlice.reducer;
