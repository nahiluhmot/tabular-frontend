import SignUp from 'tabular/views/users/sign-up';
import { default as UserRequests } from 'tabular/requests/users';

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
    this.io.requests = new UserRequests(this.io.request);
  }

  signUp(params) {
    const { requests } = this.io;

    this.io.render(SignUp, {
      createUser(username, password, confirmation, callbacks) {
        requests.createUser(username, password, confirmation, callbacks);
      }
    });
  }
}

export default Users;
