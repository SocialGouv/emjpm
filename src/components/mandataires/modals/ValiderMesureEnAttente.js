import Form from "react-jsonschema-form";
import styled from "styled-components";

//Redux
import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Layout from "./Layout";
import { updateMesureAttente } from "../actions/mesures";

const H3 = styled.h3`
  text-align: center;
`;
const Paragraphe = styled.p`
  padding-left: 20px;
`;

const schema = {
  type: "object",
  required: ["date_ouverture", "code_postal", "ville", "residence"],
  properties: {
    date_ouverture: {
      type: "string",
      format: "date"
    },
    residence: {
      type: "string",
      enum: ["A domicile", "En établissement"]
    },
    code_postal: { type: "string" },
    ville: { type: "string" }
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
      label: true
    }
  },
  ville: {
    "ui:placeholder": "Commune",
    "ui:title": "Commune",
    classNames: "input_mesure_commune",
    "ui:options": {
      label: true
    }
  },
  residence: {
    "ui:placeholder": "Lieu de vie",
    "ui:title": "Résidence du majeur à protéger",
    classNames: "input_mesure_residence",
    "ui:options": {
      label: true
    }
  }
};

const ValiderMesureEnAttente = ({ show, handleHide, formData, onSubmit, ...props }) => {
  return (
    <Layout show={show} handleHide={handleHide}>
      <H3>Valider une nouvelle mesure</H3>
      <br />
      <Paragraphe>
        {" "}
        Une nouvelle mesure a été attribuée par "{formData.etablissement}". <br />
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
)(connectModal({ name: "ValiderMesureEnAttente", destroyOnHide: true })(ValiderMesureEnAttente));
