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
        <div style={{ marginLeft: "20px" }}>
          <h6>Résidence</h6>
        </div>
        <div className="custom-control custom-radio custom-control-inline" style={{ width: 140 }}>
          <label style={{ cursor: "pointer" }} htmlFor="customRadioInline1">
            <input
              data-cy="radio-domicile"
              type="radio"
              id="customRadioInline1"
              name="customRadioInline"
              style={{ margin: "5px" }}
              label="A Domicile"
              value="A Domicile"
              onClick={e => this.props.updateLieuxDeVie({ lieuxDeVie: e.target.value })}
            />{" "}
            A Domicile
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline" style={{ width: 200 }}>
          <label style={{ cursor: "pointer" }} htmlFor="customRadioInline2">
            <input
              data-cy="radio-etablissement"
              type="radio"
              id="customRadioInline2"
              name="customRadioInline"
              style={{ margin: "5px" }}
              label="En établissement"
              value="En établissement"
              onClick={e => this.props.updateLieuxDeVie({ lieuxDeVie: e.target.value })}
            />{" "}
            En Etablissement
          </label>
        </div>
        {this.props.lieuxDeVie === "En établissement" && (
          <div style={{ marginLeft: 20, marginTop: 20 }}>
            <h6>Choisissez votre établissement</h6>
            <ReactAutocomplete
              items={this.props.etablissement}
              inputProps={{
                style: { width: 250 }
              }}
              shouldItemRender={(item, value) =>
                item.nom.toLowerCase().indexOf(value.toLowerCase()) > -1}
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
          </div>
        )}
      </div>
    );
  }
}

export default LieuxDeVie;
