import appReducer from './reducers/app';
import { combineReducers } from 'redux';
import cursor from './reducers/cursor';
import cursorReducer from './reducers/cursor';

export default combineReducers({
  app: appReducer,
  cursor: cursorReducer,
});
