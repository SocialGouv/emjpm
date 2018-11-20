import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";
import Cabinet from "../common/Cabinet";

const schema = {
  type: "object",
  required: ["username", "pass1", "pass2", "email"],
  properties: {
    username: { type: "string", title: "Identifiant", default: "" },
    pass1: { type: "string", title: "Mot de passe", minLength: 10 },
    pass2: { type: "string", title: "Verifier le Mot de passe", minLength: 10 },
    email: { type: "string", title: "Adresse email", default: "" },
    cabinet: { type: "string", title: "Cabinet (pour Paris)", default: "", enum: Cabinet }
  }
};

const InscriptionTis = props => <FormMandataire schema={schema} uiSchema={uiSchema} {...props} />;

export default InscriptionTis;
