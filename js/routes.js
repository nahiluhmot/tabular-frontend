import Root from 'controllers/root';
import IO from 'io';

export default {
  target: new Root(IO),
  '/': 'home',
  '/login': 'login',
  '/logout': 'logout',
  '/sign-up': 'signUp',
  '/search': 'search',
};
