import { Component, createElement, DOM } from 'vendored/react';

import NavBar from 'views/navs/nav-bar';

const { div, h1, p } = DOM;

/**
 * This class represents search field and button for tabs.
 */
class NotFound extends Component {
  /**
   * Create a new Search field.
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
