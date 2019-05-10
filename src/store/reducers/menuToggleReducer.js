import { TOGGLE_MENU } from '../actions/types';

const initialState = {
  menuOpen: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen
      };
    default:
      return state;
  }
};

export default reducer;
