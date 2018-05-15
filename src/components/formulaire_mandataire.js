import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import apiFetch from "./Api";
import RowModal from "./RowModal";

const schema = {
  title: "Modifier vos informations",
  type: "object",
  required: [],
  properties: {
    nom: { type: "string", title: "Nom", default: "" },
    prenom: { type: "string", title: "Prénom", default: "" },
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
      type: "string",
      title: "Nombre de mesures souhaitées",
      default: ""
    },
    secretariat: { type: "boolean", title: "Secretariat", enumNames: ["Oui", "Non"] },
    nb_secretariat: { type: "string", title: "Secrétariat : nombre d'ETP", default: "" }
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

const formData = {};

const Container = ({ children }) => <div className="container">{children}</div>;
const Row = ({ children }) => <div className="row">{children}</div>;
const Col6 = ({ children }) => <div className="col-6">{children}</div>;
const Stylediv = styled.div`
  text-align: left;
`;

const FormulaireMandataireView = ({
  nom,
  prenom,
  telephone,
  telephone_portable,
  ville,
  adresse,
  secretariat,
  nb_secretariat,
  email,
  code_postal,
  type,
  dispo_max,
  onClick,
  onSubmit,
  currentMandataireModalTry,
  isOpen,
  onRequestClose,
  closebuttonmodal,
  formData}
) => (
  <Container>
    {currentMandataireModalTry && (
      <Container>
        <Row>
          <Col6>
            <Stylediv>
              <b>
                {prenom} {nom}
              </b>
              <br />
              {type.toUpperCase()}
              <br />
              <br />
              <b>Contact</b>
              <br />
              {prenom} {nom}
              <br />
              {telephone}
              <br />
              {telephone_portable}
              <br />
              <br />
              <b> Adresse</b>
              <br />
              {adresse}
              <br />
              {code_postal} <br />
              {ville}
              <br />
              <br />
              <b> Nombre de mesures souhaitées</b>
              <br />
              {dispo_max}
              <br />
              <br />
              <b> Secrétariat</b>
              <br />
              {secretariat} - {nb_secretariat} <br />
              <br />
              <button className={"btn btn-dark"} onClick={onClick}>
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
    modalIsOpen: false
  };

  onSubmit = ({ formData }) => {
    apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        telephone_portable: formData.telephone_portable,
        email: formData.email,
        adresse: formData.adresse,
        code_postal: formData.code_postal,
        ville: formData.ville,
        dispo_max: formData.dispo_max,
        secretariat: formData.secretariat,
        nb_secretariat: formData.nb_secretariat
      })
    }).then(json => {
      this.props.updateMadataire(json);
    });
    this.closeModal();
  };

  openModal = mandataire => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const {
      nom,
      prenom,
      telephone,
      telephone_portable,
      ville,
      adresse,
      secretariat,
      nb_secretariat,
      email,
      code_postal,
      dispo_max,
      type,
        id
    } = this.props.currentMandataireModal;

    const formData = {
      nom: `${nom}`,
      prenom: `${prenom}`,
      telephone: `${telephone}`,
      telephone_portable: `${telephone_portable}`,
      ville: `${ville}`,
      adresse: `${adresse}`,
      secretariat: `${secretariat}`,
      nb_secretariat: `${nb_secretariat}`,
      email: `${email}`,
      code_postal: `${code_postal}`,
      dispo_max: `${dispo_max}`
    };

    return (

      <FormulaireMandataireView
        currentMandataireModalTry={this.props.currentMandataireModal}
        nom={nom}
        prenom={prenom}
        telephone={telephone}
        telephone_portable={telephone_portable}
        ville={ville}
        adresse={adresse}
        secretariat={secretariat}
        nb_secretariat={nb_secretariat}
        email={email}
        code_postal={code_postal}
        dispo_max={dispo_max}
        type={type}
        onClick={this.openModal}
        onSubmit={this.onSubmit}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        closebuttonmodal={this.closeModal}
        formData={formData}
      />
    );
  }
}

export default FormulaireMandataire;
