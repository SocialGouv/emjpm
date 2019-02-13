class CodePostalMandataire extends React.Component {
  state = {
    codepostal: ""
  };
  render() {
    return (
      <div className="container" style={{ heigth: "30%" }}>
        <div className="row">
          <div className="col-4" />
          <div className="col-4" style={{ align: "center" }}>
            <br />
            <img
              style={{ width: "25%", float: "left" }}
              src="/static/images/carte.jpg"
              alt="carte presention"
            />
            <div style={{ float: "rigth" }}>
              <p>Au plus proche du majeur protégé</p>
              <div className="row">
                <div className="col-7">
                  <input
                    type={"text"}
                    className={"form-control"}
                    placeholder={"Code Postal"}
                    value={this.state.codepostal}
                    onChange={e =>
                      this.setState({ codepostal: e.target.value })
                    }
                  />
                </div>
                <div className="col-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={e =>
                      this.props.findPostcode({
                        postcode: this.state.codepostal
                      })
                    }
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default CodePostalMandataire;
