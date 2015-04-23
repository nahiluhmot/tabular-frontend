import { extend } from 'underscore';

import { LINKS } from 'tabular/constants';

import Home from 'tabular/views/pages/home';
import Login from 'tabular/views/pages/login';
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
    this.sessions = new Sessions(io.request);
    this.users = new Users(io.request);
  }

  home() {
    const sessionKey = this.io.getSessionKey();
    const props = { search: this.search };

    this.render(Home, {});
  }

  login() {
    this.render(Login, {
      login: (username, password, callbacks) =>
        this.sessions.login(username, password, callbacks),
      success: () => this.io.navigate(LINKS.profile)
    });
  }

  logout() {
    const key = this.io.getSessionKey();
    this.sessions.logout(key, {
      complete: () => this.io.navigate(LINKS.home)
    });
  }

  signUp() {
    this.render(SignUp, {
      createUser: (username, password, confirmation, callbacks) =>
        this.users.createUser(username, password, confirmation, callbacks),
      success: (data) => this.io.navigate(LINKS.profile)
    });
  }

  render(type, props) {
    props.search = query =>
      this.io.navigate(LINKS.search, { queryParams: { query: query } });

    this.users.loggedIn(this.io.getSessionKey(), {
      success: () => props.signedIn = true,
      error: () => props.signedIn = false,
      complete: () => this.io.render(type, props)
    });
  }
}

export default Root;
