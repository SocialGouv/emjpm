import React from "react";

// loads props.getPromise and use a render prop
// todo: use a specific hack in componentDidUpdate to reload data based on (redux) state
// used for MapMesures
class DataLoader extends React.Component {
  state = {
    data: null
  };
  fetchData = (state, instance) => {
    this.props
      .getPromise()
      .then(data => {
        this.setState({
          data
        });
      })
      .catch(console.log);
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lastUpdate !== this.props.lastUpdate) {
      this.fetchData();
    }
  }
  render() {
    return this.props.render(this.state);
  }
}

export default DataLoader;
