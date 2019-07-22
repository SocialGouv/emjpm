import React from "react";
import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";

const schema = {
  type: "object",
  required: ["password", "passwordConfirmation", "email"],
  properties: {
    email: { type: "string", format: "email", title: "Adresse email", default: "" },
    password: { type: "string", title: "Mot de passe", minLength: 8 },
    passwordConfirmation: { type: "string", title: "Verifier le Mot de passe", minLength: 8 },
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prenom", default: "" },
    type: {
      type: "string",
      anyOf: [
        {
          type: "string",
          title: "direction départementale",
          enum: ["direction_departementale"]
        },
        {
          type: "string",
          title: "direction régionale",
          enum: ["direction_regional"]
        },
        {
          type: "string",
          title: "direction nationale",
          enum: ["direction_nationale"]
        }
      ]
    }
  }
};

const InscriptionDirection = props => (
  <FormMandataire schema={schema} uiSchema={uiSchema} {...props} />
);

export default InscriptionDirection;
