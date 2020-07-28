import keys from '../keys';

const defaultState = {
  hovering: false,
  message: null,
};

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case keys.UPDATE_CURSOR_STATUS:
      return { ...state, hovering: action.hovering, message: action.message };
    default:
      return state;
  }
}

// Action Creators
export const mouseoverTrigger = (message) => ({
  type: keys.UPDATE_CURSOR_STATUS,
  hovering: true,
  message,
});

export const mouseleaveTrigger = () => ({
  type: keys.UPDATE_CURSOR_STATUS,
  hovering: false,
  message: null,
});
