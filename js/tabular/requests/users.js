import reqwest from 'reqwest';

import { SESSION_KEY_HEADER } from 'tabular/constants';

/**
 * This module contains functions for interacting with Users.
 */
class Users {
  constructor(request) {
    this.request = request;
  }

  create(username, password, confirmation, options) {
    this.request({
      url: '/api/users/',
      method: 'POST',
      type: 'json',
      data: {
        username: username,
        password: password,
        password_confirmation: confirmation
      },
      success: options.success,
      error: options.error
    });
  }

  update_password(session_key, password, confirmation, options) {
    this.request({
      url: '/api/users/',
      method: 'PUT',
      type: 'json',
      data: {
        password: password,
        password_confirmation: confirmation
      },
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  }

  destroy(session_key, options) {
    this.request({
      url: '/api/users/',
      method: 'DELETE',
      type: 'json',
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  }
}

export default Users;
