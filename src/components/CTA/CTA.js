import Link from '../Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import styles from './CTA.module.scss';

const CTA = ({ children, className, href }) => {
  return (
    <Link href={href} className={classnames(styles.root, className)}>
      <span className={classnames(styles.content)}>{children}</span>
    </Link>
  );
};

CTA.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default CTA;
