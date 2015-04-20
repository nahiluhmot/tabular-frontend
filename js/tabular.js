import Aviator from 'aviator';
import Routes from 'tabular/routes';

export default {
  /**
   * Initialize the App.
   */
  initialize() {
    window.Aviator.setRoutes(Routes);
    window.Aviator.dispatch();
    return true;
  }
};
