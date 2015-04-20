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
    console.log(props);
  }

  createUser(event) {
    event.preventDefault();

    const username = document.getElementById(USERNAME_ID).value;
    const password = document.getElementById(PASSWORD_ID).value;
    const confirmation = document.getElementById(CONFIRMATION_ID).value;

    this.props.createUser(username, password, confirmation, {
      success(data) {
        console.log('Success!');
        console.log(data.username);
      },

      error(err) {
        console.log('Error:');
        console.log(err);
      }
    });
  }

  render() {
    return form({ className: 'pure-form pure-form-aligned' },
             fieldset({},
               div({ className: 'pure-control-group' },
                 label({
                   htmlFor: 'username'
                 }, 'Username'),
                 input({
                   id: USERNAME_ID,
                   type: 'text',
                   placeholder: 'Username'
                 })),
               div({ className: 'pure-control-group' },
                 label({
                   htmlFor: 'password'
                 }, 'Password'),
                 input({
                   id: PASSWORD_ID,
                   type: 'password',
                   placeholder: '******'
                 })),
               div({ className: 'pure-control-group' },
                 label({
                   htmlFor: 'password-confirmation'
                 }, 'Password Confirmation'),
                 input({
                   id: CONFIRMATION_ID,
                   type: 'password',
                   placeholder: '******'
                 })),
               div({ className: 'pure-control-group' },
                 button({ onClick: (event) => this.createUser(event) }, 'Submit'))));
  }
}

export default SignUp;
