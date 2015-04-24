import { Component, createElement, DOM } from 'react';

import NavBar from 'tabular/views/navs/nav-bar';

const { button, div, h1, li, p, ul } = DOM;

/**
 */
class SearchResults extends Component {
  /**
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { page, query, results } = this.props;

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h1({}, `Search Results for: ${query}`),
          this.renderNavigation(),
          this.renderResults()));

    return tree;
  }

  renderNavigation() {
    const { next, prev } = this.props;
    const prevProps = {
      className: 'btn btn-default',
      disabled: prev === null,
      onClick: event => {
        event.preventDefault();
        prev();
      }
    };
    const nextProps = {
      className: 'btn btn-default pull-right',
      disabled: next === null,
      onClick: event => {
        event.preventDefault();
        next();
      }
    };
    const tree =
      ul({ className: 'page' },
        li(prevProps, 'Prev'),
        li(nextProps, 'Next'));

    return tree;
  }

  renderResults() {
    const { results } = this.props;

    return ul({}, results.map(result => this.renderResult(result)));
  }

  renderResult(tab) {
    const { id, artist, title, album, user } = tab;
    const { username } = user;
    const tree =
      li({ key: id },
        p({}, `${artist}, ${album}, ${title} uploaded by ${username}`));

    return tree;
  }
}

export default SearchResults;
