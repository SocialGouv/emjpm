//

import PropTypes from "prop-types";
import React from "react";

import { trackPageChange } from "../../piwik";

//

export class PageTracker extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  componentDidMount() {
    // ! HACK(douglasduteil): fake router change
    // ! IMO comming to this view should impact the url.
    // ! It's not the case for now but in the future...
    trackPageChange(this.props.url);
  }
  render() {
    return null;
  }
}
