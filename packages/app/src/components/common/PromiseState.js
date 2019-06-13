import React from "react";

// render prop that trigger promise on mount and notifies promise resolution
// useful for dynamic loading components
class PromiseState extends React.Component {
  state = {
    status: "idle",
    data: null
  };
  load = () => {
    this.setState(
      {
        status: "loading"
      },
      () => {
        this.props
          .getPromise()
          .then(data => {
            this.setState({
              status: "success",
              data
            });
          })
          .catch(e => {
            this.setState({
              status: "error",
              data: e
            });
          });
      }
    );
  };
  componentDidMount() {
    this.load();
  }
  render() {
    return this.props.render(this.state);
  }
}

export default PromiseState;
