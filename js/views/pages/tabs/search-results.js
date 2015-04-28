import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';

const { a, button, div, h3, i, li, p, span, table, tr, td, tbody, thead } = DOM;
const { ul } = DOM;

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
          div({ className: 'row' },
            h3({ className: 'centered-text' }, `Search Results for: ${query}`)),
          div({ className: 'row' },
            div({ className: 'table-responsive' },
              table({ className: 'table table-hover' },
                thead({},
                  td({}, 'Artist'),
                  td({}, 'Album'),
                  td({}, 'Title'),
                  td({}, 'User')),
                tbody({}, results.map(({ id, artist, title, album, user }) =>
                  tr({
                    key: id,
                    className: 'pointy hover-color',
                    onClick: () => navigateToTab(id)
                  },
                    td({}, artist),
                    td({}, album),
                    td({}, title),
                    td({}, user.username))))))),
          div({ className: 'row text-center' },
            ul({ className: 'pager' },
              li({},
                 a({ onClick: prev },
                   span({},
                     i({ className: 'fui-arrow-left' })))),
              li({},
                 a({ onClick: next },
                   span({},
                     i({ className: 'fui-arrow-right' }))))))));

    return tree;
  }
}

export default SearchResults;
