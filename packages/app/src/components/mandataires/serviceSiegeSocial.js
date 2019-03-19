import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";

import { Button, Autocomplete, SelectionManager } from "..";
import apiFetch from "../communComponents/Api";

import { updateMandataire } from "./actions/mandataire";
import Fiche from "./Fiche";

const ButtonEditMandataire = connect(
  state => ({
    currentMandataire: state.mandataire.profiles
  }),
  dispatch => bindActionCreators({ show }, dispatch)
)(({ formData, show, currentMandataire }) => (
  <>
    <Button
      data-cy="button-edit-profile"
      style={{ marginLeft: 0 }}
      onClick={() =>
        show(formData.type === "service" ? "EditService" : "EditMandataire", {
          formData
        })
      }
    >
      Modifier mon profil
    </Button>
  </>
));

class ServiceSiegeSocial extends React.Component {
  render() {
    const newMandataire =
      this.props.currentMandataire && this.props.currentMandataire.length !== 1
        ? this.props.currentMandataire.filter(manda => manda.id === this.props.mandataireId)[0]
        : this.props.currentMandataire;

    return (
      <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "0 0 50%" }}>
          <h3>Mes coordonnées</h3>
          <Fiche {...newMandataire} />
          <br />
          <br />
          <ButtonEditMandataire formData={newMandataire} />
        </div>
        <div style={{ flex: "0 0 50%" }}>
          {newMandataire.zip && (
            <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-zip">
              <h3>Informations à destination des magistrats </h3>
              {newMandataire.zip}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ updateMandataire: data => updateMandataire(data) }, dispatch);

const ServiceSiegeSocialRedux = connect(
  state => ({
    currentMandataire: state.mandataire.profiles,
    etablissements: state.mandataire.finess,
    tis: state.mandataire.tis
  }),
  mapDispatchToProps
)(ServiceSiegeSocial);

export default ServiceSiegeSocialRedux;
