import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './SVGText.module.scss';
import useResize from '../../hooks/useResize';
import useTimeout from '../../hooks/useTimeout';

const SVGText = ({ children, className, height, width }) => {
  // const numArr = String(children).split('');
  return (
    <svg className={classnames(styles.root)} viewBox="0 0 50 115" width={width} height={height}>
      <defs>
        <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="rgba(0,0,0,0.5)" />
          <circle cx="6" cy="6" r="2" fill="rgba(0,0,0,0.5)" />
        </pattern>
      </defs>
      <text fill="#000" fontSize="100px" fontWeight={600} x="0" y="85px">
        {children}
      </text>
      <text fill="#fff" stroke="#000" fontSize="100px" fontWeight={600} x="0" y="85px">
        {children}
      </text>
      <text fill="url(#dots)" fontSize="100px" fontWeight={600} x="0" y="85px">
        {children}
      </text>
    </svg>
  );
};

SVGText.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SVGText.defaultProps = {
  height: 50,
  width: '100%',
};

export default SVGText;
