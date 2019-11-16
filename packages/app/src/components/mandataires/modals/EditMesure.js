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
  properties: {
    annee: { maxLength: 4, type: "integer" },
    civilite: { enum: civilite, type: "string" },
    //TODO(Adrien): discus with PO
    // ti_id: { type: "number" },
    // cabinet: { type: "string", enum: cabinet },
    code_postal: { type: "string" },
    date_ouverture: {
      format: "date",
      type: "string"
    },
    numero_dossier: { default: " ", type: "string" },
    numero_rg: { title: "Numéro RG", type: "string" },
    residence: {
      enum: residence,
      type: "string"
    },
    type: {
      enum: typeMesure,
      type: "string"
    },
    ville: { type: "string" }
  },
  required: ["code_postal", "ville", "civilite", "annee", "residence", "date_ouverture"],
  title: "Ouvrir une nouvelle mesure",
  type: "object"
};

const uiSchema = {
  annee: {
    classNames: "input_mesure_annee",
    "ui:placeholder": "Année de naissance",
    "ui:title": "Année de naissance"
  },
  civilite: {
    classNames: "input_mesure_civilite",
    "ui:options": {
      label: true
    },
    "ui:placeholder": "Genre",
    "ui:title": "Le majeur à protéger"
  },
  code_postal: {
    classNames: "input_mesure_commune",
    "ui:options": {
      label: false
    },
    "ui:placeholder": "Code Postal",
    "ui:title": "Code Postal"
  },
  date_ouverture: {
    classNames: "input_mesure_ouverture",
    "ui:autofocus": true,
    "ui:options": {
      label: true
    },
    "ui:title": "Ouverture de la mesure"
  },
  etablissement: {
    "ui:options": {
      label: false
    },
    "ui:placeholder": "Etablissement"
  },
  numero_dossier: {
    "ui:autofocus": true,
    "ui:options": {
      label: true
    },
    "ui:title": "Numéro de dossier"
  },
  numero_rg: {
    "ui:options": {
      label: false
    },
    "ui:placeholder": "Numéro RG"
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
  residence: {
    classNames: "input_mesure_residence",
    "ui:options": {
      label: true
    },
    "ui:placeholder": "Lieu de vie",
    "ui:title": "Résidence du majeur à protéger"
  },
  type: {
    classNames: "input_mesure_type",
    "ui:options": {
      label: false
    },

    "ui:placeholder": "Type de mesure",
    "ui:title": "Type de mesure"
  },
  ville: {
    classNames: "input_mesure_commune",
    "ui:options": {
      label: false
    },
    "ui:placeholder": "Commune",
    "ui:title": "Commune"
  }
};

const TisOfMandataireAutoComplete = ({ items, value, onChange }) => (
  <Autocomplete
    items={items}
    inputProps={{
      placeholder: "Choisissez un tis ou vous êtes agrée",
      style: { width: 300 }
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
    annee: (formData.annee && parseInt(formData.annee)) || null,
    date_ouverture: format(formData.date_ouverture, "YYYY-MM-DD"),
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
)(connectModal({ destroyOnHide: true, name: "EditMesure" })(EditMesure));
