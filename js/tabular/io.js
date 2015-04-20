import Aviator from 'aviator';
import { get as getCookie } from 'cookies';
import { stringify as toJSON } from 'json';
import { createElement, render } from 'react';
import { reqwest as request } from 'reqwest';
import { ROOT_ELEMENT_ID, SESSION_KEY_COOKIE } from 'tabular/constants';

/**
 * This module exports the IO functions required by the controllers.
 */
export default {
  /**
   * Get the session key for the logged in user.
   */
  getSessionKey() {
    return getCookie(SESSION_KEY_COOKIE);
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
    if (typeof options.data === 'object') {
      options.data = toJSON(options.data);
    }

    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json';
    options.type = 'json';

    return request(options);
  },

  /**
   * Render the given component at the specified DOM node.
   */
  render(component, params, callback) {
    const element = createElement(component, params);
    const node = document.getElementById(ROOT_ELEMENT_ID);

    console.log(node);
    return render(element, node, callback);
  }
};

