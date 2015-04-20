import SignUp from 'tabular/views/users/sign-up';
import { default as Requests } from 'tabular/requests/users';

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
    this.io.requests = new Requests(this.io.request);
  }

  signUp(params) {
    const requests = this.io.requests;
    console.log(this.io);

    this.io.render(SignUp, {
      createUser() {
        requests.create.apply(requests, arguments);
      }
    });
  }
}

export default Users;
