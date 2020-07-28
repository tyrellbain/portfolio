import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { mouseleaveTrigger, mouseoverTrigger } from '../../redux/reducers/cursor';
import CursorContext from '../../context/CursorContext';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './CursorTrigger.module.scss';
import { useDispatch } from 'react-redux';

function CursorTrigger({ children, className, display, message }) {
  const dispatch = useDispatch();
  const mainRef = useRef();
  const { setHoveringOnTrigger, setTriggerMessage } = useContext(CursorContext);

  useEffect(() => {
    setTriggerMessage(message);
  }, [message, setTriggerMessage]);

  const mouseOver = useCallback(
    (e) => {
      setHoveringOnTrigger(true);
      message && setTriggerMessage(message);
    },
    [message, setHoveringOnTrigger, setTriggerMessage]
  );

  const mouseLeave = useCallback(
    (e) => {
      setHoveringOnTrigger(false);
      setTriggerMessage('');
    },
    [setHoveringOnTrigger, setTriggerMessage]
  );

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
