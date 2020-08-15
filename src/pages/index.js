import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CTA from '../components/CTA/CTA';
import InfiniteScrollRail from '../components/InfiniteScrollRail/InfiniteScrollRail';
import classnames from 'classnames';
import { setPageLoaded } from '../redux/reducers/app';
import styles from './index.module.scss';
import { useRouter } from 'next/router';

const { links } = require('../data/menu.json');

function Home({ copy }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pageLoaded } = useSelector((state) => state.app);

  const createButtons = useCallback(() => {
    const slug = router.pathname.split('/')[0];
    return links.map((link) => {
      if (link.slug !== slug) {
        return (
          <CTA href={link.slug} key={link.name}>
            {link.name}
          </CTA>
        );
      }
      return null;
    });
  }, [links]);
  createButtons();

  useEffect(() => {
    return () => dispatch(setPageLoaded(false));
  }, []);

  useLayoutEffect(() => {
    dispatch(setPageLoaded(true));
  }, []);

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.background)}>
        <InfiniteScrollRail speed={10}>
          <h3 className={classnames(styles.copy)}>
            <span className={classnames(styles.name)}>Tyrell Bain</span>
          </h3>
        </InfiniteScrollRail>
        <InfiniteScrollRail speed={15} direction="right">
          <h3 className={classnames(styles.copy)}>
            <span className={classnames(styles.title)}>Full Stack Developer</span>
          </h3>
        </InfiniteScrollRail>
        <InfiniteScrollRail speed={15} initalOffset={-200}>
          <h3 className={classnames(styles.copy)}>
            <span className={classnames(styles.name)}>Tyrell Bain</span>
          </h3>
        </InfiniteScrollRail>
        <InfiniteScrollRail speed={10} direction="right" initalOffset={-200}>
          <h3 className={classnames(styles.copy)}>
            <span className={classnames(styles.title)}>Full Stack Developer</span>
          </h3>
        </InfiniteScrollRail>
        <InfiniteScrollRail speed={15} initalOffset={-500}>
          <h3 className={classnames(styles.copy)}>
            <span className={classnames(styles.name)}>Tyrell Bain</span>
          </h3>
        </InfiniteScrollRail>
        <InfiniteScrollRail speed={20} direction="right" initalOffset={-500}>
          <h3 className={classnames(styles.copy)}>
            <span className={classnames(styles.title)}>Full Stack Developer</span>
          </h3>
        </InfiniteScrollRail>
        <InfiniteScrollRail speed={15} initalOffset={-300}>
          <h3 className={classnames(styles.copy)}>
            <span className={classnames(styles.name)}>Tyrell Bain</span>
          </h3>
        </InfiniteScrollRail>
        <InfiniteScrollRail speed={10} direction="right" initalOffset={-300}>
          <h3 className={classnames(styles.copy)}>
            <span className={classnames(styles.title)}>Full Stack Developer</span>
          </h3>
        </InfiniteScrollRail>
      </div>
      <div className={classnames(styles.imageContainer)}>
        <img className={classnames(styles.image)} src="/images/home.jpg" />
      </div>
      <div className={classnames(styles.buttonContainer)}>{createButtons()}</div>
    </div>
  );
}

export default Home;
