import Modal from "react-modal";
import * as React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../../static/css/hero.css";
import "../../static/css/panel.css";
import "../../static/css/footer.css";
import "../../static/css/custom.css";
import "../../node_modules/react-tabs/style/react-tabs.css";
import Form from "react-jsonschema-form";
import apiFetch from "./communComponents/Api";
import AddTisToFormulaireMandataire from "./AddTisToFormulaireMandataire";

const schema = {
  title: "Modifier vos informations",
  type: "object",
  required: [],
  properties: {
    etablissement: { type: "string", title: "Etablissement", default: "" },
    adresse: { type: "string", title: "Rue", default: "" },
    code_postal: { type: "string", title: "Code Postal", default: "" },
    ville: { type: "string", title: "Commune", default: "" },
    telephone: { type: "string", title: "Téléphone", default: "" },
    telephone_portable: {
      type: "string",
      title: "Téléphone Portable",
      default: ""
    },
    email: { type: "string", title: "Adresse email", default: "" },
    dispo_max: {
      type: "integer",
      title: "Nombre de mesures souhaitées",
      default: ""
    },
    mesures_en_cours: {
      type: "integer",
      title: "Nombre de mesures",
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

class FormulaireService extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: "",
    modalIsOpen: false,
    tis: "",
    tisByMandataire: ""
  };

  componentDidMount() {
    apiFetch("/mandataires/tis").then(tis => {
      apiFetch("/mandataires/1/tis")
        .then(tisByMandataire => {
          this.setState({
            tis: tis,
            tisByMandataire: tisByMandataire
          });
        })
        .catch(e => {
          console.log(e);
        });
    });
  }

  deleteTi = ti_id => {
    apiFetch(`/mandataires/1/tis/${ti_id}`, {
      method: "DELETE"
    }).then(json => {
      this.updateTi(json);
    });
  };

  onSubmit = ({ formData }) => {
    apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
        etablissement: formData.etablissement || "",
        telephone: formData.telephone || "",
        telephone_portable: formData.telephone_portable || "",
        email: formData.email || "",
        adresse: formData.adresse || "",
        code_postal: formData.code_postal || "",
        ville: formData.ville || "",
        dispo_max: formData.dispo_max || 0,
        mesures_en_cours: formData.mesures_en_cours || 0
      })
    }).then(json => {
      this.props.updateMadataire(json);
    });
    this.closeModal();
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  updateTi = tisByMandataire => {
    this.setState({ tisByMandataire: tisByMandataire });
  };
  render() {
    const formData = {
      etablissement: this.props.currentMandataireModal.etablissement,
      telephone: this.props.currentMandataireModal.telephone,
      telephone_portable: this.props.currentMandataireModal.telephone_portable,
      ville: this.props.currentMandataireModal.ville,
      adresse: this.props.currentMandataireModal.adresse,
      email: this.props.currentMandataireModal.email,
      code_postal: this.props.currentMandataireModal.code_postal,
      dispo_max: this.props.currentMandataireModal.dispo_max,
      mesures_en_cours: this.props.currentMandataireModal.mesures_en_cours
    };
    return (
      <div>
        {this.props.currentMandataireModal && (
          <div className="container" style={{ marginTop: "30px" }}>
            <div className="row">
              <div className="col-6">
                <div style={{ textAlign: "left" }}>
                  <b>{this.props.currentMandataireModal.etablissement} </b>
                  <br />
                  <b> Adresse</b>
                  <br />
                  {this.props.currentMandataireModal.adresse}
                  <br />
                  {this.props.currentMandataireModal.code_postal} <br />
                  {this.props.currentMandataireModal.ville}
                  <br />
                  <br />
                  <b>Contact</b>
                  <br />
                  {this.props.currentMandataireModal.prenom} {this.props.currentMandataireModal.nom}
                  <br />
                  {this.props.currentMandataireModal.telephone}
                  <br />
                  {this.props.currentMandataireModal.telephone_portable}
                  <br />
                  <b> Nombre de mesures souhaitées</b>
                  <br />
                  {this.props.currentMandataireModal.dispo_max}
                  <br />
                  <br />
                  <b> Mesures en cours </b>
                  <br />
                  {this.props.currentMandataireModal.mesures_en_cours}
                  <br />
                  <AddTisToFormulaireMandataire tis={this.state.tis} updateTi={this.updateTi} />
                  {this.state.tisByMandataire && (
                    <React.Fragment>
                      <div>
                        <b>Tis </b>
                        <br />
                      </div>
                      {this.state.tisByMandataire.map(tiByMandataire => (
                        <div>
                          {tiByMandataire.etablissement}
                          <br />
                          <a href="#" onClick={() => this.deleteTi(tiByMandataire.id)}>
                            Supprimer
                          </a>
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                  <button className={"btn btn-dark"} onClick={this.openModal}>
                    Modifier mes informations
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="mandataire"
          background="#e9ecef"
          style={customStyles}
          className="ModalInformation"
          overlayClassName="OverlayInput"
        >
          <Form schema={schema} formData={formData} onSubmit={this.onSubmit}>
            <div style={{ textAlign: "left", paddingBottom: "10px" }}>
              <button type="submit" className="btn btn-success">
                Enregistrer
              </button>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default FormulaireService;
