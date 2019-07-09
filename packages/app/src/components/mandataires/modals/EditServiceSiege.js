import React from "react";
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
    },
    information: { type: "string", title: "Informations à destination des magistrats" }
  }
};

const uiSchema = {
  etablissement: {
    "ui:placeholder": "Etablissement",
    classNames: "service_input"
  },
  nom: {
    "ui:placeholder": "Nom",
    classNames: "service_input"
  },
  prenom: {
    "ui:placeholder": "Prénom",
    classNames: "service_input"
  },
  genre: {
    "ui:placeholder": "Genre",
    classNames: "service_input"
  },
  telephone: {
    "ui:placeholder": "Téléphone",
    classNames: "service_input"
  },
  email: {
    "ui:placeholder": "Adresse email",
    classNames: "service_input"
  },
  adresse: {
    "ui:placeholder": "Rue",
    classNames: "service_input"
  },
  code_postal: {
    "ui:placeholder": "Code Postal",
    classNames: "service_input"
  },
  ville: {
    "ui:placeholder": "Commune",
    classNames: "service_input"
  },
  dispo_max: {
    "ui:placeholder": "Nombre de mesures souhaitées",
    classNames: "service_input"
  },
  information: {
    "ui:widget": "textarea",
    classNames: "service_input_information"
  }
};

const EditServiceSiege = ({ show, handleHide, formData, onSubmit }) => {
  const cleanData = {
    ...formData,
    etablissement: formData.etablissement || "",
    nom: formData.nom || "",
    prenom: formData.prenom || "",
    email: formData.email || "",
    genre: formData.genre || "",
    telephone: formData.telephone || "",
    adresse: formData.adresse || "",
    code_postal: formData.code_postal || "",
    dispo_max: formData.dispo_max || 0,
    ville: formData.ville || "",
    information: formData.information || ""
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
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ name: "EditServiceSiege", destroyOnHide: true })(EditServiceSiege));
