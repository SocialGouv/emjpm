import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateMandataire } from "../actions/mandataire";
import Layout from "../../communComponents/ModalLayout";
import { ErrorBox } from "../../common/ShowBox";

const schema = {
  title: "Modifier vos informations",
  type: "object",
  required: [
    "contact_nom",
    "contact_prenom",
    "telephone",
    "contact_email",
    "adresse",
    "code_postal",
    "ville",
    "dispo_max",
    "mesures_en_cours",
    "etablissement"
  ],
  properties: {
    etablissement: { type: "string", title: "Nom de l'antenne", default: "" },
    contact_nom: {
      type: "string",
      title: "Nom du contact dans l'antenne",
      default: ""
    },
    contact_prenom: {
      type: "string",
      title: "Prénom du contact dans l'antenne",
      default: ""
    },
    telephone: { type: "string", title: "Téléphone", default: "" },
    contact_email: { type: "string", title: "Adresse email de l'antenne", default: "" },
    adresse: { type: "string", title: "Rue", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    ville: { type: "string", title: "Commune", default: "" },
    dispo_max: {
      type: "integer",
      title: "Nombre de mesures souhaitées",
      default: ""
    }
  }
};

const uiSchema = {
  secretariat: {
    "ui:widget": "select"
  },
  contact_nom: {
    "ui:placeholder": "Nom"
  },

  contact_prenom: {
    "ui:placeholder": "Prénom"
  },
  genre: {
    "ui:placeholder": "Genre"
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

class EditService extends React.Component {
  onSubmitted = async ({ formData }) => {
    this.props.onSubmit({
      formData
    });
  };

  render() {
    const validate = (formData, errors) => {
      let number = 0;
      this.props.profiles.map(profile => {
        let dispo_max =
          this.props.mandataireId === profile.id ? formData.dispo_max : profile.dispo_max;
        number = number + dispo_max;
      });
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
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={this.props.formData}
          onSubmit={this.onSubmitted}
          validate={validate}
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
  bindActionCreators({ onSubmit: ({ formData }) => updateMandataire(formData) }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  state => ({
    profiles: state.mandataire.profiles,
    mandataireId: state.mandataire.mandataireId,
    service: state.mandataire.service
  }),
  mapDispatchToProps
)(connectModal({ name: "EditService", destroyOnHide: true })(EditService));
