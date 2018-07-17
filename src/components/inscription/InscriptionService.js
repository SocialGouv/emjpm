import fetch from "isomorphic-fetch";
import Form, { validateJsonSchema, mergeErrorSchema } from "react-jsonschema-form";
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
    "etablissement",
    "nom",
    "prenom",
    "telephone",
    "email",
    "adresse",
    "ville",
    "code_postal"
  ],
  properties: {
    username: {
      type: "string",
      title: "Identifiant (vous servira pour vous connecter sur E-MJPM)",
      default: ""
    },
    pass1: { type: "string", title: "Mot de passe", minLength: 10 },
    pass2: { type: "string", title: "Répéter mot de passe", minLength: 10 },
    etablissement: { type: "string", title: "Nom du service", default: "" },
    nom: { type: "string", title: "Nom du contact dans le service", default: "" },
    prenom: { type: "string", title: "Prénom du contact dans le service", default: "" },
    telephone: { type: "string", title: "Téléphone du contact dans le service", default: "" },
    email: { type: "string", title: "Adresse email du contact dans le service", default: "" },
    adresse: { type: "string", title: "Rue", default: "" },
    ville: { type: "string", title: "Commune", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    type: { type: "string", default: "service" },
    tis: { type: "array", default: "" }
  }
};

const uiSchema = {
  pass1: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "10 caratères minimum",
    "ui:widget": "password"
  },
  pass2: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "10 caratères minimum",
    "ui:widget": "password"
  },
  username: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Identifiant"
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
  etablissement: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Nom du service"
  },
  ville: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Commune"
  },
  tis: {
    classNames: "hidden_input_form_inscription"
  },
  type: {
    classNames: "hidden_input_form_inscription"
  }
};

const formData = {};

class InscriptionService extends React.Component {
  /*onSubmit = ({ formData }) => {

     apiFetch(`/mandataires/1`, {
      method: "POST",
      body: JSON.stringify({
      username:
      pass1:
      pass2:
      etablissement:
      nom:
      prenom:
      telephone:
      telephone_portable:
      email:
      adresse:
      code_postal:
      ville:

      })
    }).then(json => {
     piwik.push(["trackEvent", "Inscription", "Services"]);
     // this.props.updateMadataire(json);
    });
  };*/

  render() {
    return (
      <div>
        <h2 style={{ margin: "0px 20px 20px 20px" }}>
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

export default InscriptionService;
