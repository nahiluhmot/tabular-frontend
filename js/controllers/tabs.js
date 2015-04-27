import Base from 'controllers/base';

/**
 * This controller displays pages related to tabs.
 */
class Tabs extends Base {
  /**
   * Create a new Tabs controller.
   */
  constructor(io) {
    super(io);
  }

  /**
   * Render a form to create a new tab if the user is logged in, redirect them
   * to the home page if they are not.
   */
  newTab() {
    console.log('Navigating to the new tab page');
  }

  /**
   * Show a tab by its id.
   */
  show({ namedParams }) {
    const { id } = namedParams;
    console.log(`Showing tab with id ${id}`);
  }

  /**
   * Edit a tab by its id. If the user that owns that tab is not logged in,
   * redirect them to the show page.
   */
  edit({ namedParams }) {
    const { id } = namedParams;
    console.log(`Editing tab with id ${id}`);
  }
}

export default Tabs;
