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
  getAllRequestModes,
  saveAndSelectMode,
} from '../ExtraReducers/Main.ExtraReducer';
import {
  getAllUsers,
  saveAccountUser,
  deleteAccountUser,
} from '../ExtraReducers/Profile.ExtraReduces';

const mainSlice = createSlice({
  name: 'main-slice',

  initialState: {
    mainAppStatusAuth: MAIN_STATUS__APP_AUTH_NOT, // авторизация или нет
    // данные вошедшего
    mainAppAuthUser: null,
    // выбранный пунк меню
    mainAppNavSelected: null,
    // все виды грузов
    dataTypeOfRawMaterials: null,
    dataCargoСonditions: null, // все состояние грузов
    dataAllModes: null,
    dataUsers: null, // все юзеры

    predictY: null,
    Матрица_ковариаций: null,
    Матрица_коэффициентов_ковариаций: null,
    trace: null,
    traceMatrix: null,
  },

  reducers: {
    // клик пункта меню
    selectItemMenuNav(state, action) {
      state.mainAppNavSelected = action.payload;
    },
    // клик пункта меню
    //выход из аккаунта
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
    //выход из аккаунта
  },

  extraReducers: {
    //неудачная авторизация
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
    //неудачная авторизация
    //удачная авторизации
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
    //удачная авторизации

    //________________________________________________________________

    [getTypeOfRawMaterialsFromDataBase.fulfilled]: (state, action) => {
      state.dataTypeOfRawMaterials = action.payload;
    },

    [getСargoСonditionsFromDataBase.fulfilled]: (state, action) => {
      state.dataCargoСonditions = action.payload;
    },

    [getAllRequestModes.fulfilled]: (state, action) => {
      state.dataAllModes = action.payload;
    },

    [getAllUsers.rejected]: (state, action) => {
      toastr.error(action.payload, `Ошибка получения данных`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });
    },

    [getAllUsers.fulfilled]: (state, action) => {
      state.dataUsers = action.payload;
    },

    //________________________________________________________________

    [saveAndSelectMode.rejected]: (state, action) => {
      toastr.error(action.payload, `Ошибка сохранения данных`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });
    },
    [saveAndSelectMode.fulfilled]: (state, action) => {
      toastr.success(`Груз сохранен`, `Данные записаны`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });

      state.predictY = action.payload.y;
      state.Матрица_ковариаций = action.payload['Матрица ковариаций'];
      state.Матрица_коэффициентов_ковариаций =
        action.payload['Матрица коэффициентов ковариаций'];

      state.trace = action.payload.trace;
      state.traceMatrix = action.payload.traceMatrix;
    },

    [saveAccountUser.rejected]: (state, action) => {
      toastr.error(action.payload, `Ошибка сохранения данных`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });
    },

    [saveAccountUser.fulfilled]: (state, action) => {
      toastr.success(`Учетная запись успешно создана`, `Данные записаны`, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        progressBar: true,
        escapeHtml: true,
        closeButton: true,
      });
    },

    [deleteAccountUser.fulfilled]: (state, action) => {
      toastr.success(`Учетная запись успешно удалена`, `Данные уничтожены`, {
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
