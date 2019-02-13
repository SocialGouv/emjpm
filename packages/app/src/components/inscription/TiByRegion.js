import React from "react";

class TiByRegion extends React.Component {
  state = {
    toggled: false
  };

  changeState = () => {
    this.setState(curState => {
      if (curState.toggled) {
        this.props.tis.map(ti => this.props.onTiSelected(ti.id, false));
      }
      return {
        toggled: !curState.toggled
      };
    });
  };

  render() {
    return (
      <div data-cy={`TiByRegion-${this.props.nom}`}>
        <div>
          <label>
            <input
              data-cy="region"
              type="checkbox"
              style={{ marginRight: 5 }}
              onChange={this.changeState}
              value=""
            />
            {this.props.nom}
          </label>
        </div>

        {this.state.toggled &&
          this.props.tis &&
          this.props.tis.map(ti => (
            <div style={{ marginLeft: 40 }} key={ti.id}>
              <label>
                <input
                  data-cy="ti"
                  style={{ marginRight: 5 }}
                  type="checkbox"
                  onChange={e => this.props.onTiSelected(ti.id, e.target.checked)}
                />
                {ti.nom}
              </label>
            </div>
          ))}
      </div>
    );
  }
}
export default TiByRegion;
