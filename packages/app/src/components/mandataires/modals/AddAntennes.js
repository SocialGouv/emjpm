import React from "react";
import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Layout from "../../communComponents/ModalLayout";
import { addAntennesToMandataires } from "../actions/mandataire";
import Resolve from "../../common/Resolve";
import TiSelector from "../../inscription/TiSelector";
import apiFetch from "../../communComponents/Api";

const schema = {
  title: "Ajouter une antenne",
  type: "object",
  required: [
    "etablissement",
    "contact_nom",
    "contact_prenom",
    "telephone",
    "contact_email",
    "adresse",
    "code_postal",
    "ville"
  ],
  properties: {
    etablissement: { type: "string", title: "Nom de l'antenne", default: "" },
    contact_email: { type: "string", format: "email", title: "email", default: "" },
    contact_nom: { type: "string", title: "Nom contact dans l'antenne", default: "" },
    contact_prenom: { type: "string", title: "Prenom contact dans l'antenne", default: "" },
    telephone: { type: "string", title: "Telephone contact dans l'antenne", default: "" },
    adresse: { type: "string", title: "Adresse dans l'antenne", default: "" },
    code_postal: { type: "string", title: "Code postal contact dans l'antenne", default: "" },
    ville: { type: "string", title: "Ville dans l'antenne", default: "" },
    dispo_max: { type: "integer", title: "Nombre mesure maximum pour l'antenne", default: 0 }
  }
};

const uiSchema = {
  contact_nom: {
    "ui:placeholder": "Nom"
  },
  contact_prenom: {
    "ui:placeholder": "Prénom"
  },
  telephone: {
    "ui:placeholder": "Téléphone"
  },
  contact_email: {
    "ui:placeholder": "Adresse email"
  },
  adresse: {
    "ui:placeholder": "Rue"
  },
  code_postal: {
    "ui:placeholder": "Code Postal"
  },
  ville: {
    "ui:placeholder": "Commune"
  },
  dispo_max: {
    "ui:placeholder": "Nombre de mesures souhaitées"
  }
};

const getTis = () =>
  apiFetch("/inscription/tis", null, {
    forceLogin: false,
    apiVersion: "v1"
  }) || Promise.resolve();

class AddAntennes extends React.Component {
  state = {
    tis: [],
    formData: {},
    status: "idle"
  };

  setTis = tis => {
    this.setState({ tis });
  };

  onSubmitted = async ({ formData }) => {
    this.props.onSubmit({
      formData
    });
  };

  render() {
    const cleanData = {
      ...this.props.formData,
      service_id: this.props.service.id,
      tis: this.state.tis
    };

    const validate = (formData, errors) => {
      let number = 0;
      this.props.profiles.map(profile => {
        number = number + profile.dispo_max;
      });
      number = number + formData.dispo_max;
      if (number > this.props.service.dispo_max) {
        errors.dispo_max.addError(
          "Vous ne pouvez pas dépasser votre nombre total de mesures souhaitées de votre service"
        );
      }
      return errors;
    };

    return (
      <Layout
        show={this.props.show}
        handleHide={this.props.handleHide}
        className="FicheMandataireModal"
      >
        <div style={{ backgroundColor: "white", padding: 25 }}>
          <Resolve
            promises={[() => getTis()]}
            render={({ status, result }) => (
              <div style={{ margin: "20px 0" }}>
                <div style={{ fontSize: "1.2em", fontWeight: "bold", margin: "20px 0" }}>
                  Choisissez les tribunaux sur lesquels votre antenne exerce :
                </div>
                {status === "success" && <TiSelector onChange={this.setTis} tis={result[0]} />}
                {status === "error" && <div>Impossible de charger la liste des Tribunaux</div>}
                {status === "loading" && <div>Chargement de la liste des Tribunaux...</div>}
              </div>
            )}
          />
        </div>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={cleanData}
          validate={validate}
          onSubmit={this.onSubmitted}
          showErrorList={false}
        >
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <button type="submit" className="btn btn-success" style={{ padding: "10px 30px" }}>
              Valider
            </button>
          </div>
        </Form>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSubmit: ({ formData }) => addAntennesToMandataires(formData) }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  state => ({
    service: state.mandataire.service,
    profiles: state.mandataire.profiles
  }),
  mapDispatchToProps
)(connectModal({ name: "AddAntennes", destroyOnHide: true })(AddAntennes));
