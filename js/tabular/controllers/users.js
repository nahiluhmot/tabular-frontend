import SignUp from 'tabular/views/forms/sign-up';
import { default as UserRequests } from 'tabular/requests/users';

/**
 * This controller handles routes for the Users.
 */
class Users {
  /**
   * Expected expected IO functions:
   *   - render(component, params, callback): Render the React view.
   *   - request(options): Send an HTTP request.
   */
  constructor(io) {
    this.io = io;
    this.users = new UserRequests(this.io.request);
  }

  signUp() {
    const users = this.users;

    this.io.render(SignUp, {
      createUser: (username, password, confirmation, callbacks) =>
        users.createUser(username, password, confirmation, callbacks),
      success: () => console.log('success signing up')
    });
  }
}

export default Users;
