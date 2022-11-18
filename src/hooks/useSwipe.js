import { getBreakpoint, isClient } from '../utils/detect';
import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

function useSwipe(threshold = 30) {
  const [downPos, setDownPos] = useState({ x: 0, y: 0 });
  const [upPos, setUpPos] = useState({ x: 0, y: 0 });
  const [swipe, setSwipe] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 'none', y: 'none' });

  const onTouchStart = throttle(({ touches }) => {
    if (touches[0]) {
      setDownPos({ x: touches[0].clientX, y: touches[0].clientY });
    }
  }, 250);
  const onTouchEnd = throttle(({ changedTouches }) => {
    if (changedTouches[0]) {
      setUpPos({ x: changedTouches[0].clientX, y: changedTouches[0].clientY });
    }
  }, 250);

  useEffect(() => {
    if (window) {
      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchend', onTouchEnd);
      return () => {
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
      };
    }
  }, []);

  useEffect(() => {
    let x = 'none';
    let y = 'none';

    if (Math.abs(upPos.x - downPos.x) >= threshold) {
      x = upPos.x - downPos.x > 0 ? 'right' : 'left';
    }

    if (Math.abs(upPos.y - downPos.y) >= threshold) {
      y = upPos.y - downPos.y > 0 ? 'down' : 'up';
    }

    setDirection({ x, y });
  }, [upPos]);

  return {
    direction,
  };
}

export default useSwipe;
