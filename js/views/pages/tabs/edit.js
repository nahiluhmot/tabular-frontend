import { Component, createElement, DOM } from 'react';

import EditTab from 'views/forms/edit-tab';
import NavBar from 'views/navs/nav-bar';

const { div, h1, p } = DOM;

/**
 * This class represents the page where users may enter new tabs.
 */
class Edit extends Component {
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
          h1({}, 'Edit Tab'),
          createElement(EditTab, this.props)));

    return tree;
  }
}

export default Edit;
