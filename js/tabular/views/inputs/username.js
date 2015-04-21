import { Component, DOM } from 'react';

const { div, input, label } = DOM;

/**
 * This class represents a Username input field.
 */
class Username extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      div({ className: 'form-group' },
        label({}, 'Username'),
        input({
          type: 'text',
          className: 'form-control',
          placeholder: 'Username',
          onChange: this.props.onChange
        })
      )
    );
  }
}

export default Username;
