import { format } from "date-fns";
import React from "react";
import Form from "react-jsonschema-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { connectModal } from "redux-modal";

import { Autocomplete } from "../..";
import { civilite, residence, typeMesure } from "../../common/nomination";
import Layout from "../../communComponents/ModalLayout";
import { updateMesure } from "../actions/mesures";

const schema = {
  title: "Ouvrir une nouvelle mesure",
  type: "object",
  required: ["code_postal", "ville", "civilite", "annee", "residence", "date_ouverture"],
  properties: {
    date_ouverture: {
      type: "string",
      format: "date"
    },
    type: {
      type: "string",
      enum: typeMesure
    },
    //TODO(Adrien): discus with PO
    // ti_id: { type: "number" },
    // cabinet: { type: "string", enum: cabinet },
    residence: {
      type: "string",
      enum: residence
    },
    code_postal: { type: "string" },
    ville: { type: "string" },
    civilite: { type: "string", enum: civilite },
    annee: { type: "integer", maxLength: 4 },
    numero_dossier: { type: "string", default: " " },
    numero_rg: { type: "string", title: "Numéro RG" }
  }
};

const uiSchema = {
  date_ouverture: {
    "ui:autofocus": true,
    "ui:title": "Ouverture de la mesure",
    classNames: "input_mesure_ouverture",
    "ui:options": {
      label: true
    }
  },
  code_postal: {
    "ui:placeholder": "Code Postal",
    "ui:title": "Code Postal",
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
    "ui:title": "Année de naissance",
    classNames: "input_mesure_annee"
  },
  civilite: {
    "ui:placeholder": "Genre",
    classNames: "input_mesure_civilite",
    "ui:title": "Le majeur à protéger",
    "ui:options": {
      label: true
    }
  },
  ville: {
    "ui:placeholder": "Commune",
    "ui:title": "Commune",
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
  //TODO(Adrien): discus with PO
  // ti_id: {
  //   "ui:widget": "TisOfMandataireAutoComplete",
  //   "ui:title": "Tribunal instance",
  //   "ui:placeholder": "Ti",
  //   "ui:options": {
  //     label: true
  //   }
  // },
  type: {
    "ui:placeholder": "Type de mesure",
    "ui:title": "Type de mesure",

    classNames: "input_mesure_type",
    "ui:options": {
      label: false
    }
  },
  numero_dossier: {
    "ui:autofocus": true,
    "ui:title": "Numéro de dossier",
    "ui:options": {
      label: true
    }
  },
  numero_rg: {
    "ui:placeholder": "Numéro RG",
    "ui:options": {
      label: false
    }
  }
};

const TisOfMandataireAutoComplete = ({ items, value, onChange }) => (
  <Autocomplete
    items={items}
    inputProps={{
      style: { width: 300 },
      placeholder: "Choisissez un tis ou vous êtes agrée"
    }}
    resetOnSelect={false}
    value={value}
    onSelect={obj => onChange(obj.id)}
    labelKey={"etablissement"}
  />
);

const TisOfMandataireAutoCompleteRedux = connect(state => ({
  items: state.mandataire.tis
}))(TisOfMandataireAutoComplete);

const TisOfMandataireAutoCompleteReduxWrapper = props => (
  <TisOfMandataireAutoCompleteRedux {...props} />
);

const widgets = {
  TisOfMandataireAutoComplete: TisOfMandataireAutoCompleteReduxWrapper
};

const EditMesure = ({ show, handleHide, formData, onSubmit }) => {
  // todo: we should have perfect mapping api<->data<->form
  const cleanData = {
    ...formData,
    date_ouverture: format(formData.date_ouverture, "YYYY-MM-DD"),
    annee: (formData.annee && parseInt(formData.annee)) || null,
    numero_dossier: formData.numero_dossier || ""
  };
  return (
    <Layout show={show} handleHide={handleHide}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={cleanData}
        widgets={widgets}
        onSubmit={onSubmit}
      >
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <button type="submit" className="btn btn-success" style={{ padding: "10px 30px" }}>
            Valider
          </button>
        </div>
      </Form>
    </Layout>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSubmit: ({ formData }) => updateMesure(formData) }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ name: "EditMesure", destroyOnHide: true })(EditMesure));
