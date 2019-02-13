import React from "react";

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
        .getPromise(this.state.active)
        .then(res => {
          if (res && typeof res.success !== "undefined" && res.success !== true) {
            throw new Error(500);
          }
        })
        .catch(
          /* rollback */ e => {
            console.log(e);
            this.toggleState();
          }
        )
    );
  };
  render() {
    return this.props.render({ ...this.state, toggle: this.toggle });
  }
}
ToggleState.defaultProps = {
  getPromise: Promise.resolve()
};
export default ToggleState;
