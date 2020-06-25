import React, { useCallback, useEffect, useState } from 'react';
import Slider from '../../components/Slider/Slider';
import SliderContext from '../../context/SliderContext';

import classnames from 'classnames';
import debounce from 'lodash.debounce';
import styles from './Work.module.scss';

const { works } = require('../../data/work.json');
const slideCount = works.length;
const SCROLL_THRESHOLD = 1;

function Work() {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        <SliderContext.Provider value={{ activeSlide, setActiveSlide }}>
          <Slider projects={works} />
        </SliderContext.Provider>
      </div>
      <div className={classnames(styles.slideCount)}>
        <div>{activeSlide}</div>
        <div>{slideCount}</div>
      </div>
    </div>
  );
}

export default Work;
