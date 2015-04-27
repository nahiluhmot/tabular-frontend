import { Component, createElement, DOM } from 'react';
import { compact, pick } from 'underscore';

import Input from 'views/inputs/base';

const { button, div, form, label, textarea } = DOM;

/**
 * This class represents a form where the user enters a new tab.
 */
class EditTab extends Component {
  /**
   * Create a new EditTab form.
   *
   * Props:
   *   - save:    Function that accepts a username, password, confirmation,
   *              and callbacks, then creates a user.
   *   - success: Function to perform when the tab is saved.
   *   - tab:     Object that contains values to pre-fill.
   *
   * State:
   *   - artist:   Artist of the tab.
   *   - album:    Album of the tab.
   *   - title:    Title of the tab.
   *   - body:     Body of the tab.
   *   - validate: Boolean that indicates whether or not to show errors.
   */
  constructor(props) {
    super(props);
    this.state = {
      artist: props.tab.artist || '',
      album: props.tab.album || '',
      title: props.tab.title || '',
      body: props.tab.body || '',
      validate: false
    };
  }

  render() {
    const { artist, album, title, body } = this.props;
    const errorMessage = this.errorMessage();
    const buttonProps = {
      className: 'btn btn-primary',
      disabled: errorMessage !== null,
      onClick: event => {
        event.preventDefault();
        this.save();
      }
    };

    const tree =
      form({},
        errorMessage,
        createElement(Input, {
          label: 'Artist',
          placeholder: 'Artist',
          type: 'text',
          value: artist,
          onChange: event => this.setState({ artist: event.target.value })
        }),
        createElement(Input, {
          label: 'Album',
          placeholder: 'Album',
          type: 'text',
          value: album,
          onChange: event => this.setState({ album: event.target.value })
        }),
        createElement(Input, {
          label: 'Title',
          placeholder: 'Title',
          type: 'text',
          value: title,
          onChange: event => this.setState({ title: event.target.value })
        }),
        div({ className: 'form-group' },
          label({}, 'Body'),
          textarea({
            className: 'form-control monospace',
            value: body,
            rows: 20,
            onChange: event => this.setState({ body: event.target.value })
          })),
        button(buttonProps, 'Save'));

      return tree;
  }

  errorMessage() {
    let message = null;

    if (this.state.validate) {
      if (this.state.error) {
        message = this.state.error;
      } else {
        message = this.validate();
      }
    }

    if (message) {
      return div({ className: 'alert alert-danger' }, message);
    }

    return null;
  }

  save() {
    const { save, success } = this.props;

    console.log(this.state);

    if (this.validate() === null) {
      save(pick(this.state, 'artist', 'album', 'title', 'body'), {
        success: success,
        error: () =>
          this.setState({
            error: 'Unable to save the tab at this time',
            validate: true
          })
      });
    } else {
      this.setState({ validate: true });
    }
  }

  validate() {
    const errors =
      ['artist', 'album', 'title', 'body'].map(attr =>
        (this.state[attr] === '') ?
          `${this.capitialize(attr)} cannot be blank` :
          null);

    return compact(errors)[0] || null;
  }

  capitialize(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  }
}

export default EditTab;
