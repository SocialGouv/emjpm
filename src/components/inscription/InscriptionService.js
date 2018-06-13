import fetch from "isomorphic-fetch";
import Form, { validateJsonSchema, mergeErrorSchema } from "react-jsonschema-form";
import styled from "styled-components";
import apiFetch from "../Api";
import RowModal from "../RowModal";
import SearchButton from "../SearchButton";
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
    "Susername",
    "Spass1",
    "Spass2",
    "Snom",
    "Sprenom",
    "Stelephone",
    "Semail",
    "Sadresse",
    "Sville",
    "Scode_postal"
  ],
  properties: {
    Susername: {
      type: "string",
      title: "Identifiant (vous servira pour vous connecter sur E-MJPM)",
      default: ""
    },
    Spass1: { type: "string", title: "Mot de passe", minLength: 10 },
    Spass2: { type: "string", title: "Répéter mot de passe", minLength: 10 },
    Snom: { type: "string", title: "Nom du contact dans le service", default: "" },
    Sprenom: { type: "string", title: "Prénom du contact dans le service", default: "" },
    Stelephone: { type: "string", title: "Téléphone du contact dans le service", default: "" },
    Semail: { type: "string", title: "Adresse email du contact dans le service", default: "" },
    Sadresse: { type: "string", title: "Rue", default: "" },
    Sville: { type: "string", title: "Commune", default: "" },
    Scode_postal: { type: "string", title: "Code Postal", default: "" }
  }
};

const uiSchema = {
  Spass1: {
    classNames: "input_form_inscription",
    "ui:placeholder": "10 caratères minimum",
    "ui:widget": "password"
  },
  Spass2: {
    classNames: "input_form_inscription",
    "ui:placeholder": "10 caratères minimum",
    "ui:widget": "password"
  },
  Susername: {
    classNames: "input_form_inscription",
    "ui:placeholder": "Identifiant"
  },
  Snom: {
    classNames: "input_form_inscription",
    "ui:placeholder": "Nom"
  },
  Sprenom: {
    classNames: "input_form_inscription",
    "ui:placeholder": "Prénom"
  },
  Stelephone: {
    classNames: "input_form_inscription",
    "ui:placeholder": "Téléphone"
  },
  Semail: {
    classNames: "input_form_inscription",
    "ui:placeholder": "Adresse email"
  },
  Sadresse: {
    classNames: "input_form_inscription",
    "ui:placeholder": "Rue"
  },
  Scode_postal: {
    classNames: "input_form_inscription",
    "ui:placeholder": "Code Postal"
  },
  Sville: {
    classNames: "input_form_inscription",
    "ui:placeholder": "Commune"
  }
};

const formData = {};

class InscriptionService extends React.Component {
  /*onSubmit = ({ formData }) => {

		 apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
    	SusernameS:
    	Spass1:
    	Spass2:
       	SnomS:
        SprenomS:
        StelephoneS:
        Stelephone_portableS:
        SemailS:
        SadresseS:
        Scode_postalS:
        SvilleS:
        
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

export default InscriptionService;
