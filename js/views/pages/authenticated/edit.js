import { Component, createElement, DOM } from 'vendored/react';

import NavBar from 'views/navs/nav-bar';
import ChangePassword from 'views/forms/change-password';

const { div, h1, p } = DOM;

/**
 * This class represents edit page.
 */
class Edit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h1({}, 'Change Password'),
          createElement(ChangePassword, this.props)));
    return tree;
  }
}

export default Edit;
