import fetch from "isomorphic-fetch";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import apiFetch from "../communComponents/Api";
import RowModal from "../communComponents/RowModal";
import SearchButton from "../communComponents/SearchButton";
import piwik from "../../piwik";

function validate(formData, errors) {
  if (formData.pass1 !== formData.pass2) {
    errors.pass2.addError("Mot de passe incorrect");
  }
  return errors;
}
const schema = {
  type: "object",
  required: [
    "username",
    "pass1",
    "pass2",
    "nom",
    "prenom",
    "telephone",
    "email",
    "adresse",
    "ville",
    "code_postal",
    "genre"
  ],
  properties: {
    username: {
      type: "string",
      title: "Identifiant (vous servira pour vous connecter sur E-MJPM)",
      default: ""
    },
    pass1: { type: "string", title: "Mot de passe", minLength: 10 },
    pass2: { type: "string", title: "Répéter mot de passe", minLength: 10 },
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prénom", default: "" },
    telephone: { type: "string", title: "Téléphone", default: "" },
    telephone_portable: { type: "string", title: "Téléphone Portable", default: "" },
    email: { type: "string", title: "Adresse email", default: "" },
    adresse: { type: "string", title: "Rue", default: "" },
    ville: { type: "string", title: "Ville", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    etablissement: { type: "string", title: "Nom d'Etablissements", default: "" }
  }
};

const uiSchema = {
  pass1: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "10 caractères minimum",
    "ui:widget": "password"
  },
  pass2: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "10 caractères minimum",
    "ui:widget": "password"
  },
  username: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Nom d'utilisateur"
  },
  nom: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Nom"
  },
  prenom: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Prénom"
  },
  telephone: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Téléphone"
  },
  telephone_portable: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Téléphone Portable"
  },
  email: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Adresse email"
  },
  adresse: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Rue"
  },
  code_postal: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Code Postal"
  },
  ville: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Commune"
  },
  etablissement: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Nom d'Etablissements"
  }
};

const formData = {};

class InscriptionPrepose extends React.Component {
  /*onSubmit = ({ formData }) => {


		 apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
    	Pusername:
    	Ppass1:
    	Ppass2:
       	Pnom:
        Pprenom:
        Ptelephone:
        Ptelephone_portable:
        Pemail:
        Padresse:
        Pcode_postal:
        Pville:

      })
    }).then(json => {
     //piwik
     // this.props.updateMadataire(json);
    });
	};*/

  render() {
    return (
      <div>
        <br />
        <h2 style={{ margin: 20 }}>
          Veuillez renseigner ci-dessous vos informations professionelles:
        </h2>
        <br />
        <b>
          <Form
            schema={schema}
            formData={formData}
            uiSchema={uiSchema}
            validate={validate}
            showErrorList={false}
          >
            <div style={{ textAlign: "left", paddingBottom: "10px", marginLeft: "20px" }}>
              <SearchButton type="submit">Enregistrer</SearchButton>
            </div>
          </Form>
        </b>
      </div>
    );
  }
}

export default InscriptionPrepose;
