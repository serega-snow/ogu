import { createAsyncThunk } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';

// процесс выборки всех юзверов
export const getAllUsers = createAsyncThunk(
  'main-slice/getAllUsers',
  async ({}, { rejectWithValue }) => {
    try {
      const [users] = await window.connectMySQL.execute(
        `SELECT * FROM аккаунты`
      );

      if (users.length < 1) throw new Error('Нет данных!');

      return users;
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);
// процесс выборки всех юзверов

// создать учетную запись
export const saveAccountUser = createAsyncThunk(
  'main-slice/saveAccountUser',
  async (
    { stateLogin, statePassword, stateRoles, dispatchData },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const hash = bcrypt.hashSync(statePassword, 5);

      const [resultRequestSaveAccountUser] = await window.connectMySQL.execute(
        `INSERT INTO аккаунты
        (логин,
        пароль,
        массив_ролей)
        VALUES
        ('${stateLogin}',
        '${hash}',
        '${JSON.stringify(stateRoles)}')`
      );

      console.log(
        `resultRequestSaveAccountUser::`,
        resultRequestSaveAccountUser
      );

      const arrayToDispatch = [];

      dispatchData.forEach((item) => {
        arrayToDispatch.push(item);
      });

      for (let index = 0; index < arrayToDispatch.length; index++) {
        setTimeout(() => {
          dispatch(arrayToDispatch[index]());
        }, 100 * index);
      }

      return true;
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);
// создать учетную запись

// удалить учетную запись
export const deleteAccountUser = createAsyncThunk(
  'main-slice/deleteAccountUser',
  async ({ user, dispatchData }, { rejectWithValue, dispatch }) => {
    try {
      console.log(`user::1`, user);

      const [resultRequestDeleteAccountUser] =
        await window.connectMySQL.execute(
          `DELETE FROM аккаунты WHERE номер = ${user[`номер`]}`
        );

      const arrayToDispatch = [];

      dispatchData.forEach((item) => {
        arrayToDispatch.push(item);
      });

      for (let index = 0; index < arrayToDispatch.length; index++) {
        setTimeout(() => {
          dispatch(arrayToDispatch[index]());
        }, 100 * index);
      }
    } catch (errorObject) {
      return rejectWithValue(errorObject.message);
    }
  }
);
// удалить учетную запись
