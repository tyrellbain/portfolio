import React from 'react';

const AppContext = React.createContext({
  showNextButton: false,
  setShowNextButton: () => {},
});

export default AppContext;
