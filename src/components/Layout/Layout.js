import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';

import { Header } from '../Header/Header';
import { CardList } from '../Cards/CardList';
import { LoadingIndicator } from '../UI/LoadingIndicator';
import './Layout.module.scss';
import * as actions from '../../store/actions/actions';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.indicatorRef = createRef();
  }

  componentDidMount() {
    /* This will trigger an API fetch whenever the Loading Indicator scrolls into view */
    this.observer = new IntersectionObserver(
      entries => {
        const loader = entries[0];
        if (loader.isIntersecting) {
          this.fetchCardsHandler();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }
    );
    this.observer.observe(this.indicatorRef.current);
  }

  componentDidUpdate(prevProps) {
    /* Fetch a new set of cards from the API whenever our search criteria changes */
    if (
      this.props.searchTerm !== prevProps.searchTerm ||
      this.props.searchProperty !== prevProps.searchProperty ||
      this.props.sortProperty !== prevProps.sortProperty
    )
      this.fetchCardsHandler();
  }

  fetchCardsHandler = () => {
    if (!this.props.loading) {
      this.props.fetchCards(
        this.props.currentPage,
        'creature', //hard-coded per exercise instructions
        this.props.searchTerm,
        this.props.searchProperty,
        this.props.sortProperty
      );
    }
  };

  toggleMenuHandler = () => {
    this.props.toggleMenu();
  };

  searchHandler = data => {
    this.props.search(data.searchTerm, data.searchProperty, data.sortProperty);
  };

  render() {
    return (
      <Fragment>
        <Header
          menuOpen={this.props.menuOpen}
          toggleMenu={this.toggleMenuHandler}
          search={this.searchHandler}
        />
        <main>
          <CardList
            cards={this.props.cards}
            error={this.props.apiError}
            loading={this.props.loading}
            searchTerm={this.props.searchTerm}
          />
          <LoadingIndicator
            ref={this.indicatorRef}
            visible={this.props.loading}
          />
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    apiError: state.cards.error,
    cards: state.cards.cards,
    currentPage: state.cards.currentPage,
    loading: state.cards.loading,
    menuOpen: state.menuToggle.menuOpen,
    searchTerm: state.cards.searchTerm,
    searchProperty: state.cards.searchProperty,
    sortProperty: state.cards.sortProperty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCards: (
      pageNumber,
      cardType,
      searchTerm,
      searchProperty,
      sortProperty
    ) =>
      dispatch(
        actions.fetchCards(
          pageNumber,
          cardType,
          searchTerm,
          searchProperty,
          sortProperty
        )
      ),
    toggleMenu: () => dispatch(actions.toggleMenu()),
    search: (searchTerm, searchProperty, sortProperty) =>
      dispatch(actions.updateSearch(searchTerm, searchProperty, sortProperty))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
