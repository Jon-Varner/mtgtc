import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import classes from './LoadingIndicator.module.scss';

export const LoadingIndicator = memo(
  forwardRef((props, ref) => {
    return (
      <div
        ref={ref}
        className={classes.loadingIndicator}
        style={{ opacity: props.visible ? 1 : 0 }}
      >
        <div />
        <div />
        <div />
      </div>
    );
  })
);

LoadingIndicator.propTypes = {
  visible: PropTypes.bool
};
