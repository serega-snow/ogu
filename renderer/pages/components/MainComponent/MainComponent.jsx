import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import AppNavigation from '../AppNavigation/AppNavigation';

import {
  MAIN_NAV__HOME_PAGE,
  MAIN_NAV__PROFILE_PAGE,
  MAIN_NAV__REPORT_PAGE,
  MAIN_NAV__MODES_PAGE,
  MAIN_NAV__HELPS_PAGE,
  MAIN_NAV__SIGNOUT_PAGE,
} from '../../../types';

const MainComponent = () => {
  const { mainAppNavSelected } = useSelector((store) => store.mainSlice);

  return (
    <div className='MainComponent'>
      <div className='MainComponent__top-app'>
        <Header />
      </div>
      <div className='MainComponent__main-app'>
        <AppNavigation />
        <div>
          {mainAppNavSelected === MAIN_NAV__HOME_PAGE && (
            <div>MAIN_NAV__HOME_PAGE</div>
          )}
          {mainAppNavSelected === MAIN_NAV__PROFILE_PAGE && (
            <div>MAIN_NAV__PROFILE_PAGE</div>
          )}
          {mainAppNavSelected === MAIN_NAV__REPORT_PAGE && (
            <div> MAIN_NAV__REPORT_PAGE</div>
          )}
          {mainAppNavSelected === MAIN_NAV__MODES_PAGE && (
            <div> MAIN_NAV__MODES_PAGE</div>
          )}
          {mainAppNavSelected === MAIN_NAV__HELPS_PAGE && (
            <div>MAIN_NAV__HELPS_PAGE</div>
          )}
          {mainAppNavSelected === MAIN_NAV__SIGNOUT_PAGE && (
            <div>MAIN_NAV__SIGNOUT_PAGE</div>
          )}
          {mainAppNavSelected === null && <div>null</div>}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
