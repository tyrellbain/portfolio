import keys from '../keys';

const defaultState = {
  activeSlide: 1,
  slideCount: 0,
};

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case keys.UPDATE_ACTVE_SLIDE:
      return { ...state, activeSlide: action.activeSlide };
    case keys.SET_SLIDE_COUNT:
      return { ...state, slideCount: action.slideCount };
    default:
      return state;
  }
}

// Action Creators
export const updateSlide = (activeSlide) => ({
  type: keys.UPDATE_ACTVE_SLIDE,
  activeSlide,
});

export const seSlideCount = (slideCount) => ({
  type: keys.UPDATE_CURSOR_STATUS,
  slideCount,
});
