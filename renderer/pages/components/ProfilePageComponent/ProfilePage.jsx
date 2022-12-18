import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import {
  getAllUsers,
  saveAccountUser,
  deleteAccountUser,
} from '../../../redux/ExtraReducers/Profile.ExtraReduces';
import toastr from 'toastr';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const refCheckboxOperator = useRef();
  const refCheckboxAdmin = useRef();
  const refCheckboxSupervisor = useRef();

  const [stateCreateOrChangeUser, setStateCreateOrChangeUser] = useState(false);
  const [stateLogin, setStateLogin] = useState(``);
  const [statePassword, setStatePassword] = useState(``);
  let stateRoles = [];

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { dataUsers } = useSelector((store) => store.mainSlice);

  return (
    <div className='ProfilePage'>
      <h2>Профили учетных записей</h2>

      <button
        className='button'
        onClick={(event) => {
          event.preventDefault();

          setStateCreateOrChangeUser(!stateCreateOrChangeUser);
          setStateLogin(``);
          setStatePassword(``);
          stateRoles = [];
        }}
      >
        Создать учетную запись
      </button>

      {stateCreateOrChangeUser && (
        <div className='wrapper-created'>
          <div className='input-wrapper'>
            <label className='label-input'>
              Логин:
              <br />
              <input
                className='input'
                type='text'
                placeholder='Логин'
                value={stateLogin}
                onChange={(event) => setStateLogin(event.target.value)}
              />
            </label>
          </div>

          <div className='input-wrapper'>
            <label className='label-input'>
              Пароль:
              <br />
              <input
                className='input'
                type='text'
                placeholder='Пароль'
                value={statePassword}
                onChange={(event) => setStatePassword(event.target.value)}
              />
            </label>
          </div>

          <div className='checkbox-wrapper'>
            <label className='label'>
              <input type='checkbox' ref={refCheckboxOperator} /> оператор
            </label>
            <label className='label'>
              <input type='checkbox' ref={refCheckboxAdmin} /> администратор
            </label>
            <label className='label'>
              <input type='checkbox' ref={refCheckboxSupervisor} /> начальник
            </label>
          </div>

          <div className='button-wrapper'>
            <button
              className='button'
              onClick={(event) => {
                event.preventDefault();

                const tempRolesArray = [];

                if (refCheckboxOperator.current.checked)
                  tempRolesArray.push(`оператор`);

                if (refCheckboxAdmin.current.checked)
                  tempRolesArray.push(`администратор`);

                if (refCheckboxSupervisor.current.checked)
                  tempRolesArray.push(`начальник`);

                if (tempRolesArray.length < 1) {
                  toastr.error(
                    'Роли не выбраны!',
                    `Ошибка сохранения учетной записи`,
                    {
                      timeOut: 5000,
                      extendedTimeOut: 5000,
                      progressBar: true,
                      escapeHtml: true,
                      closeButton: true,
                    }
                  );
                  return;
                }

                stateRoles = JSON.parse(JSON.stringify(tempRolesArray));

                if (stateLogin.length < 1 || stateLogin.length > 10) {
                  toastr.error(
                    'Логин от 1 до 10 символов!',
                    `Ошибка сохранения учетной записи`,
                    {
                      timeOut: 5000,
                      extendedTimeOut: 5000,
                      progressBar: true,
                      escapeHtml: true,
                      closeButton: true,
                    }
                  );
                  return;
                }

                if (statePassword.length < 1 || statePassword.length > 10) {
                  toastr.error(
                    'Пароль от 1 до 10 символов!',
                    `Ошибка сохранения учетной записи`,
                    {
                      timeOut: 5000,
                      extendedTimeOut: 5000,
                      progressBar: true,
                      escapeHtml: true,
                      closeButton: true,
                    }
                  );
                  return;
                }

                dispatch(
                  saveAccountUser({
                    stateLogin,
                    statePassword,
                    stateRoles,
                    dispatchData: [getAllUsers],
                  })
                );
              }}
            >
              Сохранить
            </button>
          </div>
        </div>
      )}

      <table>
        <tr>
          <th>номер</th>
          <th>логин</th>
          <th>пароль</th>
          <th>роли</th>
          <th>функции</th>
        </tr>

        {dataUsers &&
          dataUsers.map((user) => (
            <tr key={user['номер']}>
              <td>{user['номер']}</td>
              <td>{user['логин']}</td>
              <td>{user['пароль'] && `Установлен`}</td>
              <td>
                <ul>
                  {JSON.parse(user['массив_ролей']).map((roleItem, index) => (
                    <li key={index}>{roleItem}</li>
                  ))}
                </ul>
              </td>
              <td>
                <IoIosRemoveCircleOutline
                  size={25}
                  className='svg-hover'
                  onClick={(event) => {
                    event.preventDefault();

                    dispatch(
                      deleteAccountUser({
                        user,
                        dispatchData: [getAllUsers],
                      })
                    );
                  }}
                />
                <BiEdit size={25} className='svg-hover' />
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default ProfilePage;
