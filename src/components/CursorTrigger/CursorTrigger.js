import React, { useCallback, useContext, useEffect, useRef } from 'react';
import CursorContext from '../../context/CursorContext';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './CursorTrigger.module.scss';

function CursorTrigger({ children, display, message }) {
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
    <div className={classnames(styles.root, styles[display])} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
      {children}
    </div>
  );
}

CursorTrigger.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  display: PropTypes.oneOf(['block', 'inline']),
  message: PropTypes.string,
};

CursorTrigger.defaultProps = {
  display: 'block',
};

export default CursorTrigger;
