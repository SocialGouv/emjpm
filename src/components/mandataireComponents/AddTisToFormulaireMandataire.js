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

class AddTisToFormulaireMandataire extends React.Component {
    state = {
        etablissement: "",
        etablissementId: "",
        showForm: false,
    };

    changeValueOfStateShowForm = () => {
        if (this.state.showForm === false) {
            this.setState({ showForm: true });
        } else {
            this.setState({ showForm: false });
        }
    };

    onSubmit = tiId => {
        apiFetch(`/mandataires/1/tis`, {
            method: "POST",
            body: JSON.stringify({
                ti_id: tiId
            })
        }).then(tis => this.props.updateTi(tis));
    };

    render() {
        const displayModal = {
            display: this.state.showForm === true ? "block" : "none"
        };
        const displayButton = {
            display: this.state.showForm === false ? "block" : "none",
            align: "left"
        };
        return (
            <div>
                <button
                    style={{ display: "inline", ...displayButton }}
                    type="button"
                    className="btn btn-success mesure_button"
                    onClick={this.changeValueOfStateShowForm}
                >
                    Ajouter un nouveau Ti
                </button>

                <div style={displayModal}>
                    <ModalPres>
                        <div style={{ width: "600px" }}>
                            <ReactAutocomplete
                                items={this.props.tis}
                                shouldItemRender={(item, value) =>
                                    item.etablissement.toLowerCase().indexOf(value.toLowerCase()) > -1
                                }
                                getItemValue={item => item.etablissement}
                                renderItem={(item, highlighted) => (
                                    <div
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
                                    >
                                        {item.etablissement}
                                    </div>
                                )}
                                value={this.state.etablissement}
                                onChange={e => this.setState({ etablissement: e.target.value })}
                                onSelect={(etablissement, ti) => this.setState({ etablissement: etablissement, etablissementId: ti.id })}
                            />
                            <button
                                onClick={() => this.onSubmit(this.state.etablissementId)}
                                className="btn btn-success"
                                style={{ marginLeft: "20px" }}
                                disabled={status === "loading"}
                            >
                                {(status === "loading" && "Création...") ||
                                (status === "success" && "Valider") ||
                                "Valider"}
                            </button>
                            <CancelButton onClick={this.changeValueOfStateShowForm} className="btn btn-dark">
                                Annuler
                            </CancelButton>
                        </div>
                    </ModalPres>
                </div>
            </div>
        );
    }
}

export default AddTisToFormulaireMandataire;
