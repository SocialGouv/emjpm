import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateService } from "../actions/mandataire";
import Layout from "../../communComponents/ModalLayout";

const schema = {
  title: "Modifier vos informations",
  type: "object",
  required: ["etablissement"],
  properties: {
    etablissement: { type: "string", title: "Nom du siège", default: "" },
    nom: {
      type: "string",
      title: "Nom du contact dans le siège",
      default: ""
    },
    prenom: {
      type: "string",
      title: "Prénom du contact dans le siège",
      default: ""
    },
    telephone: { type: "string", title: "Téléphone", default: "" },
    email: {
      type: "string",
      title: "Adresse email du siège",
      default: ""
    },
    adresse: { type: "string", title: "Rue", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    ville: { type: "string", title: "Commune", default: "" },
    dispo_max: {
      type: "integer",
      title: "Nombre de mesures souhaitées",
      default: ""
    }
  }
};

const uiSchema = {
  secretariat: {
    "ui:widget": "select"
  },
  nom: {
    "ui:placeholder": "Nom"
  },
  prenom: {
    "ui:placeholder": "Prénom"
  },
  genre: {
    "ui:placeholder": "Genre"
  },
  telephone: {
    "ui:placeholder": "Téléphone"
  },
  email: {
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

const EditServiceSiege = ({ show, handleHide, formData, onSubmit, ...props }) => {
  const cleanData = {
    ...formData
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
  bindActionCreators({ onSubmit: ({ formData }) => updateService(formData) }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(null, mapDispatchToProps)(
  connectModal({ name: "EditServiceSiege", destroyOnHide: true })(EditServiceSiege)
);
