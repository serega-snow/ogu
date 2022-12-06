import React from 'react';
import { useDispatch } from 'react-redux';
import { selectItemMenuNav } from '../../../redux/slices/mainSlice';
import {
  MAIN_NAV__HOME_PAGE,
  MAIN_NAV__PROFILE_PAGE,
  MAIN_NAV__REPORT_PAGE,
  MAIN_NAV__MODES_PAGE,
  MAIN_NAV__HELPS_PAGE,
  MAIN_NAV__SIGNOUT_PAGE,
} from '../../../types';

import NavHomeIcon from '../../icons/nav-home';
import NavProfileIcon from '../../icons/nav-profile';
import NavReportsIcon from '../../icons/nav-reports';
import NavModesIcon from '../../icons/nav-modes';
import NavHelpsIcon from '../../icons/nav-help';
import NavSignoutIcon from '../../icons/nav-signout';

const AppNavigation = () => {
  const dispatch = useDispatch();

  return (
    <div className='AppNavigation'>
      <div className='AppNavigation__menu'>
        <div
          className='AppNavigation__menu-item'
          onClick={() => dispatch(selectItemMenuNav(MAIN_NAV__HOME_PAGE))}
        >
          <NavHomeIcon />
          <span>Главная</span>
        </div>
        <div
          className='AppNavigation__menu-item'
          onClick={() => dispatch(selectItemMenuNav(MAIN_NAV__PROFILE_PAGE))}
        >
          <NavProfileIcon />
          <span>Профили</span>
        </div>
        <div
          className='AppNavigation__menu-item'
          onClick={() => dispatch(selectItemMenuNav(MAIN_NAV__REPORT_PAGE))}
        >
          <NavReportsIcon />
          <span>Отчеты</span>
        </div>
        <div
          className='AppNavigation__menu-item'
          onClick={() => dispatch(selectItemMenuNav(MAIN_NAV__MODES_PAGE))}
        >
          <NavModesIcon />
          <span>Режимы</span>
        </div>
        <div
          className='AppNavigation__menu-item'
          onClick={() => dispatch(selectItemMenuNav(MAIN_NAV__HELPS_PAGE))}
        >
          <NavHelpsIcon />
          <span>Справка</span>
        </div>
        <div
          className='AppNavigation__menu-item'
          onClick={() => dispatch(selectItemMenuNav(MAIN_NAV__SIGNOUT_PAGE))}
        >
          <NavSignoutIcon />
          <span>Выход</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AppNavigation;
