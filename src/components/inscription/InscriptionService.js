import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";

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
    etablissement: { type: "string", title: "Nom du service", default: "" },
    nom: { type: "string", title: "Nom du contact dans le service", default: "" },
    prenom: { type: "string", title: "Prénom du contact dans le service", default: "" },
    telephone: { type: "string", title: "Téléphone du contact dans le service", default: "" },
    email: { type: "string", title: "Adresse email du contact dans le service", default: "" },
    adresse: { type: "string", title: "Rue", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    ville: { type: "string", title: "Commune", default: "" }
  }
};

const serviceUiSchema = {
  ...uiSchema,
  etablissement: {
    classNames: "I_input_form_inscription",
    "ui:placeholder": "Nom du service"
  }
};

const InscriptionService = props => (
  <FormMandataire schema={schema} uiSchema={serviceUiSchema} {...props} />
);

export default InscriptionService;
