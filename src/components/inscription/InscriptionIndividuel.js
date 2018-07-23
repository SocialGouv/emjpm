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
    code_postal: { type: "string", title: "Code Postal", default: "" },
    ville: { type: "string", title: "Ville", default: "" }
  }
};

const InscriptionIndividuel = props => (
  <FormMandataire schema={schema} uiSchema={uiSchema} {...props} />
);

export default InscriptionIndividuel;
