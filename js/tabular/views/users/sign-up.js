import { addons, Component, DOM } from 'react';
import { compact, extend, map, values } from 'underscore';

const { createFragment } = addons;
const { button, div, fieldset, form, input, p } = DOM;

/**
 * This class represents the SignUp form.
 */
class SignUp extends Component {
  /**
   * Create a new SignUp form.
   *
   * Props:
   *   - createUser: Function that accepts a username, password, confirmation,
   *                 and callbacks, then creates a user.
   *   - success:    Function to perform when the user is created.
   *
   * State:
   *   - username:     String that represents the username, validated on input
   *                   change or submit.
   *   - password:     String that represents the username, validated on input
   *                   change or submit.
   *   - confrimation: String that represents the password, validated on input
   *                   change or submit.
   *   - errors:       Object of errors with human readable keys and errors and
   *                   error messages.
   */
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      confirmation: null,
      errors: {}
    };
  }

  /**
   * IO calls (from the props).
   */

  createUser(event) {
    const { createUser: request, success } = this.props;
    const { username, password, confirmation } = this.state;
    const errors = this.validate(this.state);

    event.preventDefault();

    if (compact(values(errors)).length === 0) {
      request(username, password, confirmation, {
        success: success,
        error: error => this._handleCreateError(error)
      });
    } else {
      this.setState({
        errors: extend({}, this.state.errors, errors)
      });
    }
  }

  /**
   * Validation methods.
   */

  validateUsername(username) {
    let message = null;

     if (!(username || '').match(/^[a-zA-Z0-9_]+$/)) {
       message = 'may only contain letters, numbers, and underscores';
     }

     return { Username: message };
  }

  validatePassword(password) {
    let message = null;

    if ((password || '').length < 8) {
      message = 'must be at least 8 characters';
    }

    return { Password: message };
  }

  validateConfirmation(password, confirmation) {
    let message = null;

    if (password !== confirmation) {
      message = 'must match the password';
    }

    return { 'Password Confirmation': message };
  }

  validate({ username, password, confirmation }) {
    return extend({},
      this.validateUsername(username),
      this.validatePassword(password),
      this.validateConfirmation(password, confirmation)
    );
  }

  /**
   * Stateful functions.
   */

  usernameChanged(username) {
    this.setState({
      username: username,
      errors: extend({},
        this.state.errors,
        this.validateUsername(username)
      )
    });
  }

  passwordChanged(password) {
    this.setState({
      password: password,
      errors: extend({},
        this.state.errors,
        this.validatePassword(password),
        this.validateConfirmation(password, this.state.confirmation)
      )
    });
  }

  confirmationChanged(confirmation) {
    this.setState({
      confirmation: confirmation,
      errors: extend({},
        this.state.errors,
        this.validateConfirmation(this.state.password, confirmation)
      )
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
                 onChange: event => this.usernameChanged(event.target.value)
               }),
               input({
                 type: 'password',
                 placeholder: 'Password',
                 required: true,
                 onChange: event => this.passwordChanged(event.target.value)
               }),
               input({
                 type: 'password',
                 placeholder: 'Password Confirmation',
                 required: true,
                 onChange: event => this.confirmationChanged(event.target.value)
               })
             ),
             button({ onClick: event => this.createUser(event) }, 'Sign Up'),
             this._showErrors());
  }

  /**
   * Private helpers.
   */

  _showErrors() {
    const messages =
      map(this.state.errors, (message, field) =>
        (message && field) ? p({ key: field }, `${field} ${message}`) : null);

    return compact(messages);
  }

  _handleCreateError(error) {
    let messages = {};

    if (error.status === 400) {
      messages = this.validate(this.state);
    } else if (error.status === 409) {
      messages.Username = 'is taken';
    } else {
      console.log('Unexpected status while creating user: ' + error.status);
    }

    this.setState({
      errors: extend({}, this.state.errors, messages)
    });
  }
}

export default SignUp;
