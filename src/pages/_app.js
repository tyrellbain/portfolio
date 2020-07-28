import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { setAppStart } from '../redux/reducers/app';
import styles from './app.module.scss';
import { useRouter } from 'next/router';
import { withRedux } from '../redux/withRedux';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const start = useSelector((state) => state.app.start);
  const pageName = links.find((link) => link.slug === useRouter().pathname.split('/')[1]);

  useEffect(() => {
    dispatch(setAppStart());
  }, [dispatch, setAppStart]);

  return (
    <>
      <Loader />
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
    </>
  );
}

export default withRedux(MyApp);
