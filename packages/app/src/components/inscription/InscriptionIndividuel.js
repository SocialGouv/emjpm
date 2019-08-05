import React from "react";
import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";

const schema = {
  type: "object",
  required: [
    "password",
    "passwordConfirmation",
    "nom",
    "prenom",
    "telephone",
    "email",
    "adresse",
    "code_postal",
    "ville",
    "dispo_max"
  ],
  properties: {
    email: { type: "string", format: "email", default: "" },
    password: { type: "string", minLength: 8 },
    passwordConfirmation: { type: "string", minLength: 8 },
    nom: { type: "string", default: "" },
    prenom: { type: "string", default: "" },
    genre: {
      type: "string",
      title: "Genre",
      enum: ["F", "H"],
      enumNames: ["Femme", "Homme"]
    },
    telephone: { type: "string", default: "", pattern: "^\\d{10}$" },
    telephone_portable: { type: "string", default: "", pattern: "^\\d{10}$" },

    adresse: { type: "string", default: "" },
    code_postal: {
      default: "",
      pattern: "^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$",
      type: "string"
    },
    ville: { type: "string", default: "" },
    dispo_max: { type: "integer", default: 0 }
  }
};

function transformErrors(errors) {
  return errors.map(error => {
    if (error.name === "pattern")
      switch (error.property) {
        case ".telephone":
        case ".telephone_portable":
          error.message = "Numéro de téléphone invalide";
          break;

        case ".code_postal":
          error.message = "Code postal non valide";
          break;
        default:
          break;
      }
    return error;
  });
}

const InscriptionIndividuel = props => (
  <FormMandataire
    schema={schema}
    uiSchema={uiSchema}
    transformErrors={transformErrors}
    {...props}
  />
);

export default InscriptionIndividuel;
