import Root from 'controllers/root';
import IO from 'io';
// import Authenticated from 'controllers/authenticated';

export default {
  target: new Root(IO),
  '/': 'home',
  '/login': 'login',
  '/sign-up': 'signUp',
  '/search': 'search',
  // '/a': {
  //   target: new Authenticated(IO),
  //   '/': 'feed',
  //   '/edit': 'edit',
  // },
  // '/u': {
  //   target: new Users(IO),
  //   '/:username': 'feedForUsername',
  // }
};
