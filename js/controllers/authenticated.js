import Base from 'controllers/base';

/**
 * This is the controller reserved for authenticated users.
 */
class Authenticated extends Base {
  /**
   * Create a new authenticated controller.
   */
  constructor(io) {
    super(io);
  }

  feed() {
    console.log('going to the feed');
  }

  edit() {
    console.log('going to the edit page');
  }

}

export default Authenticated;
