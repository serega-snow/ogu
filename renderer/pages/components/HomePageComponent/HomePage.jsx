import React from 'react';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const HomePage = () => {
  return (
    <div className='HomePage'>
      <div className='HomePage__top'>
        <div className='input-wrapper'>
          <label className='label-input'>
            Колличество вагонов:
            <br />
            <select className='input'>
              <option value='-1'>-- Выберите количество вагонов --</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
            </select>
          </label>
        </div>

        <div className='input-wrapper'>
          <label className='label-input'>
            Вес:
            <br />
            <input className='input' type='text' />
          </label>
        </div>

        <div className='input-wrapper'>
          <label className='label-input'>
            Тип сырья:
            <br />
            <select className='input'>
              <option value='-1'>-- Выберите вид сырья --</option>
              <option value='1'>1</option>
            </select>
          </label>
        </div>

        <div className='button-wrapper'>
          <button className='button'>Сохранить</button>
        </div>
      </div>

      <div className='HomePage__down'>
        <div className='current-download'>
          <p>Текущая загрузка:</p>
          <ol>
            <li>Колличество вагонов:</li>
            <li>Дата добавления:</li>
            <li>Тип сырья:</li>
            <li>Вес:</li>
          </ol>
          <button className='button'>Сохранить и подобрать режим</button>
        </div>

        <div className='mode-widget'>
          <label className='label'>
            Рекомендованный режим: <input className='input' disabled />
          </label>

          <label className='label'>
            Режим по умолчанию: <select className='input'></select>
          </label>

          <div className='wrapper-progress'>
            <button className='button'>Начать</button>

            <div className='progressbar'>
              <CircularProgressbar
                value={55}
                text={`${55}%`}
                strokeWidth={8}
                className='progressbar-result'
              />

              <div className='current-proccess'>
                Текущий процесс сушки
                <br />
                <span>55</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
