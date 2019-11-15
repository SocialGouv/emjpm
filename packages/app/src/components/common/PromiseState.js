import React from "react";

// render prop that trigger promise on mount and notifies promise resolution
// useful for dynamic loading components
class PromiseState extends React.Component {
  state = {
    data: null,
    status: "idle"
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
              data,
              status: "success"
            });
          })
          .catch(e => {
            this.setState({
              data: e,
              status: "error"
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
