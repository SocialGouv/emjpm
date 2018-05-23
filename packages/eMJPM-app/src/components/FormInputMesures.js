import Form from "react-jsonschema-form";
import styled from "styled-components";

const schema = {
  title: "Ouvrir une nouvelle mesure",
  type: "object",
  required: ["codePostal", "commune", "civilite", "annee", "residence", "ouverture"],
  properties: {
    ouverture: {
      type: "string",
      title: "Date d'ordonnance"
    },
    type: {
      type: "string",
      title: "Type de mesure",
      enum: ["Tutelle", "Curatelle", "Sauvegarde de justice", "Mesure ad hoc", "MAJ"]
    },
    residence: { type: "string", title: "Lieu de vie", enum: ["A domicile", "En établissement"] },
    codePostal: { type: "string", title: "Code Postal" },
    commune: { type: "string", title: "Commune" },
    civilite: { type: "string", title: "Genre", enum: ["F", "H"] },
    annee: { type: "integer", title: "Année de naissance", default: "" }
  }
};

const uiSchema = {
  ouverture: {
    "ui:autofocus": true,
    "ui:title": "Ouverture de la mesure",
    "ui:widget": "date",
    classNames: "input_mesure_ouverture",
    "ui:options": {
      label: true
    }
  },
  codePostal: {
    "ui:placeholder": "Code Postal",
    classNames: "input_mesure_commune",
    "ui:options": {
      label: false
    }
  },
  etablissement: {
    "ui:placeholder": "Etablissement",
    "ui:options": {
      label: false
    }
  },
  annee: {
    "ui:placeholder": "Année de naissance",

    classNames: "input_mesure_annee",
    "ui:widget": "updown",
    "ui:options": {
      label: false
    }
  },
  civilite: {
    "ui:placeholder": "Genre",
    classNames: "input_mesure_civilite",

    "ui:title": "Le majeur à protéger",
    "ui:options": {
      label: true
    }
  },
  commune: {
    "ui:placeholder": "Commune",
    classNames: "input_mesure_commune",
    "ui:options": {
      label: false
    }
  },
  residence: {
    "ui:placeholder": "Lieu de vie",
    "ui:title": "Résidence du majeur à protéger",
    classNames: "input_mesure_residence",
    "ui:options": {
      label: true
    }
  },
  type: {
    "ui:placeholder": "Type de mesure",
    classNames: "input_mesure_type",
    "ui:options": {
      label: false
    }
  }
};

const CancelButton = styled.button`
  cursor: pointer;
  margin-left: 10px;
`;

const ErrorBox = ({ message }) =>
  (message && (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  )) ||
  null;

const FormInputMesure = ({
  CustomFieldTemplate,
  formData,
  onSubmit,
  showReplyForm,
  error,
  status
}) => (
  <Form
    schema={schema}
    uiSchema={uiSchema}
    FieldTemplate={CustomFieldTemplate}
    formData={formData}
    onSubmit={onSubmit}
  >
    <br />
    <button
      type="submit"
      className="btn btn-success"
      disabled={status === "loading" || status === "success"}
    >
      {(status === "loading" && "Création...") || (status === "success" && "Valider") || "Valider"}
    </button>
    <CancelButton onClick={showReplyForm} className="btn btn-link">
      Annuler
    </CancelButton>
    <ErrorBox message={error} />
  </Form>
);

export default FormInputMesure;
