import { Component, createElement, DOM } from 'react';

import Search from 'tabular/views/forms/search';
import preventingDefault from 'tabular/utils/preventingDefault';

const { a, button, div, form, li, nav, span, ul } = DOM;
const COLLAPSE_ID = 'tabular-nav-bar-collapse';


/**
 * This class represents the nav bar for logged out users.
 */
class NavBar extends Component {
  /**
   * Create a new nav bar. The nav bar's expected props differ based on whether
   * or not a user is signed in.
   *
   * Props (signed in user):
   *  - logout:  Path that logs the user out and redirects them to the home
   *             page.
   *  - profile: Path of the profile page.
   *
   * Props (signed out user):
   *  - login:  Path of the login page.
   *  - signUp: Path of the sign up page.
   *
   * Props (both):
   *  - home:     Path of the home page.
   *  - search:   Function that accepts a query and navigates to the search
   *              page.
   *  - signedIn: Boolean that indicates whether or not a user is signed in.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      nav({ className: 'navbar navbar-default navbar-static-top' },
        div({ className: 'center container-fluid' },
          this.header(),
          this.collapse()));

    return tree;
  }

  header() {
    const { home } = this.props;
    const buttonAttributes = {
      type: 'button',
      className: 'navbar-toggle collapsed',
      'data-toggle': 'collapse',
      'data-target': COLLAPSE_ID
    };
    const tree =
      div({ className: 'navbar-header' },
        button(buttonAttributes,
          span({ className: 'sr-only' }, 'Toggle navigation'),
          span({ className: 'icon-bar' }),
          span({ className: 'icon-bar' }),
          span({ className: 'icon-bar' })),
        a({ className: 'navbar-brand navigate', href: home }, 'Tabular'));

    return tree;
  }

  collapse() {
    const { search, signedIn } = this.props;

    const tree =
      div({ className: 'collapse navbar-collapse', id: COLLAPSE_ID },
        form({ className: 'nav navbar-form navbar-left', role: 'Search' },
          div({ className: 'form-group' },
            createElement(Search, { search: search }))),
        signedIn ? this.signedInRight() : this.signedOutRight());

    return tree;
  }

  signedOutRight() {
    const { login, signUp } = this.props;

    const tree =
      ul({ className: 'nav navbar-nav navbar-right' },
        li({},
          a({ className: 'navigate', href: login }, 'Login')),
        li({},
          a({ className: 'navigate', href: signUp }, 'Sign Up')));

    return tree;
  }

  signedInRight() {
    const { logout, profile } = this.props;

    const tree =
      ul({ className: 'nav navbar-nav navbar-right' },
        li({},
          a({ className: 'navigate', href: logout }, 'Logout')),
        li({},
          a({ className: 'navigate', href: profile }, 'Profile')));

    return tree;
  }
}

export default NavBar;
