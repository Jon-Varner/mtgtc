import {
  FETCH_CARDS_BEGIN,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  UPDATE_SEARCH,
  UPDATE_SORT
} from '../actions/types';

const initialState = {
  cards: [],
  currentPage: 1,
  error: null,
  loading: false,
  searchTerm: '',
  searchProperty: '',
  sortBy: 'name'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS_BEGIN:
      return {
        ...state,
        error: null,
        loading: true
      };
    case FETCH_CARDS_SUCCESS:
      let cards = [];

      if (state.currentPage === 1) {
        cards = [...action.payload.cards];
      } else {
        cards = [...state.cards, ...action.payload.cards];
      }

      return {
        ...state,
        cards: cards,
        currentPage: state.currentPage + 1,
        error: null,
        loading: false
      };
    case FETCH_CARDS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };

    case UPDATE_SEARCH:
      return {
        ...state,
        cards: [],
        currentPage: 1,
        searchProperty: action.payload.searchProperty,
        searchTerm: action.payload.searchTerm
      };

    case UPDATE_SORT:
      return {
        ...state,
        sortBy: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
