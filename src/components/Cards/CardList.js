import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Card } from './Card';
import { dynamicSort } from '../../utils/dynamicSort';
import classes from './CardList.module.scss';

export const CardList = memo(
  ({ cards, error, loading, searchTerm, sortBy }) => {
    let loadedCards = null;

    if (cards && cards.length > 0) {
      loadedCards = cards.sort(dynamicSort(sortBy)).map(card => {
        return (
          <Card
            key={card.multiverseid}
            name={card.name}
            imageUrl={card.imageUrl}
            artist={card.artist}
            set={card.set}
            type={card.type}
          />
        );
      });
    } else if (!loading && searchTerm !== '') {
      return <p>No cards found with this criteria.</p>;
    }

    return (
      <div className={classes.cardList}>
        {loadedCards}
        {error ? <p>There was an error loading cards from the API.</p> : null}
      </div>
    );
  }
);

CardList.propTypes = {
  cards: PropTypes.array,
  error: PropTypes.string
};
