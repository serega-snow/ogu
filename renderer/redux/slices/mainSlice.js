import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toastr from 'toastr';
import bcrypt from 'bcryptjs';
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

// процесс авторизации
export const actionAuthAccount = createAsyncThunk(
  'main-slice/actionAuthAccount',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const [checkUser] = await window.connectMySQL.execute(
        `SELECT * FROM аккаунты WHERE логин = '${login}' limit 1`
      );

      if (!checkUser.length) {
        throw new Error('Логин не найден');
      }

      const currectUser = checkUser[0];

      const validPassword = bcrypt.compareSync(password, currectUser['пароль']);

      if (!validPassword) {
        throw new Error('Пароль не правильный');
      }

      return currectUser;
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);
// процесс авторизации

export const getTypeOfRawMaterialsFromDataBase = createAsyncThunk(
  'main-slice/getTypeOfRawMaterialsFromDataBase',
  async ({}, { rejectWithValue }) => {
    try {
      const [typesMaterials] = await window.connectMySQL.execute(
        `SELECT * FROM вид_груза`
      );

      if (typesMaterials.length < 1) return null;

      return typesMaterials;
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);

export const getСargoСonditionsFromDataBase = createAsyncThunk(
  'main-slice/getСargoСonditionFromDataBase',
  async ({}, { rejectWithValue }) => {
    try {
      const [cargoСonditions] = await window.connectMySQL.execute(
        `SELECT * FROM состояние`
      );

      if (cargoСonditions.length < 1) return null;

      return cargoСonditions;
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);

export const saveAndSelectMode = createAsyncThunk(
  'main-slice/saveAndSelectMode',
  async ({ states, setStates }, { rejectWithValue }) => {
    try {
      const {
        stateCurrentValueWagons,
        stateInputValueWeightCargo,
        stateAddedDate,
        stateSelectTypeOfRawMaterials,
        stateSelectCargoCondition,
      } = states;
      const {
        setStateCurrentValueWagons,
        setStateInputValueWeightCargo,
        setStateAddedDate,
        setStateSelectTypeOfRawMaterials,
        setStateSelectCargoCondition,
      } = setStates;

      const [resultRequestSaveCargo] = await window.connectMySQL.execute(
        `INSERT INTO груз
        (объем,
        дата_поступления,
        вид_груза,
        состояние_груза,
        номер_участка,
        ед_изм)
        VALUES
        ('${stateInputValueWeightCargo}',
        '${moment(stateAddedDate).format('YYYY-MM-DD')}',
        '${stateSelectTypeOfRawMaterials['код']}',
        '${stateSelectCargoCondition['код']}',
        '1',
        '2')`
      );

      setStateCurrentValueWagons(null);
      setStateInputValueWeightCargo(null);
      setStateAddedDate(null);
      setStateSelectTypeOfRawMaterials(null);
      setStateSelectCargoCondition(null);

      console.log(`stateCurrentValueWagons::`, stateCurrentValueWagons);
      console.log(`resultRequestSaveCargo::`, resultRequestSaveCargo);
    } catch (errorObject) {
      rejectWithValue(errorObject.message);
    }
  }
);

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
