import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";
import { cabinet } from "../common/nomination";

const schema = {
  type: "object",
  required: ["pass1", "pass2", "email"],
  properties: {
    email: { type: "string", format: "email", title: "Adresse email", default: "" },
    pass1: { type: "string", title: "Mot de passe", minLength: 8 },
    pass2: { type: "string", title: "Verifier le Mot de passe", minLength: 8 },
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prenom", default: "" },
    cabinet: { type: "string", title: "Cabinet", enum: cabinet, enumNames: cabinet }
  }
};

const InscriptionTis = props => <FormMandataire schema={schema} uiSchema={uiSchema} {...props} />;

export default InscriptionTis;
