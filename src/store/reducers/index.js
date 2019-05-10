import { combineReducers } from 'redux';

import cardsReducer from './cardsReducer';
import menuToggleReducer from './menuToggleReducer';

export default combineReducers({
  cards: cardsReducer,
  menuToggle: menuToggleReducer
});
