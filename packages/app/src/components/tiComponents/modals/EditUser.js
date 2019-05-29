import React from "react";
import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { format } from "date-fns";
import { updateUser } from "../actions/user";
import Layout from "../../communComponents/ModalLayout";

const schema = {
  title: "Modifier mes informations",
  type: "object",
  required: ["nom", "prenom", "email"],
  properties: {
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prénom", default: "" },
    email: { type: "string", title: "Adresse email", default: "" },
    cabinet: { type: "string", title: "Cabinet", default: "" }
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
  email: {
    "ui:placeholder": "Adresse email"
  },
  cabinet: {
    "ui:placeholder": "Cabinet"
  }
};

const EditUser = ({ show, handleHide, formData, onSubmit }) => {
  const cleanData = {
    nom: formData.nom || "",
    prenom: formData.prenom || "",
    email: formData.email || "",
    cabinet: formData.cabinet || ""
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
  bindActionCreators({ onSubmit: ({ formData }) => updateUser(formData) }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(connectModal({ name: "EditUser", destroyOnHide: true })(EditUser));
