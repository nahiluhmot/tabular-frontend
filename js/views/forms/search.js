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
    const { search } = this.props;
    const { query } = this.state;
    const inputProps = {
      type: 'text',
      className: 'form-control',
      placeholder:  'Search',
      onChange: event => this.setState({ query: event.target.value }),
      onKeyUp: event => {
        if (event.keyCode === 13) {
          search(query);
        }
      }
    };
    const buttonProps = {
      type: 'button',
      className: 'btn btn-default',
      disabled: (query === '') ? 'disabled' : null,
      onClick: event => {
        event.preventDefault();
        search(query);
      }
    };
    const tree =
      div({ className: 'form-group' },
        div({ className: 'input-group' },
          input(inputProps),
          span({ className: 'input-group-btn' },
            button(buttonProps,
              span({ className: 'fui-search' })))));
    return tree;
  }
}

export default Search;
