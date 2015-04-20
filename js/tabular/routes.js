import Users from 'tabular/controllers/users';
import IO from 'tabular/io';

export default {
  target: new Users(IO),
  '/': 'signUp'
};
