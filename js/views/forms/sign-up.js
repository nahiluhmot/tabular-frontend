import { Component, createElement, DOM } from 'react';
import _ from 'underscore';

import Username from 'views/inputs/username';
import Password from 'views/inputs/password';
import Confirmation from 'views/inputs/confirmation';

import validateUsername from 'validators/username';
import validatePassword from 'validators/password';
import validateConfirmation from 'validators/confirmation';

const { button, div, form } = DOM;
const { compact, extend, map, values } = window._;

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
   *   - password:     String that represents the password, validated on input
   *                   change or submit.
   *   - confirmation: String that represents the confirmation, validated on input
   *                   change or submit.
   *   - errors:       Object of errors with human readable keys and errors and
   *                   error messages.
   *   - validate:     Boolean flag which denotes whether or not errors are
   *                   displayed.
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmation: '',
      errors: {},
      validate: false
    };
  }

  render() {
    return (
      form({},
        this.errorMessage(),
        createElement(Username, {
          onChange: event => this.usernameChanged(event.target.value)
        }),
        createElement(Password, {
          onChange: event => this.passwordChanged(event.target.value)
        }),
        createElement(Confirmation, {
          onChange: event => this.confirmationChanged(event.target.value)
        }),
        this.submitButton()
      )
    );
  }

  submitButton() {
    const options = {
      className: 'btn btn-primary',
      onClick: event => this.createUser(event)
    };

    return button(options, 'Sign Up');
  }

  errorMessage() {
    if (this.state.validate) {
      return compact(map(this.state.errors, (message, field) => {
        if (message) {
          const options = { key: field, className: 'alert alert-danger' };
          return div(options, `${field} ${message}`);
        }
      }))[0];
    }
  }

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

  createUser(event) {
    const { createUser: request, success } = this.props;
    const { username, password, confirmation } = this.state;
    const errors = this.validate(this.state);

    event.preventDefault();

    if (compact(values(errors)).length === 0) {
      request(username, password, confirmation, {
        success: success,
        error: error => this.handleCreateError(error)
      });
    } else {
      this.setState({
        errors: extend({}, this.state.errors, errors),
        validate: true
      });
    }
  }

  validateUsername(username) {
     return { Username: validateUsername(username) };
  }

  validatePassword(password) {
    return { Password: validatePassword(password) };
  }

  validateConfirmation(password, confirmation) {
    return {
      'Password Confirmation': validateConfirmation(password, confirmation)
    };
  }

  validate({ username, password, confirmation }) {
    return extend({},
      this.validateUsername(username),
      this.validatePassword(password),
      this.validateConfirmation(password, confirmation)
    );
  }

  handleCreateError(error) {
    let messages = {};

    if (error.status === 400) {
      messages = this.validate(this.state);
    } else if (error.status === 409) {
      messages.Username = 'is taken';
    } else {
      console.log('Unexpected status while creating user: ' + error.status);
    }

    this.setState({
      validate: true,
      errors: extend({}, this.state.errors, messages)
    });
  }
}

export default SignUp;
