import keys from '../keys';

const defaultState = {
  start: false,
  menuOpen: false,
};

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case keys.APP_START:
      return { ...state, start: action.start };
    case keys.UPDATE_MENU_STATUS:
      return { ...state, menuOpen: action.menuOpen };
    default:
      return state;
  }
}

// Action Creators
export const setAppStart = () => ({
  type: keys.APP_START,
  start: true,
});

export const setMenuOpen = (isOpen) => ({
  type: keys.UPDATE_MENU_STATUS,
  menuOpen: isOpen,
});
