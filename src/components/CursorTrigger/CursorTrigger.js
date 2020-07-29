import { mouseleaveTrigger, mouseoverTrigger } from '../../redux/reducers/cursor';
import CursorContext from '../../context/CursorContext';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from './CursorTrigger.module.scss';
import { useDispatch } from 'react-redux';

function CursorTrigger({ children, className, display, message }) {
  const dispatch = useDispatch();

  return (
    <div
      className={classnames(styles.root, className, styles[display])}
      onMouseOver={() => {
        dispatch(mouseoverTrigger(message));
      }}
      onMouseLeave={() => {
        dispatch(mouseleaveTrigger());
      }}
    >
      {children}
    </div>
  );
}

CursorTrigger.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  display: PropTypes.oneOf(['block', 'inline']),
  message: PropTypes.string,
};

CursorTrigger.defaultProps = {
  display: 'block',
};

export default CursorTrigger;
