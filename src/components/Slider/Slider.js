import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Slide from '../SliderSlide/SliderSlide';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import { setActiveSlide } from '../../redux/reducers/slider';
import styles from './Slider.module.scss';
import useSwipe from '../../hooks/useSwipe';

const SCROLL_THRESHOLD = 1;

function Slider({ projects }) {
  const dispatch = useDispatch();
  const { direction } = useSwipe();
  const { activeSlide, slideCount } = useSelector((state) => state.slider);

  const nextSlide = useCallback(() => {
    if (activeSlide !== slideCount) {
      dispatch(setActiveSlide(activeSlide + 1));
    }
  }, [dispatch, setActiveSlide, activeSlide]);

  const prevSlide = useCallback(() => {
    if (activeSlide !== 1) {
      dispatch(setActiveSlide(activeSlide - 1));
    }
  }, [activeSlide, setActiveSlide]);

  const onwheel = debounce(({ wheelDeltaY }) => {
    if (wheelDeltaY < -SCROLL_THRESHOLD) {
      nextSlide();
    } else if (wheelDeltaY > SCROLL_THRESHOLD) {
      prevSlide();
    }
  }, 50);

  useEffect(() => {
    if (direction.y === 'up') {
      nextSlide();
    } else if (direction.y === 'down') {
      prevSlide();
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('wheel', onwheel);
    return () => window.removeEventListener('wheel', onwheel);
  }, [onwheel]);

  return (
    <section className={classnames(styles.root)}>
      {projects.map((project, i) => (
        <Slide data={project} isActive={activeSlide === i + 1} key={project.name} />
      ))}
    </section>
  );
}

Slider.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      role: PropTypes.string,
      year: PropTypes.number,
      image: PropTypes.string,
      link: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default Slider;
