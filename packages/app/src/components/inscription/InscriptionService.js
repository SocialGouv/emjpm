import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";

const schema = {
  type: "object",
  required: [
    "pass1",
    "pass2",
    "etablissement",
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
    pass1: { type: "string", minLength: 8 },
    pass2: { type: "string", minLength: 8 },
    etablissement: { type: "string", default: "" },
    nom: { type: "string", default: "" },
    prenom: { type: "string", default: "" },
    telephone: { type: "string", default: "" },
    adresse: { type: "string", default: "" },
    code_postal: { type: "string", default: "" },
    ville: { type: "string", default: "" },
    dispo_max: { type: "integer", default: 0 }
  }
};

// utiliy to add labels to some fields
const serviceFields = ["nom", "prenom", "telephone", "email"];
const serviceFieldsUiSchema = serviceFields.reduce(
  (schema, field) => ({
    ...schema,
    [field]: {
      ...uiSchema[field],
      "ui:title": uiSchema[field]["ui:title"] + " du contact dans le service"
    }
  }),
  {}
);

// build custom ui schema
const serviceUiSchema = {
  ...uiSchema,
  ...serviceFieldsUiSchema,
  etablissement: {
    ...uiSchema.etablissement,
    "ui:title": "Nom du service",
    "ui:placeholder": "ex: CHU de Nanterre"
  }
};

const InscriptionService = props => (
  <FormMandataire schema={schema} uiSchema={serviceUiSchema} {...props} />
);

export default InscriptionService;
