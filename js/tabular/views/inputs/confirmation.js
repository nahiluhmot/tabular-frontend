import { Component, DOM } from 'react';

const { div, input, label } = DOM;

/**
 * This class represents a Password Confirmation input field.
 */
class Confirmation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      div({ className: 'form-group' },
        label({}, 'Confirmation'),
        input({
          type: 'password',
          className: 'form-control',
          placeholder: 'Confirmation',
          onChange: this.props.onChange
        })
      )
    );
  }
}

export default Confirmation;
