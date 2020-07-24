import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export const initStore = (preloadedState) => {
  return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware()));
};
