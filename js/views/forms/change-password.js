import { Component, createElement, DOM } from 'vendored/react';
import _ from 'vendored/underscore';

import Password from 'views/inputs/password';
import Confirmation from 'views/inputs/confirmation';

import validatePassword from 'validators/password';
import validateConfirmation from 'validators/confirmation';

const { button, div, form, input, label } = DOM;
const { extend, identity, omit, pairs, pick, size } = window._;

/**
 * This form is used to change a logged in user's password.
 */
class ChangePassword extends Component {
  /**
   * Create a new ChangePassword form.
   *
   * Props:
   *   - changePassword: Function that accepts a password, confirmation, and
   *                     then changes the user's password.
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
    const errors = this.validate();
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
    const { password, confirmation } = this.state;
    let normalizedErrors = errors;
    let pair;

    if (password === '') {
      normalizedErrors = omit(normalizedErrors, 'Password');
    }

    if (confirmation === '') {
      normalizedErrors = omit(normalizedErrors, 'Password Confirmation');
    }

    pair = pairs(normalizedErrors)[0];

    if (pair) {
      return div({ className: 'alert alert-danger' }, pair.join(' '));
    }
  }

  submitButton(isValid) {
    const options = {
      className: 'btn btn-primary',
      disabled: isValid ? null : 'disabled',
      onClick: isValid ? event => this.changePassword(event) : null,
    };

    return button(options, 'Change Password');
  }

  validate() {
    const { password, confirmation, errors } = this.state;
    return extend({}, errors, pick({
      'Password': validatePassword(password),
      'Password Confirmation': validateConfirmation(password, confirmation),
    }, identity));
  }

  changePassword(event) {
    const { changePassword: request, login, success } = this.props;
    const { oldPassword, password, confirmation } = this.state;

    event.preventDefault();

    login(oldPassword, {
      success: () =>
        this.setState({ errors: {} }, () =>
          request(password, confirmation, {
            success: success,
            error: error => {
              this.setState({
                'Current Password': 'cannot be changed at this time'
              });
            }})),
      error: () =>
        this.setState({ errors: { 'Current Password': 'is not valid' } })
    });
  }
}

export default ChangePassword;
