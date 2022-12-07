import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clicedItemMenuSignOut } from '../../../redux/slices/mainSlice';

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

  const { mainAppNavSelected } = useSelector((store) => store.mainSlice);
  const [
    actionMountComponentFromSelectedItemMenu,
    setActionMountComponentFromSelectedItem,
  ] = useState(<div>Как вы здесь оказались? :) ^_^</div>);

  useEffect(() => {
    switch (mainAppNavSelected) {
      case MAIN_NAV__HOME_PAGE:
        setActionMountComponentFromSelectedItem(<HomePage />);
        break;
      case MAIN_NAV__PROFILE_PAGE:
        setActionMountComponentFromSelectedItem(<ProfilePage />);
        break;
      case MAIN_NAV__REPORT_PAGE:
        setActionMountComponentFromSelectedItem(<ReportPage />);
        break;
      case MAIN_NAV__MODES_PAGE:
        setActionMountComponentFromSelectedItem(<ModesPage />);
        break;
      case MAIN_NAV__HELPS_PAGE:
        setActionMountComponentFromSelectedItem(<HelpsPage />);
        break;
      case null:
        setActionMountComponentFromSelectedItem(<SelectMenuItemComponent />);
        break;
      case MAIN_NAV__SIGNOUT_PAGE:
      default:
        dispatch(clicedItemMenuSignOut());
        break;
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
