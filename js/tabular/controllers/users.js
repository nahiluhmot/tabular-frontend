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
    this.requests = {
      users: new UserRequests(this.io.request),
    };
  }

  signUp() {
    this.io.render(SignUp, { requests: this.requests });
  }
}

export default Users;
