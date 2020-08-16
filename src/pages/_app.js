import HamburgerButton from '../components/HamburgerButton/HamburgerButton';
import Layout from '../components/Layout/Layout';
import Link from '../components/Link/Link';
import Logo from '../assets/svgs/face.svg';
import Menu from '../components/Menu/Menu';
import PageTransition from '../components/PageTransition/PageTransition';
import React from 'react';

const Cursor = dynamic(() => import(/* webpackChunkName: "Cursor" */ '../components/Cursor/Cursor'), { ssr: false });

import classnames from 'classnames';
const { links } = require('../data/menu.json');
import dynamic from 'next/dynamic';
import { hasTouch } from '../utils/detect';
import styles from './app.module.scss';
import { useRouter } from 'next/router';
import { withRedux } from '../redux/withRedux';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageName = links.find((link) => link.slug === router.pathname.split('/')[1]);

  return (
    <PageTransition>
      {!hasTouch ? <Cursor /> : null}
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
  );
}

export default withRedux(MyApp);
