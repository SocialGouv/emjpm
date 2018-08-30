import * as React from "react";

class FilterByCodePostal extends React.Component {
  state = {
    value: ""
  };

  updateValue = value => {
    this.setState({
      value
    });
  };

  render() {
    return this.props.render({
      value: this.state.value,
      updateValue: this.updateValue
    });
  }
}

export default FilterByCodePostal;
