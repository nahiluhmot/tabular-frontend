import SignUp from 'tabular/views/forms/sign-up';
import ChangePassword from 'tabular/views/forms/change-password';
import { default as UserRequests } from 'tabular/requests/users';
import { default as SessionsRequests } from 'tabular/requests/sessions';

/**
 * This controller handles routes for the Users.
 */
class Users {
  /**
   * Expected expected IO functions:
   *   - getSessionKey(): Get the session key.
   *   - render(component, params, callback): Render the React view.
   *   - request(options): Send an HTTP request.
   */
  constructor(io) {
    this.io = io;
    this.users = new UserRequests(this.io.request);
    this.sessions = new SessionsRequests(this.io.request);
  }

  signUp() {
    const users = this.users;

    this.io.render(SignUp, {
      createUser: (username, password, confirmation, callbacks) =>
        users.createUser(username, password, confirmation, callbacks),
      success: () => console.log('success signing up')
    });
  }

  changePassword() {
    const key = this.io.getSessionKey();
    const sessions = this.sessions;
    const users = this.users;

    users.loggedIn(key, {
      success: ({ username }) =>
        this.io.render(ChangePassword, {
          changePassword: (password, confirmation, callbacks) =>
            users.updatePassword(key, password, confirmation, callbacks),
          login: (password, callbacks) =>
            sessions.login(username, password, callbacks),
          success: () => console.log('success changing password')
        }),
      error: () =>
        console.log(`Password change attempt with no logged in user ${key}`)
    });
  }
}

export default Users;
