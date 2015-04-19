import reqwest from 'reqwest';

import { SESSION_KEY_HEADER } from 'tabular/constants';

/**
 * This module contains functions for interacting with Sessions.
 */
export default {
  login(username, password, options) {
    reqwest({
      url: '/api/sessions/',
      method: 'POST',
      type: 'json',
      data: {
        username: username,
        password: password,
      },
      success: options.success,
      error: options.error
    });
  },

  logout(session_key, options) {
    reqwest({
      url: '/api/sessions/',
      method: 'DELETE',
      type: 'json',
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  }
};
