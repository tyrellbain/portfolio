import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from './Cursor.module.scss';
import useMousePosition from '../../hooks/useMousePosition';
import { useSelector } from 'react-redux';

const Cursor = () => {
  const { message, hovering } = useSelector((state) => state.cursor);
  const { x, y, event } = useMousePosition(50);

  return (
    <div
      style={{ left: x, top: y }}
      className={classnames(styles.root, {
        [styles.button]: hovering,
        [styles.hideDot]: hovering && message,
      })}
    >
      <div className={classnames(styles.inner)} />
      {hovering ? <b className={classnames(styles.status)}>{message}</b> : null}
    </div>
  );
};

export default Cursor;
