import Base from 'controllers/base';

import Home from 'views/pages/home';
import Login from 'views/pages/login';
import SignUp from 'views/pages/sign-up';

/**
 * This is the top level controller for the application.
 */
class Root extends Base {
  /**
   * Create a new Root controller.
   */
  constructor(io) {
    super(io);
  }

  home() {
    this.users.loggedIn(this.io.getSessionKey(), {
      success: () => this.io.navigate('/a/'),
      error: () => this.render(Home)
    });
  }

  login() {
    this.render(Login, {
      login: (username, password, callbacks) =>
        this.sessions.login(username, password, callbacks),
      success: () => this.io.navigate('/a/')
    });
  }

  logout() {
    this.sessions.logout(this.io.getSessionKey(), {
      complete: () => this.io.navigate('/')
    });
  }

  signUp() {
    this.render(SignUp, {
      createUser: (username, password, confirmation, callbacks) =>
        this.users.createUser(username, password, confirmation, callbacks),
      success: data => this.io.navigate('/a/')
    });
  }
}

export default Root;
