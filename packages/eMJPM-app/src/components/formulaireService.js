import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.css";
import "../../static/css/hero.css";
import "../../static/css/panel.css";
import "../../static/css/footer.css";
import "../../static/css/custom.css";
import "../../node_modules/react-tabs/style/react-tabs.css";
import Form from "react-jsonschema-form";
import apiFetch from "./communComponents/Api";

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
      type: "string",
      title: "Nombre de mesures souhaitées",
      default: ""
    },
    disponibilite: {
      type: "string",
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
    modalIsOpen: false
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
        disponibilite: formData.disponibilite || 0
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
      disponibilite: this.props.currentMandataireModal.disponibilite
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
                  {this.props.currentMandataireModal.disponibilite}
                  <br />
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
