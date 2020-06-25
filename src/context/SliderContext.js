import React from 'react';

const SliderContext = React.createContext({
  activeSlide: 1,
  setActiveSlide: () => {},
});

export default SliderContext;
