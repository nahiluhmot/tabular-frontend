import { Component, createElement, DOM } from 'vendored/react';

import NavBar from 'views/navs/nav-bar';

const { a, button, div, h1, li, p, ul, table, tr, td, tbody, thead } = DOM;

/**
 * This page renders the search results.
 */
class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigateToTab, next, prev, query, results } = this.props;

    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h1({ className: 'centered-header' }, `Search Results for: ${query}`),
          div({ className: 'table-responsive' },
            table({ className: 'table table-hover' },
              thead({},
                td({}, 'Artist'),
                td({}, 'Album'),
                td({}, 'Title'),
                td({}, 'User')),
              tbody({}, results.map(({ id, artist, title, album, user }) => {
                const { username } = user;
                const row =
                  tr({ key: id, onClick: () => navigateToTab(id) },
                    td({}, artist),
                    td({}, album),
                    td({}, title),
                    td({},
                       a({ className: 'navigate', href: `/users/${username}` },
                         username)));
                return row;
              })))),
          ul({ className: 'pager' },
            li({ disabled: prev === null },
               a({ href: prev }, 'Prev')),
            li({ disabled: next === null },
               a({ href: next }, 'Next')))));

    return tree;
  }
}

export default SearchResults;
