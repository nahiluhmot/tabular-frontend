import { extend } from 'underscore';

import Home from 'tabular/views/pages/home';
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
    let props = {
      home: '/',
      search: query => {
        console.log(`searched for ${query}`);
      }
    };

    this.users.loggedIn(sessionKey, {
      success: ({ username }) => {
        console.log(`Signed in: ${username} with key ${sessionKey}`);
        props = extend({}, props, {
          logout: '/logout',
          profile: '/profile',
          signedIn: true
        });

        this.io.render(Home, props);
      },
      error: () => {
        console.log(`No signed in user: "${sessionKey}"`);
        props = extend({}, props, {
          login: '/login',
          signUp: '/sign-up',
          signedIn: false
        });

        this.io.render(Home, props);
      }
    });
  }
}

export default Root;
