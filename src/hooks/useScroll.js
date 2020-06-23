import { getBreakpoint, isClient } from '../utils/detect';
import { useEffect, useState } from 'react';
import React from 'react';
import throttle from 'lodash.throttle';
import useResize from './useResize';

function useScroll(props) {
  const { size } = useResize();
  const [position, setPosition] = useState({ top: 0, bottom: 0, percentage: 0 });

  const onScroll = throttle(() => {
    // console.log(props.current.getBoundingClientRect());
    setPosition({
      top: props.current.getBoundingClientRect().top,
      bottom: props.current.getBoundingClientRect().bottom,
      percentage: Math.min(Math.ceil((size.height / props.current.getBoundingClientRect().bottom) * 100), 100),
    });
  }, 100);

  useEffect(() => {
    if (window && props.current) {
      document.addEventListener('scroll', onScroll);
      return () => {
        if (props.current) {
          document.removeEventListener('scroll', onScroll);
        }
      };
    }
  }, [props]);

  return position;
}

export default useScroll;
