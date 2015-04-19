import reqwest from 'reqwest';

import { SESSION_KEY_HEADER } from 'tabular/constants';

/**
 * This module contains functions for interacting with Users.
 */
export default {
  create(username, password, confirmation, options) {
    reqwest({
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
  },

  update_password(session_key, password, confirmation, options) {
    let headers = {};
    headers[SESSION_KEY_HEADER] = session_key;

    reqwest({
      url: '/api/users/',
      method: 'PUT',
      type: 'json',
      data: {
        password: password,
        password_confirmation: confirmation
      },
      headers: headers,
      success: options.success,
      error: options.error
    });
  },

  destroy(session_key, options) {
    let headers = {};
    headers[SESSION_KEY_HEADER] = session_key;

    reqwest({
      url: '/api/users/',
      method: 'DELETE',
      type: 'json',
      headers: headers,
      success: options.success,
      error: options.error
    });
  }
};
