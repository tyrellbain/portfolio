import React, { useEffect, useRef, useState } from 'react';
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
import useScroll from '../hooks/useScroll';
import { withRedux } from '../redux/withRedux';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isHoveringOnTrigger, setHoveringOnTrigger] = useState(false);
  const [triggerMessage, setTriggerMessage] = useState(null);

  const start = useSelector((state) => state.app.start);

  const pageName = links.find((link) => link.slug === useRouter().pathname.split('/')[1]);
  const activeMenuIndex = links.findIndex((el) => el === pageName);
  const prevPage = activeMenuIndex === 0 ? links[links.length - 1] : links[activeMenuIndex - 1];
  const nextPage = activeMenuIndex === links.length - 1 ? links[0] : links[activeMenuIndex + 1];

  useEffect(() => {
    dispatch(setAppStart());
  }, []);

  return (
    <>
      <Loader />
      <Cursor />
      <HamburgerButton className={classnames(styles.hamburgerButton)} />
      <CursorTrigger className={classnames(styles.logo)} message="Home">
        <Link href="/" display="block">
          <Logo />
        </Link>
      </CursorTrigger>
      <h2 className={classnames(styles.pageName)}>{pageName?.name}</h2>
      <Menu
        onClick={() => {
          setHoveringOnTrigger(false);
          setTriggerMessage('');
          setMenuOpen(!menuOpen);
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default withRedux(MyApp);
