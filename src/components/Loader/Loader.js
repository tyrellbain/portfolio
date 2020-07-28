import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Logo from '../../assets/svgs/face.svg';
import anime from 'animejs';
import classnames from 'classnames';
import styles from './Loader.module.scss';
import { useSelector } from 'react-redux';

function Loader() {
  const logoRef = useRef();
  const start = useSelector((state) => state.app.start);
  const [loopCompleted, setLoopCompleted] = useState(false);

  useEffect(() => {
    if (logoRef.current) {
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
        loopComplete: (anim) => {
          setLoopCompleted(true);
        },
      });
    }
  }, [logoRef, setLoopCompleted]);

  return (
    <CSSTransition
      classNames={{
        exit: styles.fadeOut,
      }}
      in={!start || !loopCompleted}
      timeout={400}
      appear
      unmountOnExit
    >
      <div className={classnames(styles.root)}>
        <div className={classnames(styles.content)}>
          <Logo className={classnames(styles.logo)} ref={logoRef} />
          <p className={classnames(styles.loading)}>Loading...</p>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Loader;
