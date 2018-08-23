import * as React from "react";
import Form from "react-jsonschema-form";

//Redux
import { connect } from "react-redux";
import { show, connectModal } from "redux-modal";
import { bindActionCreators } from "redux";

import Layout from "./Layout";
import { openValidationModal } from "../actions/mandataire";

const schema = {
  type: "object",
  required: ["type", "annee"],
  properties: {
    type: {
      type: "string",
      title: "Nature de la mesure",
      enum: ["Tutelle", "Curatelle", "Sauvegarde de justice", "Mesure ad hoc", "MAJ"]
    },
    civilite: { type: "string", enum: ["F", "H"] },
    annee: { type: "integer", title: "Année de naissance" }
  }
};

const uiSchema = {
  annee: {
    "ui:placeholder": "Année de naissance",
    "ui:title": "Nature de la mesure",
    "ui:options": {
      label: false
    }
  },
  civilite: {
    "ui:placeholder": "Genre",
    "ui:options": {
      label: false
    }
  },
  type: {
    "ui:placeholder": "Type de mesure",
    "ui:options": {
      label: true
    }
  }
};

class ModalMesureReservation extends React.Component {
  render() {
    const formData = {
      mandataire_id: this.props.reservationMandataire.id,
    };
    return (
      <Layout show={this.props.show} handleHide={this.props.handleHide}>
        <div style={{ padding: "30px" }}>
          <h2>Attribution d'une nouvelle mesure</h2>
          <b>{this.props.reservationMandataire.etablissement}</b>
          <br />
          {this.props.reservationMandataire.type}
          <br />
          <br />
          {this.props.reservationMandataire.etablissement} recevra une notification par email.Une
          fois le mandat reçu le mandataire pourra valider cette attribution de mesure.
          <br />
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onSubmit={this.props.openValidationModal}
          >
            <button type="submit" className="btn btn-success">
              Valider
            </button>
            <button onClick={this.props.handleHide} className="btn btn-link  ">
              Annuler
            </button>
          </Form>
        </div>
      </Layout>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ show, openValidationModal }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ name: "ModalMesureReservation", destroyOnHide: true })(ModalMesureReservation));
