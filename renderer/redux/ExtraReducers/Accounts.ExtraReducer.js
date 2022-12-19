import { createAsyncThunk } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';

// процесс авторизации(асинхронный редьюсер)
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
