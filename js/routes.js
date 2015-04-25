import { LINKS } from 'constants';
import Root from 'controllers/root';
import IO from 'io';

const { home, login, logout, signUp, search } = LINKS;

export default {
  target: new Root(IO),
  [home]: 'home',
  [login]: 'login',
  [logout]: 'logout',
  [signUp]: 'signUp',
  [search]: 'search'
};
