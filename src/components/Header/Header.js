import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { MenuToggle } from '../UI/MenuToggle';
import { SubmitButton } from '../UI/forms/SubmitButton';

import classes from './Header.module.scss';

export const Header = memo(({ menuOpen, toggleMenu, search }) => {
  const [values, setValues] = useState({
    searchTerm: '',
    searchProperty: 'name',
    sortProperty: 'name'
  });

  const classNames = menuOpen
    ? `${classes.headerForms} ${classes.isOpen}`
    : classes.headerForms;

  const options = ['name', 'type', 'set', 'artist']; //hard-coded per exercise instructions

  const updateField = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const submitFormHandler = e => {
    e.preventDefault();
    search(values);
  };

  return (
    <header>
      <h1>Magic: the Gathering: the Creatures</h1>

      <div className={classNames}>
        <form onSubmit={submitFormHandler} className={classes.searchForm}>
          <label htmlFor="searchTerm">Search for:</label>
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            placeholder="Enter text"
            value={values.searchTerm}
            onChange={updateField}
          />
          <label htmlFor="searchProperty">in:</label>
          <select
            id="searchProperty"
            name="searchProperty"
            value={values.searchProperty}
            onChange={updateField}
          >
            {options.map(option => (
              <option key={uuid.v4()} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="sortBy">Sort by:</label>
          <select
            id="sortProperty"
            name="sortProperty"
            value={values.sortProperty}
            onChange={updateField}
          >
            {options.map(option => (
              <option key={uuid.v4()} value={option}>
                {option}
              </option>
            ))}
          </select>
          <SubmitButton text={'Search'} />
        </form>
      </div>
      <MenuToggle toggleMenu={toggleMenu} menuOpen={menuOpen} />
    </header>
  );
});

Header.propTypes = {
  menuOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
  search: PropTypes.func.isRequired
};
