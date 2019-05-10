import React from 'react';
import PropTypes from 'prop-types';

import classes from './SubmitButton.module.scss';

export const SubmitButton = ({ text }) => (
  <button type="submit" className={classes.submitButton}>
    {text}
  </button>
);

SubmitButton.propTypes = {
  text: PropTypes.string
};
