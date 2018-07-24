import * as React from "react";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import { CheckCircle, XCircle } from "react-feather";

const schema = {
  type: "object",
  required: ["code_postal", "commune", "civilite", "annee", "ouverture"],
  properties: {
    ouverture: {
      type: "string"
    },
    type: {
      type: "string",
      title: "Type de mesure",
      enum: [
        "Tutelle",
        "Curatelle",
        "Sauvegarde de justice",
        "Mesure ad hoc",
        "MAJ",
        "tutelle aux biens",
        "tutelle à la personne",
        "tutelle aux biens et à la personne",
        "curatelle simple aux biens",
        "curatelle simple à la personne",
        "curatelle simple aux biens et à la personne",
        "curatelle renforcée aux biens",
        "curatelle renforcée à la personne",
        "curatelle renforcée aux biens et à la personne",
        "sauvegarde de justice",
        "sauvegarde de justice avec mandat spécial"
      ]
    },
    // residence: { type: "string", title: "Lieu de vie", enum: ["A domicile", "En établissement"] },
    code_postal: { type: "string", title: "Code Postal" },
    commune: { type: "string", title: "Commune" },
    civilite: { type: "string", title: "Genre", enum: ["F", "H"] },
    annee: { type: "integer", title: "Année de naissance", default: "" }
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
    "ui:title": "Date de décision",
    "ui:widget": "date",
    classNames: "input_mesure_ouverture",
    "ui:options": {
      label: true
    }
  },
  code_postal: {
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

class FormInputMesure extends React.Component {
  render() {
    const formData = {
      ouverture: this.props.formDataState.ouverture,
      code_postal: this.props.formDataState.code_postal,
      civilite: this.props.formDataState.civilite,
      annee: this.props.formDataState.annee,
      commune: this.props.formDataState.commune,
      type: this.props.formDataState.type
    };

    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        FieldTemplate={this.props.CustomFieldTemplate}
        formData={formData}
        onSubmit={this.props.onSubmit}
        onChange={this.props.onChange}
      >
        {this.props.children}
        <br />
        <button
          type="submit"
          className="btn btn-success"
          style={{ marginLeft: "20px" }}
          disabled={this.props.status === "loading"}
        >
          {(this.props.status === "loading" && "Création...") ||
            (this.props.status === "success" && "Valider") ||
            "Valider"}
        </button>
        <CancelButton onClick={this.props.showReplyForm} className="btn btn-dark">
          Replier ▲
        </CancelButton>
        {this.props.error && <ErrorBox message={this.props.error} />}
        {this.props.success && <SucessBox message={this.props.success} />}
      </Form>
    );
  }
}

export default FormInputMesure;
