import React from 'react';

const CursorContext = React.createContext({
  isHoveringOnTrigger: false,
  setHoveringOnTrigger: () => {},
  triggerMessage: '',
  setTriggerMessage: () => {},
});

export default CursorContext;
