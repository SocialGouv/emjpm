class CodePostalMandataire extends React.Component {
  state = {
    codePostal: ""
  };
  render() {
    return (
      <div
        style={{
          width: 350,
          height: 80,
          borderRadius: 5,
          padding: 10,
          backgroundColor: "#ffedad",
          margin: "0 auto"
        }}
      >
        <img
          style={{ width: 60, float: "left" }}
          src="/static/images/locate.svg"
          alt="carte presentation"
        />
        <div style={{ fontSize: "1.3em", marginBottom: 5 }}>Au plus proche du majeur protégé</div>
        <div>
          <input
            style={{ width: 100, textAlign: "center", display: "inline", clear: "both" }}
            type="text"
            className="form-control"
            placeholder="Code Postal"
            value={this.state.codePostal}
            onChange={e => this.setState({ codePostal: e.target.value })}
          />
          <button
            style={{ width: 50 }}
            type="button"
            className="btn btn-secondary"
            onClick={e => this.props.findPostcode(this.state.codePostal)}
          >
            Ok
          </button>
        </div>
      </div>
    );
  }
}

export default CodePostalMandataire;
