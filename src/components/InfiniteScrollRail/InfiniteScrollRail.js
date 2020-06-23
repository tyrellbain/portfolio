import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './InfiniteScrollRail.module.scss';
import useResize from '../../hooks/useResize';
import useTimeout from '../../hooks/useTimeout';

const widths = { desktop: 350, tablet: 300, mobile: 200 };

function InfiniteScrollRail({ children, direction, speed, initalOffset }) {
  const railArr = useRef([children, children, children, children]);
  const railRef = useRef();
  const [offset, setOffset] = useState(initalOffset);

  useEffect(() => {
    if (offset <= -railRef.current.offsetWidth) {
      const firstEl = railArr.current.shift();
      setOffset(100 / railArr.current.length);
      railArr.current.push(firstEl);
      setOffset(0);
    }
  }, [offset, railRef]);

  useTimeout(() => setOffset(offset - 0.1), speed);

  return (
    <div className={classnames(styles.root, { [styles.flip]: direction === 'right' })}>
      <div
        className={styles.row}
        style={{
          transform: `translate3d(${offset}px, 0, 0)`,
        }}
      >
        {railArr.current.map((item, i) => (
          <div className={styles.tile} key={i} ref={(el) => (railRef.current = el)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

InfiniteScrollRail.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  initalOffset: PropTypes.number,
};

InfiniteScrollRail.defaultProps = {
  direction: 'left',
  speed: 25,
  initalOffset: 0,
};

export default InfiniteScrollRail;
