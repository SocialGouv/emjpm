import React from "react";

/*
ce composant permet de resolver plusieurs promises et notifier l'etat via une "render prop" {status, error, result}

const getPromise = () => Promise.resolve()

const Example = () => <Resolve
  promises={[() => getPromise()]}
  render={({ status, result }) => (
    <React.Fragment>
      {status === "success" && <div>OK: {JSON.stringify(success, null, 2)}</div>}
      {status === "error" && <div>Impossible de charger la carte des mesures</div>}
      {status === "loading" && <div>Chargement de la carte des mesures...</div>}
    </React.Fragment>
  )}
/>

*/
class Resolve extends React.Component {
  state = {
    error: null,
    result: null,
    status: "idle"
  };
  shouldComponentUpdate() {
    // dont retry on success
    return this.state.status !== "success";
  }
  componentDidMount() {
    const { promises } = this.props;
    this.setState({ error: null, result: null, status: "loading" }, () => {
      Promise.all(promises.map(p => p()))
        .then(result => {
          this.setState({ error: null, result, status: "success" });
        })
        .catch(error => {
          /* eslint-disable no-console */
          console.error(error);
          /* eslint-enable no-console */
          this.setState({ error: error.message, result: null, status: "error" });
        });
    });
  }
  render() {
    return this.props.render(this.state);
  }
}

export default Resolve;
