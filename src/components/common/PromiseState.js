// render prop that trigger promise onClick and notifies promise resolution
class PromiseState extends React.Component {
  state = {
    status: "idle"
  };

  onClick = () => {
    this.setState(
      {
        status: "loading"
      },
      () => {
        this.props
          .onClick()
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
  render() {
    return <div onClick={this.onClick}>{this.props.render(this.state)}</div>;
  }
}

export default PromiseState;
