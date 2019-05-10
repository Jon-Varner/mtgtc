import React, { memo } from 'react';
import PropTypes from 'prop-types';

import classes from './MenuToggle.module.scss';

export const MenuToggle = memo(({ toggleMenu, menuOpen }) => {
  let classNames = classes.menuToggle;

  if (menuOpen) {
    classNames = `${classes.menuToggle} ${classes.isOpen}`;
  }

  return (
    <button
      className={classNames}
      aria-label="Open the menu"
      onClick={toggleMenu}
    >
      <span className={classes.menuHamburger} aria-hidden="true" />
      <span className={classes.menuHamburger} aria-hidden="true" />
      <span className={classes.menuHamburger} aria-hidden="true" />
    </button>
  );
});

MenuToggle.propTypes = {
  toggleMenu: PropTypes.func
};
