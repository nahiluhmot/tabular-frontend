import { Component, DOM } from 'react';

const { div, input, label } = DOM;

/**
 * This class represents a Password input field.
 */
class Password extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      div({ className: 'form-group' },
        label({}, 'Password'),
        input({
          type: 'password',
          className: 'form-control',
          placeholder: 'Password',
          onChange: this.props.onChange
        })
      )
    );
  }
}

export default Password;
