import React from "react";
import Form from "react-jsonschema-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//Redux
import { connectModal } from "redux-modal";
import styled from "styled-components";

import { residence } from "../../common/nomination";
import Layout from "../../communComponents/ModalLayout";
import { updateMesureAttente } from "../actions/mesures";

const H3 = styled.h3`
  text-align: center;
`;
const Paragraphe = styled.p`
  padding-left: 20px;
`;

const schema = {
  properties: {
    code_postal: { type: "string" },
    date_ouverture: {
      format: "date",
      type: "string"
    },
    residence: {
      enum: residence,
      type: "string"
    },
    ville: { type: "string" }
  },
  required: ["date_ouverture", "code_postal", "ville", "residence"],
  type: "object"
};

const uiSchema = {
  code_postal: {
    classNames: "input_mesure_commune",
    "ui:options": {
      label: true
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
    "ui:title": "Date de décision"
  },
  residence: {
    classNames: "input_mesure_residence",
    "ui:options": {
      label: true
    },
    "ui:title": "Lieu de vie du majeur à protéger"
  },
  ville: {
    classNames: "input_mesure_commune",
    "ui:options": {
      label: true
    },
    "ui:placeholder": "Commune",
    "ui:title": "Commune"
  }
};

const ValiderMesureEnAttente = ({ show, handleHide, formData, onSubmit }) => {
  return (
    <Layout show={show} handleHide={handleHide}>
      <H3>Valider une nouvelle mesure</H3>
      <br />
      <Paragraphe>
        {" "}
        Une nouvelle mesure a été attribuée par &quot;{formData.etablissement}&quot;. <br />
        Pour activer cette mesure, veuillez saisir les informations suivantes.
      </Paragraphe>
      <Form schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={onSubmit}>
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-success"
            data-cy="validation-button"
            style={{ padding: "10px 30px" }}
          >
            Valider
          </button>
        </div>
      </Form>
    </Layout>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSubmit: ({ formData }) => updateMesureAttente(formData) }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ destroyOnHide: true, name: "ValiderMesureEnAttente" })(ValiderMesureEnAttente));
