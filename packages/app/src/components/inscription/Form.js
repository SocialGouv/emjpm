import Router from "next/router";
import React from "react";
import Modal from "react-modal";
import { isBrowser } from "../../util";
import Resolve from "../common/Resolve";
import apiFetch from "../communComponents/Api";
import InscriptionDirection from "./InscriptionDirection";
import InscriptionIndividuel from "./InscriptionIndividuel";
import InscriptionPrepose from "./InscriptionPrepose";
import InscriptionService from "./InscriptionService";
import InscriptionTi from "./InscriptionTi";
import TiSelector from "./TiSelector";

const formsMandataires = {
  individuel(props) {
    return <InscriptionIndividuel {...props} />;
  },
  prepose(props) {
    return <InscriptionPrepose {...props} />;
  },
  service(props) {
    return <InscriptionService {...props} />;
  },
  ti(props) {
    return <InscriptionTi {...props} />;
  },
  direction(props) {
    return <InscriptionDirection {...props} />;
  }
};

const FormSelector = ({ label, value, onChange }) => (
  <td>
    <label>
      <input
        style={{ marginRight: 10 }}
        type="radio"
        name="form_selector"
        value={value}
        onChange={onChange}
      />
      {label || value}
    </label>
  </td>
);

const getTis = () =>
  // only fetch client-side
  (isBrowser() &&
    apiFetch("/auth/tis", null, {
      forceLogin: false
    })) ||
  Promise.resolve();

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      typeMandataire: null,
      tis: [],
      formData: {},
      status: "idle",
      message: "",
      showModal: false,
      modalContent: "",
      errors: []
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(content) {
    this.setState({ showModal: true, modalContent: content });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  setTypeMandataire = e => {
    this.setState({ typeMandataire: e.target.value });
  };
  setTis = tis => {
    this.setState({ tis });
  };
  setFormData = formData => {
    this.setState({ formData });
  };

  submitUser = formData => {
    const url = `/auth/signup`;
    const usernameData = formData.email.toLowerCase().trim();
    apiFetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          etablissement: formData.etablissement || "",
          tis: this.state.tis,
          type: this.state.typeMandataire,
          username: usernameData,
          mesures_en_cours: formData.mesures_en_cours || 0,
          cabinet: formData.cabinet || null
        })
      },
      { apiVersion: "v2" }
    )
      .then(json => {
        if (json.success === false) {
          this.setState({ status: "error", message: json.message });
          throw new Error("Deprecated success === false response !");
        }
        Router.push("/inscription-done");
      })
      .catch(error => {
        const test = this.state.errors;
        const errorsArray = test.concat(error.errors);
        this.setState({ status: "error", message: error && errorsArray });
      });
  };

  onSubmit = ({ formData }) => {
    const hasNoTi = this.state.tis.length === 0;
    const hasSingleTi = this.state.tis.length === 1;
    const hasMultipleTi = this.state.tis.length > 1;
    const isTi = this.state.typeMandataire === "ti";
    const userType = this.state.typeMandataire;
    const isAgent = userType === "direction";
    if (hasNoTi && !isAgent) {
      this.handleOpenModal("Saisissez au moins un tribunal d'instance de référence");
    } else if (isTi && hasMultipleTi) {
      this.handleOpenModal("Saisissez un seul tribunal d'instance de référence");
    } else if ((isTi && hasSingleTi) || !hasNoTi || isAgent) {
      this.setState({ status: "loading", formData }, () => {
        this.submitUser(formData);
      });
    }
  };

  render() {
    const userType = this.state.typeMandataire;
    const isAgent = userType === "direction";
    const FormMandataire = formsMandataires[this.state.typeMandataire];
    const { modalContent, showModal } = this.state;
    return (
      <div className="container Inscription" data-cy="form-inscription">
        <div className="col-12 offset-sm-2 col-sm-8 offset-md-2 col-md-8">
          <h1 style={{ margin: 20 }}>Inscription</h1>
          <div style={{ backgroundColor: "white", padding: 25 }}>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>Vous êtes :</div>
            <table
              style={{
                margin: "20px 0",
                width: "100%",
                fontSize: "1.1em"
              }}
            >
              <tbody>
                <tr>
                  <FormSelector
                    value="individuel"
                    label="Individuel"
                    onChange={this.setTypeMandataire}
                  />
                  <FormSelector value="prepose" label="Préposé" onChange={this.setTypeMandataire} />
                  <FormSelector value="service" label="Service" onChange={this.setTypeMandataire} />
                  <FormSelector
                    value="ti"
                    label="Tribunal Instance"
                    onChange={this.setTypeMandataire}
                  />
                  <FormSelector
                    value="direction"
                    label="Agent de l'état"
                    onChange={this.setTypeMandataire}
                  />
                </tr>
              </tbody>
            </table>
            {!isAgent && userType && (
              <Resolve
                promises={[() => getTis()]}
                render={({ status, result }) => (
                  <div style={{ margin: "20px 0" }}>
                    <div style={{ fontSize: "1.2em", fontWeight: "bold", margin: "20px 0" }}>
                      Choisissez les tribunaux sur lesquels vous exercez :
                    </div>
                    {status === "success" && <TiSelector onChange={this.setTis} tis={result[0]} />}
                    {status === "error" && <div>Impossible de charger la liste des Tribunaux</div>}
                    {status === "loading" && <div>Chargement de la liste des Tribunaux...</div>}
                  </div>
                )}
              />
            )}
            {FormMandataire && (
              <FormMandataire
                typeMandataire={this.state.typeMandataire}
                onSubmit={this.onSubmit}
                formData={this.state.formData}
              />
            )}

            {this.state.status === "error" && (
              <div>
                {this.state.message.map(error => {
                  return (
                    <div
                      key={error.msg}
                      style={{ textAlign: "center", color: "red", fontSize: "1.1em" }}
                    >
                      {error.msg}
                    </div>
                  );
                })}
              </div>
            )}
            <Modal
              className="modal-alert"
              overlayClassName="modal-overlay"
              isOpen={showModal}
              contentLabel="Minimal Modal Example"
            >
              <h2>Attention</h2>
              <p>{modalContent}</p>
              <button className="close-modal" onClick={this.handleCloseModal}>
                Close Modal
              </button>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
