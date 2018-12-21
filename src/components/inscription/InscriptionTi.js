import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";
import { cabinet } from "../common/nomination";

const schema = {
  type: "object",
  required: ["username", "pass1", "pass2", "email"],
  properties: {
    username: { type: "string", title: "Identifiant", default: "" },
    pass1: { type: "string", title: "Mot de passe" },
    pass2: { type: "string", title: "Verifier le Mot de passe" },
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prenom", default: "" },
    email: { type: "string", title: "Adresse email", default: "" },
    cabinet: { type: "string", title: "Cabinet (pour Paris)", default: "", enum: cabinet }
  }
};

const InscriptionTis = props => <FormMandataire schema={schema} uiSchema={uiSchema} {...props} />;

export default InscriptionTis;
