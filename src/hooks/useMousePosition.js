import { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

const useMousePosition = (buffer = 200) => {
  const [position, setPosition] = useState({ x: 0, y: 0, event: { path: [] } });

  const mousemove = throttle((event) => {
    console.log(buffer);
    event.stopPropagation();
    const { clientX, clientY } = event;
    // const targetArr = event.path.slice(0, event.path.length - DEFAULT_DOM_ELEMENTS);
    // targetArr.map((el) => el.nodeName.toLowerCase())

    setPosition({
      x: clientX,
      y: clientY,
      event: event,
    });
  }, buffer);

  useEffect(() => {
    window.addEventListener('mousemove', mousemove);

    return () => {
      window.removeEventListener('mousemove', mousemove);
    };
  }, []);

  return position;
};

export default useMousePosition;
