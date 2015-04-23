import { extend } from 'underscore';

import { LINKS } from 'tabular/constants';

import Home from 'tabular/views/pages/home';
import SignUp from 'tabular/views/pages/sign-up';

import Users from 'tabular/requests/users';
import Sessions from 'tabular/requests/sessions';

/**
 * This is the top level controller for the application.
 */
class Root {
  /**
   * Expected expected IO functions:
   *   - getSessionKey(): Get the session key.
   *   - render(component, params, callback): Render the React view.
   *   - request(options): Send an HTTP request.
   */
  constructor(io) {
    this.io = io;
    this.users = new Users(this.io.request);
    this.sessions = new Sessions(this.io.request);
  }

  home() {
    const sessionKey = this.io.getSessionKey();
    const props = {
      search: query => {
        console.log(`searched for ${query}`);
      }
    };

    this.users.loggedIn(sessionKey, {
      success: ({ username }) => {
        console.log(`Signed in: ${username} with key ${sessionKey}`);
        props.signedIn = true;
        this.io.render(Home, props);
      },
      error: () => {
        console.log(`No signed in user: "${sessionKey}"`);
        props.signedIn = false;
        this.io.render(Home, props);
      }
    });
  }

  signUp() {
    this.io.render(SignUp, {
      search: query => {
        console.log(`Searched for ${query}`);
      },
      signedIn: false,
      createUser: (username, password, confirmation, callbacks) => {
        this.users.createUser(username, password, confirmation, callbacks);
      },
      success: ({ username }) => {
        console.log(this);
        this.io.navigate(LINKS.profile);
      }
    });
  }

  logout() {
    const key = this.io.getSessionKey();
    const complete = () => this.io.navigate(LINKS.home);
    this.sessions.logout(key, {
      success: complete,
      failure: complete
    });
  }
}

export default Root;
