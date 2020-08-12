import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../../components/Slider/Slider';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import { setSlideCount } from '../../redux/reducers/slider';
import styles from './Work.module.scss';

import { setPageLoaded } from '../../redux/reducers/app';

const { works } = require('../../data/work.json');

function Work() {
  const { activeSlide, slideCount } = useSelector((state) => state.slider);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSlideCount(works.length));
    return () => dispatch(setPageLoaded(false));
  }, []);

  useLayoutEffect(() => {
    dispatch(setPageLoaded(true));
  }, []);

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        <Slider projects={works} />
      </div>
      <div className={classnames(styles.slideIndicator)}>
        <div className={classnames(styles.currentSlide)}>{activeSlide.toString().padStart(3, 0)}</div>
        <div className={classnames(styles.divider)} />
        <div className={classnames(styles.slideCount)}>{slideCount.toString().padStart(3, 0)}</div>
      </div>
    </div>
  );
}

export default Work;
