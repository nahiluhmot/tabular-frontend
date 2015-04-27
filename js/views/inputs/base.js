import { Component, DOM } from 'react';

const { div, input, label } = DOM;

/**
 * This represents a basic input field.
 */
class Base extends Component {
  /**
   * Create a new Input.
   *
   * Props:
   *   - label:       Label for the input field.
   *   - onChange:    Function to perform when the input changes.
   *   - placeholder: Placeholder text for the input.
   *   - type:        Input type field.
   *   - className:   Optional CSS class name.
   *   - value:       Optional default value.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { onChange, placeholder, type, className, value } = this.props;

    return (
      div({ className: className ? `form-group ${className}` : 'form-group' },
        label({}, this.props.label),
        input({
          type: type,
          className: 'form-control',
          placeholder: placeholder,
          value: value,
          onChange: onChange
        })
      )
    );
  }
}

export default Base;
