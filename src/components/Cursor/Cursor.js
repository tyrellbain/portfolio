import React, { useContext, useEffect, useRef, useState } from 'react';
import CursorContext from '../../context/CursorContext';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './Cursor.module.scss';
import useMousePosition from '../../hooks/useMousePosition';

// Window, document, html, body, div#__next
const DEFAULT_DOM_ELEMENTS = 5;

const Cursor = () => {
  const { isHoveringOnTrigger, triggerMessage } = useContext(CursorContext);
  const { x, y, event } = useMousePosition(50);
  const targetArr = event.path
    .slice(0, event.path.length - DEFAULT_DOM_ELEMENTS)
    .map((el) => el.nodeName.toLowerCase());
  const isClickable = targetArr.includes('button') || targetArr.includes('a');
  const hasStatus = isClickable;

  return (
    <div
      style={{ left: x, top: y }}
      className={classnames(styles.root, {
        [styles.button]: isHoveringOnTrigger,
        [styles.hideDot]: triggerMessage && triggerMessage.length > 0,
      })}
    >
      <div className={classnames(styles.inner)} />
      {isHoveringOnTrigger ? <b className={classnames(styles.status)}>{triggerMessage}</b> : null}
    </div>
  );
};

export default Cursor;
