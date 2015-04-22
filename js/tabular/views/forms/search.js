import { Component, DOM } from 'react';

const { button, div, input, label, span } = DOM;

/**
 * This class represents search field and button for tabs.
 */
class Search extends Component {
  /**
   * Create a new Search field.
   *
   * Props:
   *   - search: Function that accepts a query and performs a search.
   * State:
   *   - query: String that corresponds to the data in the search box.
   */
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  render() {
    const { className, search } = this.props;
    const { query } = this.state;
    const tree =
      div({ className: this.props.className },
        div({ className: 'input-group' },
          input({
            type: 'text',
            className: 'form-control',
            placeholder:  'Search'
          }),
          span({ className: 'input-group-button' },
            button({
              className: 'btn btn-default',
              disabled: (query === '') ? 'disabled' : null,
              onClick: () => search(query)
            }, 'Search'))));

    return tree;
  }
}

export default Search;
