import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import { ProgressiveImage } from '../UI/ProgressiveImage';
import previewImage from '../../assets/images/LoFiCardImage.jpg';
import { FaveStar } from './FaveStar';

import classes from './Card.module.scss';

export const Card = memo(({ name, imageUrl, artist, set, type }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const classNames = infoVisible
    ? `${classes.cardInfo} ${classes.isVisible}`
    : classes.cardInfo;

  return (
    <div className={classes.card}>
      <button onClick={() => setIsFavorite(!isFavorite)}>
        <FaveStar favorite={isFavorite} />
      </button>
      <div className={classes.cardContainer}>
        <ProgressiveImage src={imageUrl} preview={previewImage} alt={name} />
        <div
          className={classNames}
          onClick={() => setInfoVisible(!infoVisible)}
        >
          <dl>
            <dt>Name:</dt>
            <dd>{name}</dd>
            <dt>Type:</dt>
            <dd>{type}</dd>
            <dt>Set:</dt>
            <dd>{set}</dd>
            <dt>Artist:</dt>
            <dd>{artist}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
});

Card.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  set: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
