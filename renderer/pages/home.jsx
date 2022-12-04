import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';

import {
  MAIN_STATUS__APP_AUTH_NOT,
  MAIN_STATUS__APP_AUTH_ERR,
  MAIN_STATUS__APP_AUTH_SUCCESS,
} from './../types';

import LoginComponent from './components/LoginComponent/LoginComponent';

function Home() {
  const { mainAppStatusAuth } = useSelector((store) => {
    const { mainAppStatusAuth } = store.mainSlice;

    return { mainAppStatusAuth };
  });

  return (
    <React.Fragment>
      {mainAppStatusAuth !== MAIN_STATUS__APP_AUTH_SUCCESS ? (
        <LoginComponent />
      ) : (
        <div>авторизован</div>
      )}

      {/* <div>123</div>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <div></div>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href='/next'>
            <a>Go to next page</a>
          </Link>
        </p>
        <img src='/images/logo.png' />
      </div> */}

      {/* <div>
        <ul>
          <li>
            <Link href='/components/LoginComponent/LoginComponent'>
              <a>Авторизация</a>
            </Link>
          </li>
          <li></li>
        </ul>
      </div> */}
    </React.Fragment>
  );
}

export default Home;
