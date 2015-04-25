import { Component, createElement, DOM } from 'vendored/react';

import NavBar from 'views/navs/nav-bar';

const { a, button, div, h1, li, p, ul, table, tr, td, tbody, thead } = DOM;

/**
 */
class SearchResults extends Component {
  /**
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { query, results } = this.props;

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h1({ className: 'centered-header' }, `Search Results for: ${query}`),
          this.renderResults(),
          this.renderNavigation()));

    return tree;
  }

  renderNavigation() {
    const { next, prev } = this.props;

    const tree =
      ul({ className: 'pager' },
        li({ disabled: prev === null },
           a({ href: prev }, 'Prev')),
        li({ disabled: next === null },
           a({ href: next }, 'Next')));

    return tree;
  }

  renderResults() {
    const { results } = this.props;
    const tree =
      div({ className: 'table-responsive' },
        table({ className: 'table table-hover' },
          thead({},
            td({}, 'Artist'),
            td({}, 'Album'),
            td({}, 'Title'),
            td({}, 'User')),
          tbody({}, results.map(result => this.renderResult(result)))));

    return tree;
  }

  renderResult(tab) {
    const { navigateToTab, linkToUser } = this.props;
    const { id, artist, title, album, user } = tab;
    const { username } = user;

    const tree =
      tr({ key: id, onClick: () => navigateToTab(id) },
        td({}, artist),
        td({}, album),
        td({}, album),
        td({},
           a({ navigate: 'navigate', href: linkToUser(username) },
             username)));

    return tree;
  }
}

export default SearchResults;
