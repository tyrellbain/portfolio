import React, { useEffect, useState } from 'react';
import CursorTrigger from '../CursorTrigger/CursorTrigger';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './HamburgerButton.module.scss';

function HamburgerButton({ className, onClick, isOpen }) {
  const [cursorMsg, setCursorMsg] = useState('See More');

  useEffect(() => {
    setCursorMsg(isOpen ? 'Close' : 'See More...');
  }, [isOpen]);

  return (
    <CursorTrigger className={className} message={cursorMsg} display="block">
      <button className={classnames(styles.root, { [styles.isOpen]: isOpen })} onClick={onClick}>
        <div className={classnames(styles.bar, styles.top)} />
        <div className={classnames(styles.bar, styles.middle)} />
        <div className={classnames(styles.bar, styles.bottom)} />
      </button>
    </CursorTrigger>
  );
}

HamburgerButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default HamburgerButton;
