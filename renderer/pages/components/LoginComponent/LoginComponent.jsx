import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionAuthAccount } from './../../../redux/slices/mainSlice';

const LoginFunc = ({ login, password }) => {};

const LoginComponent = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState(``);
  const [password, setPassword] = useState(``);

  return (
    <div className='LoginComponent'>
      <div className='LoginComponent__left-side'>
        <h1 className='LoginComponent__main-title'>АИС “Бункер”</h1>
        <h2 className='LoginComponent__child-title'>
          Система размораживания грузов
        </h2>
      </div>
      <div className='LoginComponent__right-side'>
        <div className='LoginComponent__wrapper-auth'>
          <h3 className='LoginComponent__text-auth'>Вход в систему</h3>

          <div className='LoginComponent__input-login'>
            <span>Логин</span>
            <input
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder='Введите ваш логин'
            />
          </div>

          <div className='LoginComponent__input-password'>
            <span>Пароль</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder='Введите ваш пароль'
            />
          </div>

          <button
            className='LoginComponent__button-auth'
            onClick={() => dispatch(actionAuthAccount({ login, password }))}
          >
            Войти
          </button>

          <div className='LoginComponent__forgot-your-password'>
            <span>Забыли пароль?</span>
            <span>Обратитесь к сотрудникам ОИТ службы</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
