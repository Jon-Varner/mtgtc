import axios from 'axios';
import * as actionTypes from './types';

export const toggleMenu = () => ({
  type: actionTypes.TOGGLE_MENU
});

export const updateSearch = (searchTerm, searchProperty) => ({
  type: actionTypes.UPDATE_SEARCH,
  payload: {
    searchTerm: searchTerm,
    searchProperty: searchProperty
  }
});

export const updateSort = sortBy => ({
  type: actionTypes.UPDATE_SORT,
  payload: sortBy
});

export const fetchCards = (
  pageNumber = 1,
  cardType = 'creature',
  searchTerm = '',
  searchProperty = ''
) => {
  return dispatch => {
    dispatch(fetchCardsBegin());

    let query =
      'https://api.magicthegathering.io/v1/cards?pageSize=30&page=' +
      encodeURI(pageNumber) +
      '&types=' +
      encodeURI(cardType);

    if (searchTerm !== '') {
      query += '&' + encodeURI(searchProperty) + '=' + encodeURI(searchTerm);
    }

    axios
      .get(query)
      .then(response => {
        const cards = response.data.cards.filter(
          card => card.imageUrl !== undefined
        );
        dispatch(fetchCardsSuccess(cards));
      })
      .catch(error => {
        dispatch(fetchCardsFailure(error.message));
      });
  };
};

const fetchCardsBegin = () => ({
  type: actionTypes.FETCH_CARDS_BEGIN
});

const fetchCardsSuccess = cards => ({
  type: actionTypes.FETCH_CARDS_SUCCESS,
  payload: { cards }
});

const fetchCardsFailure = error => ({
  type: actionTypes.FETCH_CARDS_FAILURE,
  payload: { error }
});
