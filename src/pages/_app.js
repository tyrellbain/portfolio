import HamburgerButton from '../components/HamburgerButton/HamburgerButton';
import Head from 'next/head';
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
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
