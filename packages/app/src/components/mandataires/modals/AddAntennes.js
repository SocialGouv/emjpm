import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Layout from "../../communComponents/ModalLayout";
import { addAntennesToMandataires } from "../actions/mandataire";

const schema = {
  title: "Ajouter une antenne",
  type: "object",
  required: [
    "etablissement",
    "contact_nom",
    "contact_prenom",
    "telephone",
    "contact_email",
    "adresse",
    "code_postal",
    "ville"
  ],
  properties: {
    etablissement: { type: "string", title: "Nom de l'antenne", default: "" },
    contact_email: { type: "string", format: "email", title: "email", default: "" },
    contact_nom: { type: "string", title: "Nom contact dans l'antenne", default: "" },
    contact_prenom: { type: "string", title: "Prenom contact dans l'antenne", default: "" },
    telephone: { type: "string", title: "Telephone contact dans l'antenne", default: "" },
    adresse: { type: "string", title: "Adresse dans l'antenne", default: "" },
    code_postal: { type: "string", title: "Code postal contact dans l'antenne", default: "" },
    ville: { type: "string", title: "Ville dans l'antenne", default: "" },
    dispo_max: { type: "integer", title: "Nombre mesure maximum pour l'antenne", default: 0 }
  }
};

const uiSchema = {
  contact_nom: {
    "ui:placeholder": "Nom"
  },
  contact_prenom: {
    "ui:placeholder": "Prénom"
  },
  telephone: {
    "ui:placeholder": "Téléphone"
  },
  contact_email: {
    "ui:placeholder": "Adresse email"
  },
  adresse: {
    "ui:placeholder": "Rue"
  },
  code_postal: {
    "ui:placeholder": "Code Postal"
  },
  ville: {
    "ui:placeholder": "Commune"
  },
  dispo_max: {
    "ui:placeholder": "Nombre de mesures souhaitées"
  }
};

const AddAntennes = ({ show, handleHide, formData, onSubmit, service, ...props }) => {
  const cleanData = {
    ...formData,
    service_id: service.id
  };
  return (
    <Layout show={show} handleHide={handleHide} className="FicheMandataireModal">
      <Form schema={schema} uiSchema={uiSchema} formData={cleanData} onSubmit={onSubmit}>
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <button type="submit" className="btn btn-success" style={{ padding: "10px 30px" }}>
            Valider
          </button>
        </div>
      </Form>
    </Layout>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSubmit: ({ formData }) => addAntennesToMandataires(formData) }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  state => ({
    service: state.mandataire.service
  }),
  mapDispatchToProps
)(connectModal({ name: "AddAntennes", destroyOnHide: true })(AddAntennes));
