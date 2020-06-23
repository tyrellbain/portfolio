import { getBreakpoint, isClient } from '../utils/detect';
import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

const getSize = () => {
  return {
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  };
};

function useResize() {
  const [size, setSize] = useState(getSize());
  const [layout, setLayout] = useState(getBreakpoint());

  const onResize = throttle(() => {
    setSize(getSize());
    setLayout(getBreakpoint());
  }, 250);

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, []);

  return {
    size,
    layout,
  };
}

export default useResize;
