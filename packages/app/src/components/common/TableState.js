import React from "react";

// render prop that trigger promise on mount and notifies promise resolution
// useful for dynamic loading components
class TableState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: this.props.activeTabIndex || 0
    };
  }

  onSelect = activeTabIndex => {
    this.setState({ activeTabIndex });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.activeTabIndex !== this.props.activeTabIndex) {
      this.setState({ activeTabIndex: this.props.activeTabIndex });
    }
  }

  render() {
    return this.props.render({
      onSelect: this.onSelect,
      activeTabIndex: this.state.activeTabIndex
    });
  }
}

export default TableState;
