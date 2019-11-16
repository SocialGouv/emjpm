import React from "react";
import Form from "react-jsonschema-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { connectModal } from "redux-modal";

import Layout from "../../communComponents/ModalLayout";
//import { format } from "date-fns";
import { updateMandataire } from "../actions/mandataire";

const schema = {
  dependencies: {
    secretariat: {
      oneOf: [
        {
          properties: {
            secretariat: {
              enum: [false]
            }
          }
        },
        {
          properties: {
            nb_secretariat: {
              default: "",
              title: "Secrétariat : nombre d'ETP( Si temps partiel à 80% mettre 0.8)",
              type: "number"
            },
            secretariat: {
              enum: [true]
            }
          }
        }
      ]
    }
  },
  properties: {
    adresse: { default: "", title: "Rue", type: "string" },
    code_postal: { default: "", title: "Code Postal", type: "string" },
    dispo_max: {
      title: "Nombre total de mesures souhaitées",
      type: "integer"
    },
    email: { default: "", title: "Adresse email", type: "string" },
    genre: {
      enum: ["F", "H"],
      enumNames: ["Femme", "Homme"],
      title: "Genre",
      type: "string"
    },
    nom: { default: "", title: "Nom", type: "string" },
    prenom: { default: "", title: "Prénom", type: "string" },
    secretariat: {
      enumNames: ["Oui", "Non"],
      title: "Secretariat",
      type: "boolean"
    },
    telephone: { default: "", title: "Téléphone", type: "string" },
    telephone_portable: {
      default: "",
      title: "Téléphone Portable",
      type: "string"
    },
    ville: { default: "", title: "Commune", type: "string" },
    zip: { title: "Informations à destination des magistrats", type: "string" }
  },
  required: ["nom", "prenom", "email", "dispo_max"],
  title: "Modifier mes informations",
  type: "object"
};

const uiSchema = {
  adresse: {
    "ui:placeholder": "Rue"
  },
  code_postal: {
    "ui:placeholder": "Code Postal"
  },

  dispo_max: {
    "ui:placeholder": "Nombre de mesures souhaitées"
  },
  email: {
    "ui:placeholder": "Adresse email"
  },
  genre: {
    "ui:placeholder": "Genre"
  },
  nb_secretariat: {
    "ui:placeholder": "Secrétariat : nombre d'ETP"
  },
  nom: {
    "ui:placeholder": "Nom"
  },
  prenom: {
    "ui:placeholder": "Prénom"
  },
  secretariat: {
    "ui:widget": "select"
  },
  telephone: {
    "ui:placeholder": "Téléphone"
  },
  telephone_portable: {
    "ui:placeholder": "Téléphone Portable"
  },
  ville: {
    "ui:placeholder": "Commune"
  },
  zip: {
    "ui:widget": "textarea"
  }
};

const EditMandataire = ({ show, handleHide, formData, onSubmit }) => {
  const cleanData = {
    adresse: formData.adresse || "",
    code_postal: formData.code_postal || "",
    dispo_max: formData.dispo_max || 0,
    email: formData.email || "",
    genre: formData.genre || "",
    nb_secretariat: formData.nb_secretariat || 0,
    nom: formData.nom || "",
    prenom: formData.prenom || "",
    secretariat: formData.secretariat || false,
    telephone: formData.telephone || "",
    telephone_portable: formData.telephone_portable || "",
    ville: formData.ville || "",
    zip: formData.zip || ""
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
  bindActionCreators({ onSubmit: ({ formData }) => updateMandataire(formData) }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ destroyOnHide: true, name: "EditMandataire" })(EditMandataire));
