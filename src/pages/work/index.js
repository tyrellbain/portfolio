import React, { useCallback, useEffect, useState } from 'react';
import SVGText from '../../components/SVGText/SVGText';

import classnames from 'classnames';
import debounce from 'lodash.debounce';
import styles from './Work.module.scss';

const { works } = require('../../data/work.json');
const slideCount = works.length;
const SCROLL_THRESHOLD = 1;

function Work() {
  const [activeSlide, setActiveSlide] = useState(1);

  const nextSlide = useCallback(() => {
    if (activeSlide !== slideCount) {
      setActiveSlide(activeSlide + 1);
    }
  }, [setActiveSlide, activeSlide]);

  const prevSlide = useCallback(() => {
    if (activeSlide !== 1) {
      setActiveSlide(activeSlide - 1);
    }
  }, [activeSlide, setActiveSlide]);

  const onwheel = debounce(({ wheelDeltaY }) => {
    if (wheelDeltaY < -SCROLL_THRESHOLD) {
      nextSlide();
    } else if (wheelDeltaY > SCROLL_THRESHOLD) {
      prevSlide();
    }
  }, 250);

  useEffect(() => {
    window.addEventListener('wheel', onwheel);
    return () => window.removeEventListener('wheel', onwheel);
  }, [onwheel]);

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        {works.map((work, i) => (
          <section
            className={classnames(styles.project, { [styles.activeProject]: activeSlide === i + 1 })}
            key={work.name}
          >
            <div className={classnames(styles.content)}>
              <h2>
                <span className={classnames(styles.transitionElement, styles.transitionText)}>{work.name}</span>
              </h2>
              <p>
                <span className={classnames(styles.transitionElement, styles.transitionText)}>{work.description}</span>
              </p>
              <span>
                <span className={classnames(styles.transitionElement, styles.transitionText)}>{work.role}/</span>
              </span>
              <span>
                <span className={classnames(styles.transitionElement, styles.transitionText)}>{work.year}</span>
              </span>
            </div>
            <div className={classnames(styles.imgContainer)}>
              <div className={classnames(styles.transitionElement, styles.transitionImage)}>
                <img src={work.image} />
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className={classnames(styles.slideCount)}>{`${activeSlide}/${slideCount}`}</div>
    </div>
  );
}

export default Work;
