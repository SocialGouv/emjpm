import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";

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
    "code_postal",
    "ville"
  ],
  properties: {
    username: {
      type: "string",
      default: ""
    },
    pass1: { type: "string", minLength: 10 },
    pass2: { type: "string", minLength: 10 },
    nom: { type: "string", default: "" },
    prenom: { type: "string", default: "" },
    genre: {
      type: "string",
      title: "Genre",
      enum: ["F", "H"],
      enumNames: ["Femme", "Homme"]
    },
    telephone: { type: "string", default: "" },
    telephone_portable: { type: "string", default: "" },
    email: { type: "string", default: "" },
    adresse: { type: "string", default: "" },
    code_postal: { type: "string", default: "" },
    ville: { type: "string", default: "" },
    dispo_max: { type: "integer", default: 0 }
  }
};

const InscriptionIndividuel = props => (
  <FormMandataire schema={schema} uiSchema={uiSchema} {...props} />
);

export default InscriptionIndividuel;
