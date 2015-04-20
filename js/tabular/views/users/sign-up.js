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

  createUser() {
    const username = document.getElementById(USERNAME_ID).value;
    const password = document.getElementById(PASSWORD_ID).value;
    const confirmation = document.getElementById(CONFIRMATION_ID).value;

    this.props.createUser(username, password, confirmation, {
      success(data) {
        console.log(`Created user with username: ${data.username}`);
      },

      error(err) {
        console.log(err);
      }
    });
  }

  render() {
    const component = this;

    const buttonAttributes = {
      onClick(event) {
        event.preventDefault();
        component.createUser();
      }
    };

    const tree =
      form({ className: 'pure-form pure-form-aligned' },
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
            button(buttonAttributes, 'Submit'))));

    return tree;
  }
}

export default SignUp;
