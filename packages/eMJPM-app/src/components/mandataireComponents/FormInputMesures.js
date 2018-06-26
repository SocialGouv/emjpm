import Form from "react-jsonschema-form";
import styled from "styled-components";
import { CheckCircle, XCircle } from "react-feather";

const schema = {
  title: "Ouvrir une nouvelle mesure",
  type: "object",
  required: ["codePostal", "commune", "civilite", "annee", "residence", "ouverture"],
  properties: {
    ouverture: {
      type: "string"
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
  margin-left: 20px;
`;

const Alert = ({ className, Icon, message }) =>
  (message && (
    <div
      className={`alert ${className || ""}`}
      role="alert"
      style={{ marginTop: 20, marginLeft: 20, fontSize: "1.2em" }}
    >
      <Icon
        style={{
          verticalAlign: "middle",
          marginRight: 10
        }}
      />{" "}
      {message}
    </div>
  )) ||
  null;

const ErrorBox = ({ message }) => (
  <Alert className="alert-danger" Icon={XCircle} message={message} />
);

const SucessBox = ({ message }) => (
  <Alert className="alert-success" Icon={CheckCircle} message={message} />
);

const FormInputMesure = ({
  CustomFieldTemplate,
  formData,
  onSubmit,
  showReplyForm,
  error,
  status,
  success
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
      style={{ marginLeft: "20px" }}
      disabled={status === "loading"}
    >
      {(status === "loading" && "Création...") || (status === "success" && "Valider") || "Valider"}
    </button>
    <CancelButton onClick={showReplyForm} className="btn btn-dark">
      Replier ▲
    </CancelButton>
    {error && <ErrorBox message={error} />}
    {success && <SucessBox message={success} />}
  </Form>
);

export default FormInputMesure;
