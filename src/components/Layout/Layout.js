import PropTypes from 'prop-types';
import React from 'react';

import classnames from 'classnames';
import styles from './Layout.module.scss';
import useScroll from '../../hooks/useScroll';

function Layout({ children, onScroll }) {
  return <main className={classnames(styles.root)}>{children}</main>;
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
