import Aviator from 'aviator';
import Routes from 'routes';

window.onload = () => {
  Aviator.setRoutes(Routes);
  Aviator.dispatch();
};
