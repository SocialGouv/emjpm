import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { format } from "date-fns";

import { closeMesure } from "../actions/mesures";
import Layout from "../../communComponents/ModalLayout";
import { residence } from "../../common/nomination";

const schema = {
  type: "object",
  required: ["extinction", "reason_extinction"],
  properties: {
    extinction: {
      type: "string",
      format: "date"
    },
    reason_extinction: {
      type: "string",
      enum: [
        "Caducité",
        "Changement de mandataire",
        "Changement de tribunal d'instance",
        "Décès",
        "Main levée",
        "Autre"
      ]
    }
  }
};

const uiSchema = {
  extinction: {
    "ui:placeholder": "date d'extinction",
    "ui:options": {
      label: false
    }
  },
  reason_extinction: {
    "ui:autofocus": true,
    "ui:title": "Raison de l'extinction",
    "ui:options": {
      label: true
    }
  }
};

const CloseMesure = ({ show, handleHide, onSubmit, id, mandataire_id, ...props }) => {
  const onSubmitted = ({ formData }) => {
    onSubmit({
      ...formData,
      id,
      mandataire_id
    });
  };
  return (
    <Layout show={show} handleHide={handleHide}>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Mettre fin au mandat </h3>
        <br />
        <p style={{ padding: 20 }}>
          Une fois cette opération effectuée, vous retrouverez cette fin de mandat dans l'onglet correspondant.
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

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onSubmit: closeMesure }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(null, mapDispatchToProps)(
  connectModal({ name: "CloseMesure", destroyOnHide: true })(CloseMesure)
);
