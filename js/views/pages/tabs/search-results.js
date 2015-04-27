import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';

const { a, button, div, h1, li, p, ul, table, tr, td, tbody, thead } = DOM;

/**
 * This page renders the search results.
 */
class SearchResults extends Component {
  /**
   * Create a new search results page.
   *
   * Props:
   *   - navigateToTab: Function that accepts a tab id and navigates to the page
   *                    for that that tab.
   *   - next:          Optional link to the next page. If null, "Next" button
   *                    will be disabled.
   *   - prev:          Optional link to the previous page. If null, "Previous"
   *                    button will be disabled.
   *   - query:         The query that was searched for.
   *   - results:       List of Objects in the following format:
   * {
   *   "id": 1,
   *   "artist": "Green Day",
   *   "album": "American Idiot",
   *   "title": "American Idiot",
   *   "user": {
   *     "username": "michaeljackson"
   *   }
   * }
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the search results page.
   */
  render() {
    const { navigateToTab, next, prev, query, results } = this.props;

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h1({ className: 'centered-text' }, `Search Results for: ${query}`),
          div({ className: 'table-responsive' },
            table({ className: 'table table-hover' },
              thead({},
                td({}, 'Artist'),
                td({}, 'Album'),
                td({}, 'Title'),
                td({}, 'User')),
              tbody({}, results.map(({ id, artist, title, album, user }) =>
                tr({ key: id, onClick: () => navigateToTab(id) },
                  td({}, artist),
                  td({}, album),
                  td({}, title),
                  td({}, user.username)))))),
          ul({ className: 'pager' },
            li({ disabled: prev === null },
               a({ href: prev }, 'Previous')),
            li({ disabled: next === null },
               a({ href: next }, 'Next')))));

    return tree;
  }
}

export default SearchResults;
