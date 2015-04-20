import Aviator from 'aviator';
import { get as getCookie } from 'cookies';
import { createElement, render } from 'react';
import reqwest from 'reqwest';

import { ROOT_ELEMENT_ID, SESSION_KEY_COOKIE } from 'tabular/constants';

/**
 * This module exports the IO functions required by the controllers.
 */
export default {
  getSessionKey: () => getCookie(SESSION_KEY_COOKIE),
  navigate: (route, params) => Aviator.navigate(route, params),
  request: reqwest,
  render(component, params, callback) {
    const element = createElement(component, params);
    const node = document.getElementById(ROOT_ELEMENT_ID);

    console.log(node);
    return render(element, node, callback);
  }
};

