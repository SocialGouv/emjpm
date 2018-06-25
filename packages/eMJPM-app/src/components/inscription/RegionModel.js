import React from "react";
import styled from "styled-components";

class RegionModel extends React.Component {
  state = {
    toggled: false
  };

  changeState = e => {
    this.setState(curState => ({
      toggled: !curState.toggled
    }));
  };

  render() {
    return (
      <div>
        <div>
          <label>
            <input
              type="checkBox"
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
            <div style={{ marginLeft: 40 }}>
              <label key={ti.id}>
                <input style={{ marginRight: 5 }} type="checkBox" />
                {ti.nom} - id: {ti.id}
              </label>
            </div>
          ))}
      </div>
    );
  }
}
export default RegionModel;
