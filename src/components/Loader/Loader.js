import React, { useEffect, useRef } from 'react';
import Logo from '../../assets/svgs/face.svg';

import anime from 'animejs';
import classnames from 'classnames';
import styles from './Loader.module.scss';

function Loader() {
  const logoRef = useRef();

  useEffect(() => {
    anime({
      targets: logoRef.current.querySelectorAll('path'),
      loop: true,
      direction: 'alternate',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 500,
      delay: (el, i) => {
        return i * 250;
      },
    });
  }, [logoRef]);

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.content)}>
        <Logo className={classnames(styles.logo)} ref={logoRef} />
        <p className={classnames(styles.loading)}>Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
