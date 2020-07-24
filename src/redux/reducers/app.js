import keys from '../keys';

const defaultState = {
  start: false,
};

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case keys.APP_START:
      return { ...state, start: action.start };
    default:
      return state;
  }
}

// Action Creators
export const setAppStart = () => ({
  type: keys.APP_START,
  start: true,
});
