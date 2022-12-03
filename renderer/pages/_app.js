// ________________________________________________________________ Импорты
import React from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import mysql from 'mysql2/promise';

import store from './../redux/index';

import './styles.scss';

// ________________________________________________________________ Логика
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (async () => {
      window.connectMySQL = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'gsm-diplom',
        password: 'root',
      });
    })();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
