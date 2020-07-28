import React, { useContext, useEffect, useRef, useState } from 'react';
import CursorContext from '../../context/CursorContext';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './Cursor.module.scss';
import useMousePosition from '../../hooks/useMousePosition';
import { useSelector } from 'react-redux';

// Window, document, html, body, div#__next
const DEFAULT_DOM_ELEMENTS = 5;

const Cursor = () => {
  const { message, hovering } = useSelector((state) => state.cursor);
  const { x, y, event } = useMousePosition(50);

  return (
    <div
      style={{ left: x, top: y }}
      className={classnames(styles.root, {
        [styles.button]: hovering,
        [styles.hideDot]: message && message > 0,
      })}
    >
      <div className={classnames(styles.inner)} />
      {hovering ? <b className={classnames(styles.status)}>{message}</b> : null}
    </div>
  );
};

export default Cursor;
