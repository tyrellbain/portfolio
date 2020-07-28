import Link from '../../components/Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from './SliderSlide.module.scss';

function SliderSlide({ data, isActive }) {
  return (
    <article className={classnames(styles.root, { [styles.activeProject]: isActive })}>
      <div className={classnames(styles.content)}>
        <h2 className={classnames(styles.title)}>
          <span className={classnames(styles.transitionElement, styles.transitionText)}>{data.name}</span>
        </h2>
        <p className={classnames(styles.description)}>
          <span className={classnames(styles.transitionElement, styles.transitionText)}>{data.description}</span>
        </p>
        <div className={classnames(styles.meta)}>
          <span className={classnames(styles.transitionElement, styles.transitionText)}>{data.role}/</span>
          <span className={classnames(styles.transitionElement, styles.transitionText)}>{data.year}</span>
        </div>
      </div>
      <div className={classnames(styles.imgContainer)}>
        <div className={classnames(styles.transitionElement, styles.transitionImage)}>
          <img src={data.image} />
        </div>
      </div>
    </article>
  );
}

SliderSlide.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    role: PropTypes.string,
    year: PropTypes.number,
    image: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SliderSlide;
