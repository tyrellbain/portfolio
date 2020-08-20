import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import InfiniteScrollRail from '../components/InfiniteScrollRail/InfiniteScrollRail';
import Link from '../components/Link/Link';
import classnames from 'classnames';
import { getBreakpoint } from '../utils/detect';
import { mouseleaveTrigger } from '../redux/reducers/cursor';
import { setPageLoaded } from '../redux/reducers/app';
import styles from './index.module.scss';
import { useRouter } from 'next/router';

const { links } = require('../data/menu.json');

function Home({ copy }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pageLoaded } = useSelector((state) => state.app);
  const breakpoint = getBreakpoint();

  const createButtons = useCallback(() => {
    const slug = router.pathname.split('/')[0];
    return links.map((link) => {
      if (link.slug !== slug) {
        return (
          <Link className={styles.button} href={link.slug} key={link.name}>
            {link.name}
          </Link>
        );
      }
      return null;
    });
  }, [links]);
  createButtons();

  useEffect(() => {
    dispatch(mouseleaveTrigger());
    return () => dispatch(setPageLoaded(false));
  }, []);

  useLayoutEffect(() => {
    dispatch(setPageLoaded(true));
  }, []);

  return (
    <div className={classnames(styles.root)}>
      <Head>
        <title>Home | Tyrell Bain</title>
        <meta name="description" content="Learn more about Tyrell Bain and past work." />
      </Head>
      <div className={classnames(styles.background)}>
        <div className={classnames(styles.backgroundInner)}>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 10}>
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.name)}>Tyrell Bain</span>
            </h3>
          </InfiniteScrollRail>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 15} direction="right">
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.title)}>Full Stack Developer</span>
            </h3>
          </InfiniteScrollRail>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 15} initalOffset={-200}>
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.name)}>Tyrell Bain</span>
            </h3>
          </InfiniteScrollRail>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 10} direction="right" initalOffset={-200}>
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.title)}>Full Stack Developer</span>
            </h3>
          </InfiniteScrollRail>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 15} initalOffset={-500}>
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.name)}>Tyrell Bain</span>
            </h3>
          </InfiniteScrollRail>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 20} direction="right" initalOffset={-500}>
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.title)}>Full Stack Developer</span>
            </h3>
          </InfiniteScrollRail>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 15} initalOffset={-300}>
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.name)}>Tyrell Bain</span>
            </h3>
          </InfiniteScrollRail>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 10} direction="right" initalOffset={-300}>
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.title)}>Full Stack Developer</span>
            </h3>
          </InfiniteScrollRail>
          <InfiniteScrollRail speed={breakpoint.mobile ? 1 : 15} initalOffset={-200}>
            <h3 className={classnames(styles.copy)}>
              <span className={classnames(styles.name)}>Tyrell Bain</span>
            </h3>
          </InfiniteScrollRail>
        </div>
      </div>
      <div className={classnames(styles.imageContainer)}>
        <img className={classnames(styles.image)} src="/images/home.jpg" />
        <div className={classnames(styles.buttonContainer)}>{createButtons()}</div>
      </div>
    </div>
  );
}

export default Home;
