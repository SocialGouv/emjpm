import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { format } from "date-fns";

import { closeMesure } from "../actions/mesures";
import Layout from "../../communComponents/ModalLayout";

const schema = {
  type: "string",
  format: "date"
};

const uiSchema = {
  "ui:options": {
    label: false
  }
};

const CloseMesureAttente = ({ show, handleHide, onSubmit, id, mandataire_id, ...props }) => {
  const onSubmitted = ({ formData }) => {
    onSubmit({
      date: formData,
      id,
      mandataire_id
    });
  };
  return (
    <Layout show={show} handleHide={handleHide}>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Supprimer la mesure? </h3>
        <br />
        <p style={{ padding: 20 }}>
          Une fois cette opération effectuée, la mesure sera définitivement supprimée de votre profil ainsi que du profil du mandataire
          sélectionné.
        </p>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={onSubmitted}
          formData={format(new Date(), "YYYY-MM-DD")}
        >
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <button type="submit" className="btn btn-success" style={{ padding: "10px 30px" }}>
              Supprimer la mesure
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
  connectModal({ name: "CloseMesureAttente", destroyOnHide: true })(CloseMesureAttente)
);
