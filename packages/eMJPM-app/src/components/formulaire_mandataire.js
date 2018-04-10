import RowModal from "./RowModal";
import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.css";
import "../../static/css/hero.css";
import "../../static/css/panel.css";
import "../../static/css/footer.css";
import "../../static/css/custom.css";
import "../../node_modules/react-tabs/style/react-tabs.css";
import Form from "react-jsonschema-form";

const schema = {
  title: "Se connecter",
  type: "object",
  required: [],
  properties: {
    message: { type: "string", title: "message", default: "" },
    type: { type: "string", title: "type", default: "" },
    etablissement: { type: "string", title: "etablissement", default: "" },
    adresse: { type: "string", title: "adresse", default: "" },
    telephone: { type: "string", title: "telephone", default: "" },
    email: { type: "string", title: "email", default: "" },
    code_postal: { type: "string", title: "coe_postal", default: "" },
    ville: { type: "string", title: "ville", default: "" },
    dispo_max: { type: "string", title: "dispo_max", default: "" }
  }
};

const formData = {};

class FormulaireMandataire extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: ""
  };

  // componentDidMount() {
  //     const urlmesure = "http://localhost:3005/api/v1/mandataires/1";
  //     fetch(urlmesure)
  //         .then(response => response.json())
  //         .then(json => {
  //             this.setState({
  //                 datamesure: json
  //             });
  //         });
  // }
  // const url = `http://localhost:3005/api/v1/mandataires/${this.props.currentMandataireModal.id}`;

  onSubmit = ({ formData }) => {
    // const url = `http://localhost:3005/mandataires/${this.props.currentMandataireModal.id}`;

    const url = `http://localhost:3005/mandataires/1`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: formData.type,
        etablissement: formData.etablissement,
        adresse: formData.adresse,
        telephone: formData.telephone,
        email: formData.email,
        code_postal: formData.code_postal,
        ville: formData.ville,
        dispo_max: formData.dispo_max
      })
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          datamesure: json
        });
      });
  };

  openModal = mandataire => {
    this.setState({
      modalIsOpen: true,
      currentMandataireModal: this.props.currentMandataireModal
    });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    const formData = {
      type: `${this.props.currentMandataireModal.type}`,
      etablissement: `${this.props.currentMandataireModal.etabissement}`,
      adresse: `${this.props.currentMandataireModal.adresse}`,
      telephone: `${this.props.currentMandataireModal.telephone}`,
      email: `${this.props.currentMandataireModal.email}`,
      code_postal: `${this.props.currentMandataireModal.code_postal}`,
      ville: `${this.props.currentMandataireModal.ville}`,
      dispo_max: `${this.props.currentMandataireModal.dispo_max}`
    };
    console.log(this.state.datamesure);
    return (
      <div>
        {this.props.currentMandataireModal && (
          <div className="container" style={{ marginTop: "30px" }}>
            <div className="row">
              <div className="col-6">
                <div style={{ textAlign: "left" }}>
                  {this.props.currentMandataireModal.type}
                  services
                </div>
                <b style={{ textAlign: "left", fontSize: "1.5em" }}>
                  {this.props.currentMandataireModal.etablissement}
                </b>

                <RowModal value={this.props.currentMandataireModal.adresse} />
                <div style={{ textAlign: "left" }}>
                  {this.props.currentMandataireModal.code_postal}{" "}
                  {this.props.currentMandataireModale.ville}
                </div>
                <br />
                {/*<RowModal*/}
                {/*label="Contact"*/}
                {/*value={this.state.datamesure.contact}*/}
                {/*/>*/}
                <div style={{ textAlign: "left" }}>
                  {this.props.currentMandataireModal.telephone}
                </div>
                <div style={{ textAlign: "left" }}>{this.props.currentMandataireModal.email}</div>
                <br />

                {/*<RowModal*/}
                {/*label="Nombre de mesures souhaités"*/}
                {/*value={this.state.datamesure.ti}*/}
                {/*/>*/}

                {/*<RowModal*/}
                {/*label="Secrétariat"*/}
                {/*value={this.state.datamesure.ti}*/}
                {/*/>*/}

                {/*<RowModal*/}
                {/*label="Tribunal Instance"*/}
                {/*value={this.state.datamesure.ti}*/}
                {/*/>*/}
                <br />
                <div style={{ align: "center" }}>
                  <button className={"btn btn-dark"} onClick={this.openModal} />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="greenrectangleModal"
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    borderBottom: "20px",
                    lineHeight: "40px"
                  }}
                >
                  <div>
                    Mesures en cours : {this.props.currentMandataireModal.disponibilite} /{" "}
                    {this.props.currentMandataireModal.dispo_max}
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        )}

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="mandataire"
          background="#e9ecef"
          className="Modal"
          overlayClassName="Overlay"
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

export default FormulaireMandataire;
