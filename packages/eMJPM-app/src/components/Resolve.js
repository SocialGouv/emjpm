import React from "react";
/*
ce composant permet de resolver plusieurs promises et notifier l'etat via une "render prop" {status, error, result}
*/
class Resolve extends React.Component {
  state = {
    status: "idle",
    result: null,
    error: null
  };
  shouldComponentUpdate() {
    // dont retry on success
    return this.state.status !== "success";
  }
  componentDidMount() {
    const { promises } = this.props;
    this.setState({ status: "loading", result: null, error: null }, () => {
      Promise.all(promises)
        .then(result => {
          this.setState({ result, status: "success", error: null });
        })
        .catch(e => {
          console.log(e);
          this.setState({ result: null, status: "error", error: e.message });
        });
    });
  }
  render() {
    return this.props.render(this.state);
  }
}

export default Resolve;
