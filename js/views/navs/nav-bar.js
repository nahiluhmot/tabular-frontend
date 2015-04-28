import { Component, createElement, DOM } from 'react';

import Search from 'views/forms/search';

const { a, button, div, form, li, nav, span, ul } = DOM;
const COLLAPSE_ID = 'tabular-nav-bar-collapse';

/**
 * This class represents the nav bar, which renders different views for logged
 * in and logged out users..
 */
class NavBar extends Component {
  /**
   * Create a new nav bar.
   *
   * Props:
   *  - search:   Function that accepts a query and navigates to the search
   *              page.
   *  - signedIn: Boolean that indicates whether or not a user is signed in.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const navClass = 'navbar navbar-default navbar-fixed-top navbar-inverse';
    const tree =
      nav({ className: navClass },
        div({ className: 'center container-fluid' },
          this.header(),
          this.collapse()));

    return tree;
  }

  header() {
    const buttonAttributes = {
      type: 'button',
      className: 'navbar-toggle collapsed',
      'data-toggle': 'collapse',
      'data-target': `#${COLLAPSE_ID}`
    };
    const tree =
      div({ className: 'navbar-header' },
        button(buttonAttributes,
          span({ className: 'sr-only' }, 'Toggle navigation'),
          span({ className: 'fui-list' })),
        a({ className: 'navbar-brand navigate', href: '/' }, 'Tabular'));

    return tree;
  }

  collapse() {
    const { search, signedIn } = this.props;

    const tree =
      div({ className: 'collapse navbar-collapse', id: COLLAPSE_ID },
        ul({ className: 'nav navbar-nav' },
          li({},
            a({ className: 'navigate', href: '/about/' }, 'About'))),
        form({ className: 'nav navbar-form navbar-left', role: 'Search' },
          createElement(Search, { search: search })),
        signedIn ? this.signedInRight() : this.signedOutRight());

    return tree;
  }

  signedOutRight() {
    const tree =
      ul({ className: 'nav navbar-nav navbar-right' },
        li({},
          a({ className: 'navigate', href: '/login/' }, 'Login')),
        li({},
          a({ className: 'navigate', href: '/sign-up/' }, 'Sign Up')));

    return tree;
  }

  signedInRight() {
    const { logout } = this.props;

    const tree =
      ul({ className: 'nav navbar-nav navbar-right' },
        li({},
          a({ onClick: logout }, 'Logout')),
        li({},
          a({ className: 'navigate', href: '/a/' }, 'Feed')));

    return tree;
  }
}

export default NavBar;
