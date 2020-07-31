import appReducer from './reducers/app';
import { combineReducers } from 'redux';
import cursor from './reducers/cursor';
import cursorReducer from './reducers/cursor';
import sliderReducer from './reducers/slider';

export default combineReducers({
  app: appReducer,
  cursor: cursorReducer,
  slider: sliderReducer,
});
