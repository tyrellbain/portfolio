import appReducer from './reducers/app';
import cursor from './reducers/cursor';
import { combineReducers } from 'redux';

export default combineReducers({
  app: appReducer,
});
