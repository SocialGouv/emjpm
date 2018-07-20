import styled from "styled-components";
import ReactAutocomplete from "react-autocomplete";
import * as React from "react";

import apiFetch from "../communComponents/Api";

const ModalPres = styled.div`
  padding: 15px;
  margin-right: 25px;
  border: 1px solid black;
  background: #f9f9f9;
  border-radius: 5px;
`;

const CancelButton = styled.button`
  cursor: pointer;
  margin-left: 20px;
`;

class CreationEtablissement extends React.Component {
  state = {
    value: "",
    valueid: "",
    showFiness: false,
    showForm: false,
    error: null,
    status: null
  };

  OpenCreationMesure = () => {
    if (this.state.showForm === false) {
      this.setState({ showForm: true, error: null, success: null, status: null });
    } else {
      this.setState({ showForm: false, error: null, success: null, status: null });
    }
  };

  onSubmit = etablissement_id => {
    apiFetch(`/mandataires/1/etablissements`, {
      method: "POST",
      body: JSON.stringify({
        etablissement_id: etablissement_id
      })
    }).then(mesureEteinte => this.props.updateEtablissement(mesureEteinte));
  };

  render() {
    const hideForm = {
      display: this.state.showForm === true ? "block" : "none"
    };
    const showForm = {
      display: this.state.showForm === false ? "block" : "none",
      align: "left"
    };
    return (
      <div>
        <button
          style={{ display: "inline", ...showForm }}
          type="button"
          className="btn btn-success mesure_button"
          onClick={this.OpenCreationMesure}
        >
          Ajouter un nouvel Etablissement
        </button>

        <div style={hideForm}>
          <ModalPres>
            <div style={{ width: "600px" }}>
              <ReactAutocomplete
                items={this.props.etablissements}
                shouldItemRender={(item, value) =>
                  item.nom.toLowerCase().indexOf(value.toLowerCase()) > -1 &&
                  item.ville.toLowerCase().indexOf(value.toLowerCase()) > -1 &&
                  item.id_finess.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                getItemValue={item => item.nom || item.id_finess || item.ville}
                renderItem={(item, highlighted) => (
                  <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
                  >
                    {item.nom} | {item.ville} | {item.id_finess}
                  </div>
                )}
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={(a, b) => this.setState({ value: a, valueid: b.id })}
              />
              <button
                onClick={() => this.onSubmit(this.state.valueid)}
                className="btn btn-success"
                style={{ marginLeft: "20px" }}
                disabled={status === "loading"}
              >
                {(status === "loading" && "Création...") ||
                  (status === "success" && "Valider") ||
                  "Valider"}
              </button>
              <CancelButton onClick={this.OpenCreationMesure} className="btn btn-dark">
                Annuler
              </CancelButton>
            </div>
          </ModalPres>
        </div>
      </div>
    );
  }
}

export default CreationEtablissement;
