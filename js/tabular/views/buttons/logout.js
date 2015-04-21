import { Component, DOM } from 'react';

const { button } = DOM;

/**
 * This class represents the Logout button.
 */
class Logout extends Component {
  /**
   * Create a new Logout button.
   *
   * Props:
   *   - logout:    Function that accepts a set of callbacks and logs the user
   *                out.
   *   - success:   Function to perform when the user logs out.
   *   - error:     Function to perform when logging out fails.
   *   - className: Optional CSS class name.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { className, logout, success, error } = this.props;
    const defaultClass = 'btn btn-primary';

    return button({
      className: className ? `${defaultClass} ${className}` : defaultClass,
      onClick(event) {
        event.preventDefault();
        logout({ success: success, error: error });
      }
    }, 'Logout');
  }
}

export default Login;
