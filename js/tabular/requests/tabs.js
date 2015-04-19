import reqwest from 'reqwest';

import { SESSION_KEY_HEADER } from 'tabular/constants';

/**
 * This module exports functions for interacting with tabs.
 */
export default {
  search(query, page, options) {
    reqwest({
      url: '/api/tabs/',
      method: 'GET',
      data: { query: query, page: page },
      type: 'json',
      success: options.success,
      error: options.error
    });
  },

  create(session_key, tab_body, options) {
    reqwest({
      url: '/api/tabs/',
      method: 'POST',
      type: 'json',
      data: tab_body,
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  },

  read(id, options) {
    reqwest({
      url: `/api/tabs/${id}/`,
      method: 'GET',
      type: 'json',
      success: options.success,
      error: options.error
    });
  },

  update(session_key, id, tab_options, options) {
    reqwest({
      url: `/api/tabs/${id}/`,
      method: 'PUT',
      type: 'json',
      data: tab_options,
      headers: {
        [SESSION_KEY_HEADER]: session_key
      },
      success: options.success,
      error: options.error
    });
  },

  destroy(session_key, id, options) {
    reqwest({
      url: `/api/tabs/${id}/`,
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
