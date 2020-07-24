import { Provider } from 'react-redux';
import React from 'react';

import { initStore } from './store';
import { isClient } from '../utils/detect';

export const withRedux = (PageComponent, { ssr = true } = {}) => {
  //   const isAppHoc = PageComponent === App || PageComponent.prototype instanceof App;
  const Wrapper = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState);
    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    );
  };

  return Wrapper;
};

let reduxStore;
const getOrInitializeStore = (initialState) => {
  if (!isClient) {
    return initStore(initialState);
  }

  if (!reduxStore) {
    reduxStore = initStore(initialState);
  }

  return reduxStore;
};
