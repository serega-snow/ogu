import { createSlice } from '@reduxjs/toolkit';
import toastr from 'toastr';
import moment from 'moment';
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

import { actionAuthAccount } from '../ExtraReducers/Accounts.ExtraReducer';
import {
  getTypeOfRawMaterialsFromDataBase,
  getСargoСonditionsFromDataBase,
  saveAndSelectMode,
} from '../ExtraReducers/Main.ExtraReducer';

const mainSlice = createSlice({
  name: 'main-slice',

  initialState: {
    mainAppStatusAuth: MAIN_STATUS__APP_AUTH_NOT,
    mainAppAuthUser: null,
    mainAppNavSelected: null,

    dataTypeOfRawMaterials: null,
    dataCargoСonditions: null,
  },

  reducers: {
    selectItemMenuNav(state, action) {
      state.mainAppNavSelected = action.payload;
    },
    clicedItemMenuSignOut(state, action) {
      toastr.success(
        `Выход успешно произведен`,
        `Открыта состояние авторизации`,
        {
          timeOut: 5000,
          extendedTimeOut: 5000,
          progressBar: true,
          escapeHtml: true,
          closeButton: true,
        }
      );

      state.mainAppNavSelected = null;
      state.mainAppAuthUser = null;
      state.mainAppStatusAuth = MAIN_STATUS__APP_AUTH_NOT;
    },
  },

  extraReducers: {
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

      currectUser['массив_ролей'] = JSON.parse(currectUser['массив_ролей']);

      state.mainAppAuthUser = currectUser;

      toastr.success(`Авторизация успешно прошла`, `Успех авторизации`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });
    },

    [getTypeOfRawMaterialsFromDataBase.fulfilled]: (state, action) => {
      state.dataTypeOfRawMaterials = action.payload;
    },

    [getСargoСonditionsFromDataBase.fulfilled]: (state, action) => {
      state.dataCargoСonditions = action.payload;
    },

    [saveAndSelectMode.fulfilled]: (state, action) => {
      toastr.success(`Груз успешно заведен в систему!`, `Успех операции`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });
    },
  },
});

export const { selectItemMenuNav, clicedItemMenuSignOut } = mainSlice.actions;
export default mainSlice.reducer;
