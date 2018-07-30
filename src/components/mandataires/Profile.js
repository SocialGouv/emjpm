import * as React from "react";
import Modal from "react-modal";
import Form from "react-jsonschema-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";

import apiFetch from "../communComponents/Api";
import piwik from "../../piwik";

import CreationEtablissement from "./CreationEtablissement";
import AddTisToFormulaireMandataire from "./AddTisToFormulaireMandataire";

import { updateProfile } from "./actions/mandataire";

const schema = {
  title: "Modifier vos informations",
  type: "object",
  required: [],
  properties: {
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prénom", default: "" },
    genre: { type: "string", title: "Genre", enum: ["Femme", "Homme"] },
    telephone: { type: "string", title: "Téléphone", default: "" },
    telephone_portable: {
      type: "string",
      title: "Téléphone Portable",
      default: ""
    },
    email: { type: "string", title: "Adresse email", default: "" },
    adresse: { type: "string", title: "Rue", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    ville: { type: "string", title: "Commune", default: "" },
    dispo_max: {
      type: "integer",
      title: "Nombre de mesures souhaitées",
      default: ""
    },
    secretariat: { type: "boolean", title: "Secretariat", enumNames: ["Oui", "Non"] },
    nb_secretariat: {
      type: "number",
      title: "Secrétariat : nombre d'ETP( Si temps partiel à 80% mettre 0.8)",
      default: ""
    }
  }
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const uiSchema = {
  secretariat: {
    "ui:widget": "select"
  },
  nom: {
    "ui:placeholder": "Nom"
  },

  prenom: {
    "ui:placeholder": "Prénom"
  },
  genre: {
    "ui:placeholder": "Genre"
  },
  telephone: {
    "ui:placeholder": "Téléphone"
  },
  telephone_portable: {
    "ui:placeholder": "Téléphone Portable"
  },
  email: {
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
  },
  nb_secretariat: {
    "ui:placeholder": "Secrétariat : nombre d'ETP"
  }
};

const Container = ({ children }) => <div className="container">{children}</div>;
const Row = ({ children }) => <div className="row">{children}</div>;
const Col6 = ({ children }) => <div className="col-6">{children}</div>;
const Stylediv = styled.div`
  text-align: left;
`;

const FormulaireMandataireView = ({
  onClick,
  onSubmit,
  currentMandataire,
  isOpen,
  onRequestClose,
  closebuttonmodal,
  formData,
  updateEtablissement,
  etablissement,
  mandataireEtablissement,
  deleteEtablissement,
  tis,
  updateTi,
  tisByMandataire,
  deleteTi
}) => (
  <Container>
    {currentMandataire && (
      <Container>
        <Row>
          <Col6>
            <Stylediv>
              <b>
                {formData.prenom} {formData.nom}
              </b>
              <br />
              <b>Contact</b>
              <br />
              <div data-cy="fiche-manda-nom-prenom">
                {formData.prenom} {formData.nom}
                <br />
                {formData.genre}
              </div>
              <div data-cy="fiche-manda-email">{formData.email}</div>
              <div data-cy="fiche-manda-telephone">{formData.telephone}</div>
              <div data-cy="fiche-manda-telephone-portable">{formData.telephone_portable}</div>
              <br />
              <b> Adresse</b>
              <br />
              <div data-cy="fiche-manda-adresse">{formData.adresse}</div>
              <div data-cy="fiche-manda-code-postal">{formData.code_postal} </div>
              <div data-cy="fiche-manda-ville">{formData.ville}</div>
              <br />
              <b> Nombre de mesures souhaitées</b>
              <br />
              <div data-cy="fiche-manda-dispo-max">{formData.dispo_max}</div>
              <br />
              <b> Secrétariat</b>
              <br />
              <div data-cy="fiche-manda-secretariat">
                {formData.secretariat === true ? "Oui" : "Non"} - {formData.nb_secretariat} <br />
              </div>
              <br />
              {mandataireEtablissement &&
                currentMandataire.type === "Prepose" && (
                  <React.Fragment>
                    <div>
                      <b>Etablissement(s) </b>
                      <br />
                      {currentMandataire.type === "Prepose" && (
                        <CreationEtablissement
                          updateEtablissement={updateEtablissement}
                          etablissements={etablissement}
                        />
                      )}
                      <br />
                    </div>
                    {mandataireEtablissement.map(etablissement => (
                      <div>
                        {etablissement.nom}
                        <br />
                        <a href="#" onClick={() => deleteEtablissement(etablissement.id)}>
                          Supprimer
                        </a>
                      </div>
                    ))}
                  </React.Fragment>
                )}
              <br />
              {tisByMandataire && (
                <React.Fragment>
                  <div>
                    <b>Tribunaux d'instance où je suis agréé </b>
                    <br />
                    <AddTisToFormulaireMandataire tis={tis} updateTi={updateTi} />
                  </div>
                  {tisByMandataire.map(tiByMandataire => (
                    <div key={tiByMandataire.id}>
                      {tiByMandataire.etablissement}
                      <br />
                      <a href="#" onClick={() => deleteTi(tiByMandataire.id)}>
                        Supprimer
                      </a>
                    </div>
                  ))}
                </React.Fragment>
              )}

              <br />
              <button
                className={"btn btn-dark"}
                onClick={onClick}
                data-cy="fiche-manda-button-modifier"
              >
                Modifier mes informations
              </button>
            </Stylediv>
          </Col6>
        </Row>
      </Container>
    )}
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="mandataire"
      background="#e9ecef"
      style={customStyles}
      className="ModalInformation"
      overlayClassName="OverlayInput"
    >
      <button onClick={closebuttonmodal}>X</button>
      <Form schema={schema} formData={formData} uiSchema={uiSchema} onSubmit={onSubmit}>
        <div style={{ textAlign: "left", paddingBottom: "10px", marginLeft: "20px" }}>
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
        </div>
      </Form>
    </Modal>
  </Container>
);

class FormulaireMandataire extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: "",
    modalIsOpen: false,
    etablissement: "",
    mandataireEtablissement: "",
    tis: "",
    tisByMandataire: ""
  };

  componentDidMount() {
    apiFetch("/mandataires/1/etablissements").then(finess => {
      apiFetch("/mandataires/1/etablissement").then(mandataireEtablissement => {
        apiFetch("/mandataires/tis").then(tis => {
          apiFetch("/mandataires/1/tis")
            .then(tisByMandataire => {
              this.setState({
                etablissement: finess,
                mandataireEtablissement: mandataireEtablissement,
                tis: tis,
                tisByMandataire: tisByMandataire
              });
            })
            .catch(e => {
              console.log(e);
            });
        });
      });
    });
  }

  onSubmit = ({ formData }) => {
    apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
        nom: formData.nom || "",
        prenom: formData.prenom || "",
        genre: formData.genre || "",
        telephone: formData.telephone || "",
        telephone_portable: formData.telephone_portable || "",
        email: formData.email || "",
        adresse: formData.adresse || "",
        code_postal: formData.code_postal || "",
        ville: formData.ville || "",
        dispo_max: formData.dispo_max || 0,
        secretariat: formData.secretariat,
        nb_secretariat: formData.nb_secretariat || 0
      })
    }).then(json => {
      if (formData.dispo_max !== this.props.currentMandataireModal.dispo_max) {
        piwik.push([
          "trackEvent",
          "mesures",
          "Modification du nombre de mesures souhaitées par un mandataire"
        ]);
      }
      this.props.updateMandataire(json);
    });
    this.closeModal();
  };

  deleteEtablissement = etablissement_id => {
    apiFetch(`/mandataires/1/etablissements/${etablissement_id}`, {
      method: "DELETE"
    }).then(json => {
      this.updateEtablissement(json);
    });
  };

  deleteTi = ti_id => {
    apiFetch(`/mandataires/1/tis/${ti_id}`, {
      method: "DELETE"
    }).then(json => {
      this.updateTi(json);
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  updateEtablissement = etablissement => {
    this.setState({ mandataireEtablissement: etablissement });
  };
  updateTi = ti => {
    this.setState({ tisByMandataire: ti });
  };

  render() {
    const formData = this.props.currentMandataire;
    return (
      <div>
        <FormulaireMandataireView
          currentMandataire={this.props.currentMandataire}
          onClick={this.openModal}
          onSubmit={this.onSubmit}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          closebuttonmodal={this.closeModal}
          formData={formData}
          updateEtablissement={this.updateEtablissement}
          etablissement={this.state.etablissement}
          mandataireEtablissement={this.state.mandataireEtablissement}
          deleteEtablissement={this.deleteEtablissement}
          tis={this.state.tis}
          updateTi={this.updateTi}
          tisByMandataire={this.state.tisByMandataire}
          deleteTi={this.deleteTi}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ updateMandataire: data => updateProfile(data) }, dispatch);

const FormulaireMandataireRedux = connect(
  state => ({
    currentMandataire: state.mandataire.profile
  }),
  mapDispatchToProps
)(FormulaireMandataire);

export default FormulaireMandataireRedux;
