import { Component, createElement, DOM } from 'vendored/react';

import Password from 'views/inputs/password';
import Username from 'views/inputs/username';

const { button, div, form, input, label } = DOM;

/**
 * This class represents the Login form.
 */
class Login extends Component {
  /**
   * Create a new Login form.
   *
   * Props:
   *   - login:   Function that accepts a username, password, and callbacks then
   *              creates a session.
   *   - success: Function to perform when the user signs in.
   *
   * State:
   *   - username: String that represents the username, validated on input
   *               change or submit.
   *   - password: String that represents the username, validated on input
   *               change or submit.
   *   - error:    Non-required string that displays an error message.
   */
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', error: null };
  }

  render() {
    return (
      form({},
        this.errorMessage(),
        createElement(Username, {
          onChange: (event) => this.setState({
            username: event.target.value
          })
        }),
        createElement(Password, {
          onChange: (event) => this.setState({
            password: event.target.value
          })
        }),
        this.submitButton()
      )
    );
  }

  submitButton() {
    const options = {
      className: 'btn btn-primary',
      onClick: event => this.login(event)
    };

    return button(options, 'Login');
  }


  errorMessage() {
    if (this.state.error) {
      return div({ className: 'alert alert-danger' }, this.state.error);
    }
  }

  login(event) {
    const { login: request, success } = this.props;
    const { username, password } = this.state;

    event.preventDefault();

    request(username, password, {
      success: success,
      error: error => this.setState({ error: 'Bad username or password' })
    });
  }
}

export default Login;
