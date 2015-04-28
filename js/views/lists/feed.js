import { Component, DOM } from 'react';

const { a, button, div, strong } = DOM;

/**
 * This class contains the logic to display a lazily-loaded.
 */
class Feed extends Component {
  /**
   * Create a feed.
   *
   * Props:
   *   - getPage: Function that accepts a page number and a callback, then
   *              loads the page of the feed.
   * State:
   *   - page:     The currently loaded page.
   *   - items:    An Array of feed items.
   *   - disabled: A boolean that determines whether or not the "Load More"
   *               button is disabled.
   */
  constructor(props) {
    super(props);
    this.state = { page: 0, items: [], disabled: false };
  }

  componentDidMount() {
    this.getNextPage();
  }

  componentDidUnmount() {
    this.setState({ items: [] });
  }

  render() {
    const { disabled, items } = this.state;
    const buttonProps = {
      className: 'btn btn-primary full-button',
      disabled: disabled,
      onClick: () => this.getNextPage()
    };

    const tree =
      div({},
        items.map(item => this.renderItem(item)),
        button(buttonProps, 'Load More'));

    return tree;
  }

  renderItem(item) {
    const { comment, tab } = item;

    if (tab) {
      return this.renderTab(tab);
    } else if (comment) {
      return this.renderComment(comment);
    } else {
      return null;
    }
  }

  renderTab({ id, artist, album, title, user }) {
    const { username } = user;

    const tree =
      div({ key: `tab-${id}`, className: 'panel panel-default' },
        div({ className: 'panel-heading' },
          a({ className: 'navigate', href: `/u/${username}/` }, username),
          ' posted a tab'),
        div({ className: 'panel-body' },
          a({ className: 'navigate', href: `/tabs/${id}/` },
            strong({}, title),
            ' by ',
            strong({}, artist),
            ' on the album ',
            strong({}, album))));

    return tree;
  }

  renderComment({ id, body, tab, user }) {
    const { username } = user;
    const tabUsername = tab.user.username;

    const tree =
      div({ key: `comment-${id}`, className: 'panel panel-default' },
        div({ className: 'panel-heading' },
          a({ className: 'navigate', href: `/u/${username}/` }, username),
          ' posted a comment on a ',
          a({ className: 'navigate', href: `/tabs/${tab.id}/` }, 'tab'),
          ' by ',
          a({ className: 'navigate', href: `/u/${tabUsername}/` }, tabUsername)),
        div({ className: 'panel-body' }, body));

    return tree;
  }

  getNextPage() {
    const { getPage } = this.props;
    const { disabled, items, page } = this.state;
    const nextPage = page + 1;

    if (!disabled) {
      getPage(nextPage, fresh => {
        if (fresh.length === 0) {
          this.setState({ disabled: true });
        } else {
          this.setState({ page: nextPage, items: items.concat(fresh) });
        }
      });
    }
  }
}

export default Feed;
