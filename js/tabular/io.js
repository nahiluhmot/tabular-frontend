import Aviator from 'aviator';
import { get as getCookie } from 'cookies';
import { stringify as toJSON } from 'json';
import { createElement, render } from 'react';
import { default as request } from 'reqwest';
import { pluck } from 'underscore';

import Constants from 'tabular/constants';

/**
 * This module exports the IO functions required by the controllers.
 */
export default {
  /**
   * Get the session key for the logged in user.
   */
  getSessionKey() {
    return getCookie(Constants.SESSION_KEY_COOKIE);
  },

  /**
   * Navigate to the given route.
   */
  navigate(route, params) {
    return Aviator.navigate(route, params);
  },

  /**
   * Send an HTTP request.
   */
  request(options) {
    options.headers = options.headers || {};
    options.headers[Constants.SESSION_KEY_HEADER] = options.key;
    options.headers['Content-Type'] = 'application/json';
    options.success = options.callbacks.success;
    options.error = options.callbacks.error;
    options.type = 'json';

    if (typeof options.data === 'object') {
      options.data = toJSON(options.data);
    }

    return request(options);
  },

  /**
   * Render the given component at the specified DOM node.
   */
  render(component, params, callback) {
    const element = createElement(component, params);
    const node = document.getElementById(Constants.ROOT_ELEMENT_ID);

    return render(element, node, callback);
  }
};

