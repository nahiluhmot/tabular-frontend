import Aviator from 'vendored/aviator';
import Cookies from 'vendored/cookies';
import { stringify as toJSON } from 'vendored/json3';
import { createElement, render } from 'vendored/react';
import { default as request } from 'vendored/reqwest';
import { pluck } from 'vendored/underscore';

import Constants from 'constants';

/**
 * This module exports the IO functions required by the controllers.
 */
export default {
  /**
   * Get the session key for the logged in user.
   */
  getSessionKey: () => Cookies.get(Constants.SESSION_KEY_COOKIE) || '',

  /**
   * Navigate to the given route.
   */
  navigate: (route, params) => window.Aviator.navigate(route, params),

  /**
   * Make a link to the given route.
   */
  linkTo: (route, params) => window.Aviator.linkTo(route, params),

  /**
   * Send an HTTP request.
   */
  request(options) {
    options.headers = options.headers || {};
    options.headers[Constants.SESSION_KEY_HEADER] = options.sessionKey;
    options.headers['Content-Type'] = 'application/json';
    options.success = options.callbacks.success;
    options.error = options.callbacks.error;
    options.complete = options.callbacks.complete;
    options.type = 'json';

    if ((typeof options.data === 'object') && (options.method !== 'GET')) {
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

