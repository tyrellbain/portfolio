import { CSSTransition, Transition } from 'react-transition-group';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/svgs/face.svg';
import PropTypes from 'prop-types';
import { SHUTTER_COUNT } from '../../utils/config';
import anime from 'animejs';
import classnames from 'classnames';
import { setPageLoaded } from '../../redux/reducers/app';
import styles from './PageTransition.module.scss';
import { useRouter } from 'next/router';
import useTimeout from '../../hooks/useTimeout';

const ANIMATION_OUT_DURATION_MS = 565;
const ANIMATION_IN_DURATION_MS = 435;

function PageTransition({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pageLoaded = useSelector((state) => state.app.pageLoaded);
  const [showTransition, setShowTransition] = useState(true);
  const [timeoutEnded, setTimeoutEnded] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const shutterRefs = useRef(new Array(SHUTTER_COUNT));

  useTimeout(() => setTimeoutEnded(true), ANIMATION_OUT_DURATION_MS + ANIMATION_IN_DURATION_MS);

  useEffect(() => {
    setTimeoutEnded(false);
  }, [router]);

  const createShutters = useCallback(() => {
    let shutters = [];
    for (let i = 0; i < SHUTTER_COUNT; i++) {
      const shuterRef = shutterRefs.current[i] ? shutterRefs.current[i] : React.createRef();
      shutterRefs.current[i] = shuterRef;
      shutters.push(
        <div
          className={classnames(styles.shutter)}
          key={`shutter-${i}`}
          style={{ left: `${(i * 100) / SHUTTER_COUNT}%` }}
          ref={shuterRef}
        />
      );
    }
    return shutters;
  }, []);

  const animateOut = useCallback(() => {
    if (shutterRefs.current) {
      anime({
        targets: shutterRefs.current.map((ref) => ref.current),
        background: { value: '#161616' },
        direction: 'forwards',
        height: {
          value: ['0%', '100%'],
          delay: (el, i) => {
            return i * 50;
          },
        },
        width: { value: '12.5%', duration: 0, delay: 0 },
        easing: 'easeInOutCubic',
        duration: ANIMATION_OUT_DURATION_MS,
      });
    }
  }, []);

  const animateIn = useCallback(() => {
    if (shutterRefs.current) {
      anime({
        targets: shutterRefs.current.map((ref) => ref.current),
        direction: 'forwards',
        width: ['12.5%', '0%'],
        easing: 'easeInOutCubic',
        duration: ANIMATION_IN_DURATION_MS,
      });
    }
  }, [useTimeout, setShowPage]);

  return (
    <React.Fragment>
      <CSSTransition
        classNames={{
          enterDone: styles.fadeIn,
          exitActive: styles.fadeOut,
        }}
        in={timeoutEnded}
        timeout={100}
      >
        <div className={classnames(styles.page)}>{children}</div>
      </CSSTransition>
      <Transition
        onEnter={() => animateOut()}
        onExiting={() => animateIn()}
        in={!timeoutEnded || !pageLoaded}
        timeout={ANIMATION_IN_DURATION_MS + ANIMATION_OUT_DURATION_MS}
        mountOnEnter
        unmountOnExit
        appear
      >
        <div className={classnames(styles.loader)}>{createShutters()}</div>
      </Transition>
    </React.Fragment>
  );
}

PageTransition.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PageTransition;
