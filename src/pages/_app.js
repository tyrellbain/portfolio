import React, { useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import Cursor from '../components/Cursor/Cursor';
import CursorContext from '../context/CursorContext';
import CursorTrigger from '../components/CursorTrigger/CursorTrigger';
import HamburgerButton from '../components/HamburgerButton/HamburgerButton';
import Layout from '../components/Layout/Layout';
import Link from 'next/link';
import Logo from '../assets/svgs/face.svg';
import Menu from '../components/Menu/Menu';

import classnames from 'classnames';
const { links } = require('../data/menu.json');
import styles from './app.module.scss';
import { useRouter } from 'next/router';
import useScroll from '../hooks/useScroll';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isHoveringOnTrigger, setHoveringOnTrigger] = useState(false);
  const [triggerMessage, setTriggerMessage] = useState('');
  const pageName = links.find((link) => link.slug === useRouter().pathname.split('/')[1]);
  const activeMenuIndex = links.findIndex((el) => el === pageName);
  const prevPage = activeMenuIndex === 0 ? links[links.length - 1] : links[activeMenuIndex - 1];
  const nextPage = activeMenuIndex === links.length - 1 ? links[0] : links[activeMenuIndex + 1];

  return (
    <>
      <CursorContext.Provider value={{ isHoveringOnTrigger, setHoveringOnTrigger, triggerMessage, setTriggerMessage }}>
        <Cursor />
        <HamburgerButton onClick={() => setMenuOpen(!menuOpen)} isOpen={menuOpen} />
        <CursorTrigger message="Home">
          <Link href="/">
            <a className={classnames(styles.logo)}>
              <Logo />
            </a>
          </Link>
        </CursorTrigger>
        <h2 className={classnames(styles.pageName)}>{pageName?.name}</h2>
        {menuOpen ? <Menu onClick={() => setMenuOpen(!menuOpen)} data-cursor="Menu" /> : null}
        <AppContext.Provider value={{ showNextButton, setShowNextButton }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
        <Link href={`/${prevPage?.slug}`}>
          <a className={classnames(styles.navigationChevron, styles.prev)}>{`< ${prevPage?.name}`}</a>
        </Link>
        <Link href={`/${nextPage?.slug}`}>
          <a
            className={classnames(styles.navigationChevron, styles.next, { [styles.show]: showNextButton })}
          >{`${nextPage?.name} >`}</a>
        </Link>
      </CursorContext.Provider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
