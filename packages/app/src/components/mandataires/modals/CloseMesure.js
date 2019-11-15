import React from "react";
import Form from "react-jsonschema-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { connectModal } from "redux-modal";

import Layout from "../../communComponents/ModalLayout";
import { closeMesure } from "../actions/mesures";

const schema = {
  properties: {
    extinction: {
      format: "date",
      type: "string"
    },
    reason_extinction: {
      enum: [
        "Caducité",
        "Changement de mandataire",
        "Changement de tribunal d'instance",
        "Décès",
        "Main levée",
        "Autre"
      ],
      type: "string"
    }
  },
  required: ["extinction", "reason_extinction"],
  type: "object"
};

const uiSchema = {
  extinction: {
    "ui:options": {
      label: true
    },
    "ui:title": "Date d'extinction"
  },
  reason_extinction: {
    "ui:autofocus": true,
    "ui:options": {
      label: true
    },
    "ui:title": "Raison de l'extinction"
  }
};

const CloseMesure = ({ show, handleHide, onSubmit, id, mandataire_id }) => {
  const onSubmitted = ({ formData }) => {
    onSubmit({
      ...formData,
      id,
      mandataire_id
    });
  };
  return (
    <Layout show={show} handleHide={handleHide}>
      <div style={{ marginTop: 50, textAlign: "center" }}>
        <h3>Mettre fin au mandat </h3>
        <br />
        <p style={{ padding: 20 }}>
          {`Une fois cette opération effectuée, vous retrouverez cette fin de mandat dans l'onglet
          correspondant.`}
        </p>
        <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmitted}>
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <button type="submit" className="btn btn-success" style={{ padding: "10px 30px" }}>
              Mettre fin au mandat
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ onSubmit: closeMesure }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ destroyOnHide: true, name: "CloseMesure" })(CloseMesure));
