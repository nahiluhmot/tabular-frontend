import { LINKS } from 'tabular/constants';
import Root from 'tabular/controllers/root';
import IO from 'tabular/io';

const { home, login, logout, signUp, search } = LINKS;

export default {
  target: new Root(IO),
  [home]: 'home',
  [login]: 'login',
  [logout]: 'logout',
  [signUp]: 'signUp',
  [search]: 'search'
};
