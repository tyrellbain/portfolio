import { useDispatch, useSelector } from 'react-redux';
import CursorTrigger from '../CursorTrigger/CursorTrigger';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { setMenuOpen } from '../../redux/reducers/app';
import styles from './HamburgerButton.module.scss';

function HamburgerButton({ className }) {
  const menuOpen = useSelector((state) => state.app.menuOpen);
  const dispatch = useDispatch();

  return (
    <CursorTrigger className={className} message={menuOpen ? 'Close' : 'See More'} display="block">
      <button
        className={classnames(styles.root, { [styles.isOpen]: menuOpen })}
        onClick={() => dispatch(setMenuOpen(!menuOpen))}
      >
        <div className={classnames(styles.bar, styles.top)} />
        <div className={classnames(styles.bar, styles.middle)} />
        <div className={classnames(styles.bar, styles.bottom)} />
      </button>
    </CursorTrigger>
  );
}

HamburgerButton.propTypes = {
  className: PropTypes.string,
};

export default HamburgerButton;
