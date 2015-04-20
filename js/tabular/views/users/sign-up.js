import { Component, DOM } from 'react';

const { div, fieldset, form, input, label, button } = DOM;

const ID_PREFIX = 'sign-up';
const USERNAME_ID = `${ID_PREFIX}-username`;
const PASSWORD_ID =  `${ID_PREFIX}-password`;
const CONFIRMATION_ID =  `${ID_PREFIX}-password-confirmation`;

/**
 * This class represents the Sign Up page.
 */
class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * IO calls (from the props).
   */

  createUser(event) {
    const username = document.getElementById(USERNAME_ID).value;
    const password = document.getElementById(PASSWORD_ID).value;
    const confirmation = document.getElementById(CONFIRMATION_ID).value;

    event.preventDefault();

    this.props.requests.createUser(username, password, confirmation, {
      success(data) {
        console.log(`Created user with username: ${data.username}`);
      },

      error(err) {
        console.log(err);
      }
    });
  }

  /**
   * Render helpers.
   */

  formGroup() {
    return (
      form({ className: 'pure-form pure-form-aligned' },
        fieldset({}, Array.prototype.slice.apply(arguments)))
    );
  }

  usernameField() {
    return (
      div({ key: 'username', className: 'pure-control-group' },
        label({ htmlFor: 'username' }, 'Username'),
        input({ id: USERNAME_ID, type: 'text', placeholder: 'Username' }))
    );
  }

  passwordField() {
    return (
      div({ key: 'password', className: 'pure-control-group' },
        label({ htmlFor: 'password' }, 'Password'),
        input({ id: PASSWORD_ID, type: 'password', placeholder: '******' }))
    );
  }

  confirmationField() {
    return (
      div({ key: 'confirmation', className: 'pure-control-group' },
        label({ htmlFor: 'password-confirmation' }, 'Password Confirmation'),
        input({
          id: CONFIRMATION_ID,
          type: 'password',
          placeholder: '******'
        }))
    );
  }

  buttonField() {
    return (
      div({ key: 'button', className: 'pure-control-group' },
        button({ onClick: (event) => this.createUser(event) }, 'Submit'))
    );
  }

  render() {
    return this.formGroup(
      this.usernameField(),
      this.passwordField(),
      this.confirmationField(),
      this.buttonField()
    );
  }
}

export default SignUp;
