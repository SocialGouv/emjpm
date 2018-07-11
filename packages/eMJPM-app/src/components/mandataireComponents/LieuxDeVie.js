import * as React from "react";
import ReactAutocomplete from "react-autocomplete";

class LieuxDeVie extends React.Component {
  state = {
    value: "",
    valueId: "",
    lieuxDeVie: "",
    etablissement: ""
  };

  updateValue = ({ value, valueId }) => {
    this.setState({ value: value, valueId: valueId });
  };

  updateLieuxDeVie = ({ lieuxDeVie }) => {
    this.setState({ lieuxDeVie: lieuxDeVie });
  };

  render() {
    return (
      <div>
        <br />
        <div style={{ marginLeft: "20px" }}>
          <h6>Résidence </h6>
        </div>
        <div
          className="custom-control custom-radio custom-control-inline"
          style={{ marginLeft: "20px" }}
        >
          <label style={{ cursor: "pointer", width: "60px" }} htmlFor="customRadioInline1">
            <input
              data-cy="tab-individuel"
              type="radio"
              id="customRadioInline1"
              name="customRadioInline"
              style={{ margin: "5px" }}
              label="A Domicile"
              value="A Domicile"
              onClick={e => this.props.updateLieuxDeVie({ lieuxDeVie: e.target.value })}
            />A Domicile
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <label style={{ cursor: "pointer", width: "60px" }} htmlFor="customRadioInline2">
            <input
              data-cy="tab-prepose"
              type="radio"
              id="customRadioInline2"
              name="customRadioInline"
              style={{ margin: "5px" }}
              label="En etablissement"
              value="En etablissement"
              onClick={e => this.props.updateLieuxDeVie({ lieuxDeVie: e.target.value })}
            />En Etablissement
          </label>
        </div>
        <br />
        {this.props.lieuxDeVie === "En etablissement" && (
          <React.Fragment>
            <h6> Choisisser votre établissement</h6>
            <ReactAutocomplete
              items={this.props.etablissement}
              shouldItemRender={(item, value) =>
                item.nom.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              getItemValue={item => item.nom}
              renderItem={(item, highlighted) => (
                <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
                >
                  {item.nom}
                </div>
              )}
              value={this.props.value}
              onChange={e => this.props.updateValue({ value: e.target.value })}
              onSelect={(a, b) => this.props.updateValue({ value: a, valueId: b.id })}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default LieuxDeVie;
