import React from 'react';
import PropTypes from 'prop-types';

import classes from './FaveStar.module.scss';

export const FaveStar = ({ favorite }) => {
  return (
    <div className={classes.star}>fave = {favorite ? 'true' : 'false'}</div>
  );
};

FaveStar.propTypes = {
  favorite: PropTypes.bool.isRequired
};
