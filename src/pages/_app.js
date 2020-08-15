import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Cursor from '../components/Cursor/Cursor';
import CursorTrigger from '../components/CursorTrigger/CursorTrigger';
import HamburgerButton from '../components/HamburgerButton/HamburgerButton';
import Layout from '../components/Layout/Layout';
import Link from '../components/Link/Link';
import Loader from '../components/Loader/Loader';
import Logo from '../assets/svgs/face.svg';
import Menu from '../components/Menu/Menu';
import PageTransition from '../components/PageTransition/PageTransition';

import classnames from 'classnames';
const { links } = require('../data/menu.json');
import { setAppStart } from '../redux/reducers/app';
import styles from './app.module.scss';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { withRedux } from '../redux/withRedux';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  // const dispatch = useDispatch();
  const router = useRouter();
  const pageName = links.find((link) => link.slug === router.pathname.split('/')[1]);

  return (
    <>
      <PageTransition>
        <Cursor />
        <HamburgerButton className={classnames(styles.hamburgerButton)} />
        <div className={classnames(styles.logo)}>
          <Link message="Home" href="/" display="block">
            <Logo />
          </Link>
        </div>
        <h2 className={classnames(styles.pageName)}>{pageName?.name}</h2>
        <Menu />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageTransition>
    </>
  );
}

export default withRedux(MyApp);
