import React, { useEffect, useState } from 'react';
import CursorTrigger from '../CursorTrigger/CursorTrigger';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './HamburgerButton.module.scss';

function HamburgerButton({ onClick, isOpen }) {
  const [cursorMsg, setCursorMsg] = useState('See More');

  useEffect(() => {
    setCursorMsg(isOpen ? 'Close' : 'See More...');
  }, [isOpen]);

  return (
    <CursorTrigger message={cursorMsg}>
      <button className={classnames(styles.root, { [styles.isOpen]: isOpen })} onClick={onClick}>
        <div className={classnames(styles.bar, styles.top)} />
        <div className={classnames(styles.bar, styles.middle)} />
        <div className={classnames(styles.bar, styles.bottom)} />
      </button>
    </CursorTrigger>
  );
}

HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default HamburgerButton;
