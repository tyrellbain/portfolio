import React, { useContext, useEffect, useRef } from 'react';
import AppContext from '../../context/AppContext';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './Layout.module.scss';
import useScroll from '../../hooks/useScroll';

function Layout({ children, onScroll }) {
  const mainRef = useRef();
  const { showNextButton, setShowNextButton } = useContext(AppContext);
  const { percentage } = useScroll(mainRef);

  // useEffect(() => {
  //   console.log('precetage', percentage);
  //   console.log('bottom', bottom);
  //   if (percentage === 100) {
  //     setShowNextButton(true);
  //   } else {
  //     setShowNextButton(false);
  //   }
  // }, [percentage, showNextButton, setShowNextButton]);

  return (
    <main className={classnames(styles.root)} ref={mainRef}>
      {children}
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
