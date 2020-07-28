import React, { useCallback, useContext, useEffect, useRef } from 'react';
import CursorContext from '../../context/CursorContext';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Link.module.scss';

const externalFlags = ['http', 'https', 'www'];

function Link({ className, children, display, href, message, onClick, style }) {
  const isExternal =
    externalFlags.filter((flag) => {
      return href?.includes(flag);
    }).length > 0;

  const { setHoveringOnTrigger, setTriggerMessage } = useContext(CursorContext);

  useEffect(() => {
    setTriggerMessage(message);
  }, [message, setTriggerMessage]);

  const mouseOver = useCallback(
    (e) => {
      setHoveringOnTrigger(true);
      setTriggerMessage(message);
    },
    [message, setHoveringOnTrigger, setTriggerMessage]
  );

  const mouseLeave = useCallback(
    (e) => {
      setHoveringOnTrigger(false);
      setTriggerMessage(null);
    },
    [setHoveringOnTrigger, setTriggerMessage]
  );

  return (
    <div className={classnames(styles.root, styles[display])} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
      {isExternal ? (
        <a className={classnames(className)} href={href} target="_blank" onClick={onClick} style={{ ...style }}>
          {children}
        </a>
      ) : (
        <NextLink href={href}>
          <a className={classnames(className)} onClick={onClick} style={{ ...style }}>
            {children}
          </a>
        </NextLink>
      )}
    </div>
  );
}

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  display: PropTypes.oneOf(['block', 'inline']),
  href: PropTypes.string.isRequired,
  message: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

Link.defaultProps = {
  display: 'inline',
  message: null,
};

export default Link;
