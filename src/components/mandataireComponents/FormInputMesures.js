import * as React from "react";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import { CheckCircle, XCircle } from "react-feather";
import ReactAutocomplete from "react-autocomplete";

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
    // residence: { type: "string", title: "Lieu de vie", enum: ["A domicile", "En établissement"] },
    codePostal: { type: "string", title: "Code Postal" },
    commune: { type: "string", title: "Commune" },
    civilite: { type: "string", title: "Genre", enum: ["F", "H"] },
    annee: { type: "integer", title: "Année de naissance", default: "" },
    // residence: {
    //   type: "string",
    //   enum: ["A domicile", "En établissement"],
    //   default: "Lieu de vie"
    // }
  }
  // dependencies: {
  //   residence: {
  //     oneOf: [
  //       {
  //         properties: {
  //           residence: {
  //             enum: ["A domicile"]
  //           }
  //         }
  //       },
  //       {
  //         properties: {
  //           residence: {
  //             enum: ["En établissement"]
  //           },
  //           Etablissement: {
  //             type: "number"
  //           }
  //         }
  //       }
  //     ]
  //   }
  // }
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
  // residence: {
  //   "ui:placeholder": "Lieu de vie",
  //   "ui:title": "Résidence du majeur à protéger",
  //   classNames: "input_mesure_residence",
  //   "ui:options": {
  //     label: true
  //   }
  // },
  "ui:field": "Etablissement",
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
  onSubmit,
  showReplyForm,
  error,
  formData,
  status,
  success,
  value,
  lieuxDeVie,
  updateValue,
  updateLieuxDeVie,
                             etablissement
}) => (
  <Form
    schema={schema}
    uiSchema={uiSchema}
    FieldTemplate={CustomFieldTemplate}
    formData={formData}
    onSubmit={onSubmit}
  >
    <h6>Résidence </h6>

    <div
      className="custom-control custom-radio custom-control-inline"
      style={{ marginLeft: "20px" }}
    >
      <label style={{ cursor: "pointer", width: "60px" }} htmlFor="customRadioInline1">
        <input
          data-cy="tab-individuel"
          type="radio"
          id="customRadioInline1"
          name="customRadioInline"
          style={{ margin: "5px" }}
          label="A Domicile"
          value="A Domicile"
          onClick={e => updateLieuxDeVie({ lieuxDeVie: e.target.value })}
        />A Domicile
      </label>
    </div>
    <div className="custom-control custom-radio custom-control-inline">
      <label style={{ cursor: "pointer", width: "60px" }} htmlFor="customRadioInline2">
        <input
          data-cy="tab-prepose"
          type="radio"
          id="customRadioInline2"
          name="customRadioInline"
          style={{ margin: "5px" }}
          label="En Etablissement"
          value="En Etablissement"
          onClick={e => updateLieuxDeVie({ lieuxDeVie: e.target.value })}
        />En Etablissement
      </label>

    </div>
      <br />
      { lieuxDeVie === "En Etablissement" &&(
      <React.Fragment>
          <h6> Choisisser votre établissement</h6>
          <ReactAutocomplete
          items={etablissement}
          shouldItemRender={(item, value) =>
              item.nom.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          getItemValue={item => item.nom}
          renderItem={(item, highlighted) => (
              <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
              >
                  {item.nom}
              </div>
          )}
          value={ value}
          onChange={e => updateValue({ value: e.target.value })}
          onSelect={(a, b) => updateValue({ value: a, valueId: b.id })}
      />
      </React.Fragment>)
      }
      <br />
      <br />

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
