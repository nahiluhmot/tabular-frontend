import { Component, DOM } from 'react';
import { compact, extend, map, values } from 'underscore';

const { button, div, fieldset, form, input, p } = DOM;

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

  /**
   * IO calls (from the props).
   */

  login(event) {
    const { login: request, success } = this.props;
    const { username, password } = this.state;

    event.preventDefault();

    request(username, password, {
      success: success,
      error: error => this.setState({ error: 'Bad username or password' })
    });
  }

  /**
   * Pure render function.
   */

  render() {
    return form({ className: 'pure-form' },
             fieldset({ className: 'pure-group' },
               input({
                 type: 'text',
                 placeholder: 'Username',
                 required: true,
                 onChange: event => this.setState({
                   username: event.target.value
                 })
               }),
               input({
                 type: 'password',
                 placeholder: 'Password',
                 required: true,
                 onChange: event => this.setState({
                   password: event.target.value
                 })
               })),
               button({ onClick: event => this.login(event) }, 'Login'),
               this._showError());
  }

  /**
   * Private helpers.
   */

  _showError() {
    if (typeof this.state.error === 'string') {
      return p({}, this.state.error);
    }
  }
}

export default Login;
