import React, { useEffect, useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import { CSSTransition } from 'react-transition-group';
import Cursor from '../components/Cursor/Cursor';
import CursorContext from '../context/CursorContext';
import CursorTrigger from '../components/CursorTrigger/CursorTrigger';
import HamburgerButton from '../components/HamburgerButton/HamburgerButton';
import Layout from '../components/Layout/Layout';
import Link from '../components/Link/Link';
import Loader from '../components/Loader/Loader';
import Logo from '../assets/svgs/face.svg';
import Menu from '../components/Menu/Menu';

import classnames from 'classnames';
const { links } = require('../data/menu.json');
import styles from './app.module.scss';
import { useRouter } from 'next/router';
import useScroll from '../hooks/useScroll';
import { withRedux } from '../redux/withRedux';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isHoveringOnTrigger, setHoveringOnTrigger] = useState(false);
  const [triggerMessage, setTriggerMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const pageName = links.find((link) => link.slug === useRouter().pathname.split('/')[1]);
  const activeMenuIndex = links.findIndex((el) => el === pageName);
  const prevPage = activeMenuIndex === 0 ? links[links.length - 1] : links[activeMenuIndex - 1];
  const nextPage = activeMenuIndex === links.length - 1 ? links[0] : links[activeMenuIndex + 1];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <CSSTransition in={loading} timeout={2000} unmountOnExit>
        <Loader />
      </CSSTransition>
      <CursorContext.Provider value={{ isHoveringOnTrigger, setHoveringOnTrigger, triggerMessage, setTriggerMessage }}>
        <Cursor />
        <HamburgerButton
          className={classnames(styles.hamburgerButton)}
          onClick={() => setMenuOpen(!menuOpen)}
          isOpen={menuOpen}
        />
        <CursorTrigger className={classnames(styles.logo)} message="Home">
          <Link href="/" display="block">
            <a>
              <Logo />
            </a>
          </Link>
        </CursorTrigger>
        <h2 className={classnames(styles.pageName)}>{pageName?.name}</h2>
        <Menu
          onClick={() => {
            setHoveringOnTrigger(false);
            setTriggerMessage('');
            setMenuOpen(!menuOpen);
          }}
          isOpen={menuOpen}
        />
        <AppContext.Provider value={{ showNextButton, setShowNextButton }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
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
//   const appProps = await MyApp.getInitialProps(appContext);

//   return { ...appProps };
// };

export default withRedux(MyApp);

// <Link href={`/${prevPage?.slug}`}>
//           <a className={classnames(styles.navigationChevron, styles.prev)}>{`< ${prevPage?.name}`}</a>
//         </Link>
//         <Link href={`/${nextPage?.slug}`}>
//           <a
//             className={classnames(styles.navigationChevron, styles.next, { [styles.show]: showNextButton })}
//           >{`${nextPage?.name} >`}</a>
//         </Link>
