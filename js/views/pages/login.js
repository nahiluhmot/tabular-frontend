import { Component, createElement, DOM } from 'vendored/react';

import NavBar from 'views/navs/nav-bar';
import LoginForm from 'views/forms/login';

const { div, h1, p } = DOM;

/**
 * This class represents sign up page.
 */
class Login extends Component {
  /**
   * Create a new Home page. It requires all of the props required by the
   * Nav and SignUpForm.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h1({}, 'Login'),
          createElement(LoginForm, this.props)));

    return tree;
  }
}

export default Login;
