import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clicedItemMenuSignOut } from '../../../redux/slices/mainSlice';
import toastr from 'toastr';

import Header from '../Header/Header';
import AppNavigation from '../AppNavigation/AppNavigation';
import SelectMenuItemComponent from '../SelectMenuItemComponent/SelectMenuItem';
import HomePage from '../HomePageComponent/HomePage';
import ProfilePage from '../ProfilePageComponent/ProfilePage';
import ReportPage from '../ReportPageComponent/ReportPage';
import ModesPage from '../ModesPageComponent/ModesPage';
import HelpsPage from '../HelpsPageComponent/HelpsPage';

import {
  MAIN_NAV__HOME_PAGE,
  MAIN_NAV__PROFILE_PAGE,
  MAIN_NAV__REPORT_PAGE,
  MAIN_NAV__MODES_PAGE,
  MAIN_NAV__HELPS_PAGE,
  MAIN_NAV__SIGNOUT_PAGE,
} from '../../../types';

const MainComponent = () => {
  const dispatch = useDispatch();

  const { mainAppNavSelected, mainAppAuthUser } = useSelector(
    (store) => store.mainSlice
  );
  const [
    actionMountComponentFromSelectedItemMenu,
    setActionMountComponentFromSelectedItem,
  ] = useState(<div>Как вы здесь оказались? :) ^_^</div>);

  useEffect(() => {
    let accessFor = null;
    let hasRole = null;

    switch (mainAppNavSelected) {
      case MAIN_NAV__HOME_PAGE: {
        accessFor = [`оператор`, `администратор`];
        hasRole = false;

        mainAppAuthUser['массив_ролей'].forEach((itemRole) => {
          if (accessFor.includes(itemRole)) {
            hasRole = true;
          }
        });

        if (!hasRole) {
          toastr.error(
            `Не хватает прав доступа к функционалу`,
            `Ошибка доступа`,
            {
              timeOut: 5000,
              extendedTimeOut: 5000,
              progressBar: true,
              escapeHtml: true,
              closeButton: true,
            }
          );
          break;
        }

        setActionMountComponentFromSelectedItem(<HomePage />);
        break;
      }

      case MAIN_NAV__PROFILE_PAGE: {
        accessFor = [`администратор`];
        hasRole = false;

        mainAppAuthUser['массив_ролей'].forEach((itemRole) => {
          if (accessFor.includes(itemRole)) {
            hasRole = true;
          }
        });

        if (!hasRole) {
          toastr.error(
            `Не хватает прав доступа к функционалу`,
            `Ошибка доступа`,
            {
              timeOut: 5000,
              extendedTimeOut: 5000,
              progressBar: true,
              escapeHtml: true,
              closeButton: true,
            }
          );
          break;
        }

        setActionMountComponentFromSelectedItem(<ProfilePage />);
        break;
      }

      case MAIN_NAV__REPORT_PAGE: {
        accessFor = [`оператор`, `начальник`, `администратор`];
        hasRole = false;

        mainAppAuthUser['массив_ролей'].forEach((itemRole) => {
          if (accessFor.includes(itemRole)) {
            hasRole = true;
          }
        });

        if (!hasRole) {
          toastr.error(
            `Не хватает прав доступа к функционалу`,
            `Ошибка доступа`,
            {
              timeOut: 5000,
              extendedTimeOut: 5000,
              progressBar: true,
              escapeHtml: true,
              closeButton: true,
            }
          );
          break;
        }

        setActionMountComponentFromSelectedItem(<ReportPage />);
        break;
      }

      case MAIN_NAV__MODES_PAGE: {
        accessFor = [`администратор`];
        hasRole = false;

        mainAppAuthUser['массив_ролей'].forEach((itemRole) => {
          if (accessFor.includes(itemRole)) {
            hasRole = true;
          }
        });

        if (!hasRole) {
          toastr.error(
            `Не хватает прав доступа к функционалу`,
            `Ошибка доступа`,
            {
              timeOut: 5000,
              extendedTimeOut: 5000,
              progressBar: true,
              escapeHtml: true,
              closeButton: true,
            }
          );
          break;
        }

        setActionMountComponentFromSelectedItem(<ModesPage />);
        break;
      }

      case MAIN_NAV__HELPS_PAGE: {
        accessFor = [`оператор`, `начальник`, `администратор`];
        hasRole = false;

        mainAppAuthUser['массив_ролей'].forEach((itemRole) => {
          if (accessFor.includes(itemRole)) {
            hasRole = true;
          }
        });

        if (!hasRole) {
          toastr.error(
            `Не хватает прав доступа к функционалу`,
            `Ошибка доступа`,
            {
              timeOut: 5000,
              extendedTimeOut: 5000,
              progressBar: true,
              escapeHtml: true,
              closeButton: true,
            }
          );
          break;
        }

        setActionMountComponentFromSelectedItem(<HelpsPage />);
        break;
      }

      case null: {
        setActionMountComponentFromSelectedItem(<SelectMenuItemComponent />);
        break;
      }

      case MAIN_NAV__SIGNOUT_PAGE:
      default: {
        dispatch(clicedItemMenuSignOut());
        break;
      }
    }
  }, [mainAppNavSelected]);

  return (
    <div className='MainComponent'>
      <div className='MainComponent__top-app'>
        <Header />
      </div>
      <div className='MainComponent__main-app'>
        <AppNavigation />
        {actionMountComponentFromSelectedItemMenu}
      </div>
    </div>
  );
};

export default MainComponent;
