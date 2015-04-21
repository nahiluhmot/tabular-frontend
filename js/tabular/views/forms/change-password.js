import { Component, createElement, DOM } from 'react';
import { extend, identity, map, pairs, size, select } from 'underscore';

import Password from 'tabular/views/inputs/password';
import Confirmation from 'tabular/views/inputs/confirmation';

import validatePassword from 'tabular/validators/password';
import validateConfirmation from 'tabular/validators/confirmation';

const { button, div, form, input, label } = DOM;

const validate = ({ password, confirmation }) => {
  return select({
    'Password': validatePassword(password),
    'Password Confirmation': validateConfirmation(password, confirmation),
  }, identity);
};

/**
 * This form is used to change a logged in user's password.
 */
class ChangePassword extends Component {
  /**
   * Create a new ChangePassword form.
   *
   * Props:
   *   - changePassword: Function that accepts a password, confirmation, and
   *                     then creates a user.
   *     login:          Function that accepts a password and authenticates
   *                     a user. Used to check the current password.
   *   - success:        Function to perform when the password is changed.
   * State:
   *   - oldPassword:  String the represents the old password.
   *   - password:     String that represents the password, validated on input
   *                   change or submit.
   *   - confirmation: String that represents the confirmation, validated on input
   *                   change or submit.
   *   - errors:       Object that maps human readable properties to error
   *                   messages.
   */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      confirmation: '',
      errors: {}
    };
  }

  render() {
    const errors = extend({}, validate(this.state), this.state.errors);
    const isValid = size(errors) === 0;

    return (
      form({},
        isValid ? null : this.errorMessage(errors),
        createElement(Password, {
          onChange: event => this.setState({ oldPassword: event.target.value }),
          label: 'Current Password',
        }),
        createElement(Password, {
          onChange: event => this.setState({ password: event.target.value }),
          label: 'New Password',
        }),
        createElement(Confirmation, {
          onChange: event => this.setState({ confirmation: event.target.value })
        }),
        this.submitButton(isValid)
      )
    );
  }

  errorMessage(errors) {
    const [field, message] = pairs(errors)[0];

    return div({ className: 'alert alert-danger' }, `${field} ${message}`);
  }

  submitButton(isValid) {
    const options = {
      className: 'btn btn-primary',
      disabled: isValid ? null : 'disabled',
      onClick: isValid ? event => this.changePassword(event) : null,
    };

    return button(options, 'Change Password');
  }

  changePassword(event) {
    const { changePassword: request, login, success } = this.props;
    const { password, confirmation } = this.state;

    event.preventDefault();

    login(oldPassword, {
      succcess: () =>
        this.setState({ errors: {} }, () =>
          request(password, confirmation, {
            success: success,
            error(error) {
              console.log('Unexpected error while changing password');
              console.log(error);
            }})),
      error: () =>
        this.setState({ errors: { 'Current Password': 'is not valid' } })
    });
  }
}

export default ChangePassword;
