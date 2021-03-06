import { Component, createElement, DOM } from 'react';

import NavBar from 'views/navs/nav-bar';

const { div, h1, p } = DOM;

/**
 * This class represents the not found page for users.
 */
class NotFound extends Component {
  /**
   * Create a new NotFound page.
   *
   * Props:
   *   - username: Username that could not be found
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { username } = this.props;
    const tree =
      div({},
        createElement(NavBar, this.props),
        div({ className: 'container center' },
          h1({}, 'User Not Found'),
          p({ className: 'lead' },
            `We could not find any user with this username: ${username}`)));
    return tree;
  }
}

export default NotFound;
