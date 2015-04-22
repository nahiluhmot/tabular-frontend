import { Component, createElement, DOM } from 'react';

import Search from 'tabular/views/forms/search';

const { button, div, li, nav, span, ul } = DOM;

/**
 * This class represents the nav bar for logged out users.
 */
class LoggedOut extends Component {
  /**
   * Create a new logged out nav bar.
   *
   * Props:
   *  - signUpLink: Link to navigate to for signing up.
   *  - loginLink:  Link to navigate to for creating users.
   *  - search:     Function that accepts a query and performs a search.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { signUpLink, loginLink, search } = this.props;
    const collapseId = 'tabular-nav-bar-collapse';
    const buttonAttributes = {
      type: 'button',
      className: 'navbar-toggle collapsed',
      'data-toggle': 'collapse',
      'data-target': collapseId
    };

    const tree =
      nav({ className: `navbar navbar-default` },
        div({ className: 'container-fluid' },
          div({ className: 'navbar-header' },
            button(buttonAttributes,
              span({ className: 'sr-only' }, 'Toggle navigation'),
              span({ className: 'icon-bar' }),
              span({ className: 'icon-bar' }),
              span({ className: 'icon-bar' })),
            a({ className: 'navbar-brand navigate', href: '/' }, 'Tabular')),
          div({ className: 'collapse navbar-collapse', id: collapseId },
            form({ className: 'navbar-form navbar-left', role: 'Search' },
              createElement(Search, { search: search })),
             ul({ className: 'nav navbar-nav navbar-right' },
               li({},
                 a({ className: 'a.navigate', href: signUpLink }, 'Sign Up')),
               li({},
                 a({ className: 'a.navigate', href: loginLink }, 'Login'))))));

    return tree;
  }
}

export default LoggedOut;