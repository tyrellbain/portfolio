import React, { useCallback, useEffect, useState } from 'react';
import Slider from '../../components/Slider/Slider';
import SliderContext from '../../context/SliderContext';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import styles from './Work.module.scss';

const { works } = require('../../data/work.json');
const slideCount = works.length;

function Work() {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        <SliderContext.Provider value={{ activeSlide, setActiveSlide }}>
          <Slider projects={works} />
        </SliderContext.Provider>
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
