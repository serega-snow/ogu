// ________________________________________________________________ Импорты
import React from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import mysql_check from 'mysql2';
import mysql from 'mysql2/promise';
import toastr from 'toastr';

import store from './../redux/index';

import './styles.scss';

import config from './../config.json';

// ________________________________________________________________ Логика
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (async () => {
      const connection = mysql_check.createConnection(config.DB_CONFIG);

      connection.connect((err) => {
        if (err) {
          return toastr.error(
            `Тестовое подключение к MySQL не прошло!`,
            `Ошибка запуска программы`,
            {
              timeOut: 5000,
              extendedTimeOut: 5000,
              progressBar: true,
              escapeHtml: true,
              closeButton: true,
            }
          );
        } else {
          toastr.success(
            `Тестовое подключение к серверу MySQL успешно установлено`,
            `Запуск 1/2`,
            {
              timeOut: 5000,
              extendedTimeOut: 5000,
              progressBar: true,
              escapeHtml: true,
              closeButton: true,
            }
          );

          connection.end(async (err) => {
            if (err) {
              return toastr.error(
                'Ошибка: ' + err.message,
                `Ошибка запуска программы`,
                {
                  timeOut: 5000,
                  extendedTimeOut: 5000,
                  progressBar: true,
                  escapeHtml: true,
                  closeButton: true,
                }
              );
            }

            toastr.success(`Тестовое подключение закрыто`, `Запуск 2/2`, {
              timeOut: 5000,
              extendedTimeOut: 5000,
              progressBar: true,
              escapeHtml: true,
              closeButton: true,
            });

            window.connectMySQL = await mysql.createPool(config.DB_CONFIG);
          });
        }
      });
    })();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

/*
  входные данные:
  - общая масса входного сырья для сушки путем количества входного количества вагонов с известной их массой

  роли: оператор
  1) Кто вносит стату
  2) Кто читает энергию
  3) кто просто читает и предсказания клацает (диспетчер )
  4) кто вносит виды вагонов и установок

  бд:
  - вагоны: сколько вместимость в тоннах и тип вагона
  - анализы: при N градусах Цельсия N тон груза сушилось N минут времени колличество установок
  - роли: админ (работает с данными по вагонам, анализам), электрик(), сушильщик
  - установки: мощность входная, название установки, время работы
  - режимы: название, список установок, время работы установок из списка, диапазон входа (время сушки и масса входного сырья)
  - погоды:дата,температура,влажность,скорость
  - сырье: тип(концентрат)
  - предприятие:название(откуда пришел груз)
- история обработки:дата прибытия груза
*/
