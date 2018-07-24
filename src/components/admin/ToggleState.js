// handle state toggle and a render prop
class ToggleState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active
    };
  }
  toggleState = (cb = () => {}) => {
    this.setState(
      curState => ({
        active: !curState.active
      }),
      cb
    );
  };
  toggle = () => {
    // optimistic rendering
    this.toggleState(() =>
      this.props
        .onToggle(this.state.active)
        .then(res => {
          if (res.success !== true) {
            throw new Error(500);
          }
        })
        .catch(/* rollback */ () => this.toggleState())
    );
  };
  render() {
    return <div onClick={this.toggle}>{this.props.render(this.state)}</div>;
  }
}

export default ToggleState;
