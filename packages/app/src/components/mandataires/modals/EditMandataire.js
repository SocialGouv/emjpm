import React from "react";
import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { format } from "date-fns";
import { updateMandataire } from "../actions/mandataire";
import Layout from "../../communComponents/ModalLayout";
import ImportCV from "../../common/ImportCv";

const schema = {
  title: "Modifier mes informations",
  type: "object",
  required: ["nom", "prenom", "email", "dispo_max"],
  properties: {
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prénom", default: "" },
    genre: {
      type: "string",
      title: "Genre",
      enum: ["F", "H"],
      enumNames: ["Femme", "Homme"]
    },
    telephone: { type: "string", title: "Téléphone", default: "" },
    telephone_portable: {
      type: "string",
      title: "Téléphone Portable",
      default: ""
    },
    email: { type: "string", title: "Adresse email", default: "" },
    adresse: { type: "string", title: "Rue", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    ville: { type: "string", title: "Commune", default: "" },
    dispo_max: {
      type: "integer",
      title: "Nombre total de mesures souhaitées"
    },
    secretariat: {
      type: "boolean",
      title: "Secretariat",
      enumNames: ["Oui", "Non"]
    },
    zip: { type: "string", title: "Informations à destination des magistrats" }
  },
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
            secretariat: {
              enum: [true]
            },
            nb_secretariat: {
              type: "number",
              title: "Secrétariat : nombre d'ETP( Si temps partiel à 80% mettre 0.8)",
              default: ""
            }
          }
        }
      ]
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
  telephone_portable: {
    "ui:placeholder": "Téléphone Portable"
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
  },
  nb_secretariat: {
    "ui:placeholder": "Secrétariat : nombre d'ETP"
  },
  zip: {
    "ui:widget": "textarea"
  }
};

const EditMandataire = ({ show, handleHide, formData, onSubmit, currentMandataire }) => {
  const cleanData = {
    nom: formData.nom || "",
    prenom: formData.prenom || "",
    email: formData.email || "",
    zip: formData.zip || "",
    genre: formData.genre || "",
    secretariat: formData.secretariat || false,
    nb_secretariat: formData.nb_secretariat || 0,
    telephone: formData.telephone || "",
    telephone_portable: formData.telephone_portable || "",
    adresse: formData.adresse || "",
    code_postal: formData.code_postal || "",
    dispo_max: formData.dispo_max || 0,
    ville: formData.ville || ""
  };

  return (
    <Layout show={show} handleHide={handleHide} className="FicheMandataireModal">
      <Form schema={schema} uiSchema={uiSchema} formData={cleanData} onSubmit={onSubmit}>
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <div style={{ margin: "5px", textAlign: "center" }}>
            Importer votre CV:
            <ImportCV mandataire_id={currentMandataire.id} />
          </div>
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
)(connectModal({ name: "EditMandataire", destroyOnHide: true })(EditMandataire));
