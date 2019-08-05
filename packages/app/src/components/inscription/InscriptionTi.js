import React from "react";
import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";
import { cabinet } from "../common/nomination";

const schema = {
  type: "object",
  required: ["password", "passwordConfirmation", "email"],
  properties: {
    email: { type: "string", format: "email", title: "Adresse email", default: "" },
    password: { type: "string", title: "Mot de passe", minLength: 8 },
    passwordConfirmation: { type: "string", title: "Verifier le Mot de passe", minLength: 8 },
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prenom", default: "" },
    cabinet: { type: "string", title: "Cabinet", enum: cabinet, enumNames: cabinet }
  }
};

const InscriptionTis = props => <FormMandataire schema={schema} uiSchema={uiSchema} {...props} />;

export default InscriptionTis;
