import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScrollRail from '../components/InfiniteScrollRail/InfiniteScrollRail';
import classnames from 'classnames';
import { setPageLoaded } from '../redux/reducers/app';
import styles from './index.module.scss';

function Home({ copy }) {
  const dispatch = useDispatch();
  const { pageLoaded } = useSelector((state) => state.app);

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
      <div>
        <button>Works</button>
        <button>About</button>
        <button>Contact</button>
      </div>
    </div>
  );
}

export default Home;
