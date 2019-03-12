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
  definitions: {
    Thing: {
      type: "object",
      properties: {
        etablissement: { type: "string", title: "Nom de l'antenne", default: "" },
        email: { type: "string", format: "email", title: "email", default: "" },
        nom: { type: "string", title: "Nom contact dans l'antenne", default: "" },
        prenom: { type: "string", title: "Prenom contact dans l'antenne", default: "" },
        telephone: { type: "string", title: "Telephone contact dans l'antenne", default: "" },
        adresse: { type: "string", title: "Adresse dans l'antenne", default: "" },
        code_postal: { type: "string", title: "Code postal contact dans l'antenne", default: "" },
        ville: { type: "string", title: "Ville dans l'antenne", default: "" },
        dispo_max: { type: "integer", title: "Nombre mesure maximum pour l'antenne", default: 0 }
      }
    }
  },
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
    dispo_max: { type: "integer", default: 0 },
    antennes: {
      type: "array",
      title: "Antennes",
      items: {
        $ref: "#/definitions/Thing"
      }
    }
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
  },
  antennes: {
    // note the "items" for an array
    items: {
      nom: {
        "ui:placeholder": "Nom"
      },
      dispo_max: {
        "ui:placeholder": "Mesures souhaitées"
      },
      prenom: {
        "ui:placeholder": "Prénom"
      },
      telephone: {
        "ui:placeholder": "ex: 0342734887",
        "ui:options": {
          inputType: "tel"
        }
      },
      email: {
        "ui:placeholder": "ex: nom.prenom@orange.fr"
      },
      adresse: {
        "ui:placeholder": "ex: 37 avenue de la république"
      },
      code_postal: {
        "ui:placeholder": "ex: 89100"
      },
      ville: {
        "ui:placeholder": "Commune"
      },
      etablissement: {
        "ui:placeholder": "Nom de l'antenne"
      }
    }
  }
};

const InscriptionService = props => (
  <FormMandataire schema={schema} uiSchema={serviceUiSchema} {...props} />
);

export default InscriptionService;
