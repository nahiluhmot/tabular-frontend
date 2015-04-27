import { MAX_SEARCH_RESULTS_PER_PAGE } from 'config';
import Base from 'controllers/base';

import SearchResults from 'views/pages/tabs/search-results';

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
   * Search for a tab.
   */
  search({ queryParams }) {
    let { page, query, hasNext } = queryParams;

    this.tabs.searchTabs(query, page, {
      success: data => {
        const searchLink = params => this.io.linkTo('/tabs/', {
          queryParams: params
        });

        const nextLink = searchLink({
          page: page + 1,
          query: query,
          hasNext: true,
          hasPrev: true
        });
        const firstLink = searchLink({
          page: 1,
          query: query,
          hasPrev: false,
          hasNext: true
        });
        const prevLink = hasNext =>
          searchLink({
            page: page - 1,
            query: query,
            hasNext: true,
            hasPrev: page > 2
          });

        if ((page > 1) && (data.length === 0)) {
          this.io.navigate(prevLink(false));
        } else if (page < 1) {
          this.io.navigate(firstLink);
        } else {
          hasNext = hasNext && (data.length === MAX_SEARCH_RESULTS_PER_PAGE);
          this.render(SearchResults, {
            page: page,
            query: query,
            results: data,
            navigateToTab: id => this.io.navigate(`/tabs/${id}/`),
            next: hasNext ? nextLink : null,
            prev: (page > 1) ? prevLink(true) : null
          });
        }
      },
      error: error => {
        console.log(`Error searching tabs for query: ${query}`);
        console.log(error);
      }
    });
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
