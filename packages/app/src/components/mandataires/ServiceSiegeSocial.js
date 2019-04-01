import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";

import { Button } from "..";

import { updateMandataire } from "./actions/mandataire";
import Fiche from "./Fiche";

const ButtonEditMandataire = connect(
  state => ({
    service: state.mandataire.service
  }),
  dispatch => bindActionCreators({ show }, dispatch)
)(({ formData, show, service }) => (
  <>
    <Button
      data-cy="button-edit-profile"
      style={{ marginLeft: 0 }}
      onClick={() =>
        show("EditServiceSiege", {
          formData
        })
      }
    >
      Modifier mon profil
    </Button>
  </>
));

const AjoutAntenne = connect(
  state => ({
    service: state.mandataire.service
  }),
  dispatch => bindActionCreators({ show }, dispatch)
)(({ formData, show, service }) => (
  <>
    <a
      href="#"
      data-cy="button-edit-profile"
      style={{ marginLeft: 0, fontSize: "1em" }}
      onClick={() => show("AddAntennes")}
    >
      Ajout d'une antenne
    </a>
  </>
));
class ServiceSiegeSocial extends React.Component {
  render() {
    const service = this.props.service;
    return (
      <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "0 0 50%" }}>
          <h3>Mes coordonnées</h3>
          <Fiche {...service} />
          <br />
          <AjoutAntenne />
          <br />
          <br />
          <ButtonEditMandataire formData={service} />
          <a href="#" onClick={this.props.handleClick}>
            {" "}
            Retour au service
          </a>
        </div>
        <div style={{ flex: "0 0 50%" }}>
          {service.zip && (
            <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-zip">
              <h3>Informations à destination des magistrats </h3>
              {service.zip}
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
    service: state.mandataire.service
  }),
  mapDispatchToProps
)(ServiceSiegeSocial);
export default ServiceSiegeSocialRedux;
