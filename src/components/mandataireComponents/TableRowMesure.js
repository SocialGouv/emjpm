import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "../../../static/css/custom.css";
import "../../../static/css/hero.css";
import "../../../static/css/panel.css";
import "../../../static/css/footer.css";
import "../../../node_modules/react-tabs/style/react-tabs.css";
import apiFetch from "../communComponents/Api";
import ModalCloseMesure from "./ModalCloseMesure";
import Cell from "../communComponents/Cell";
import ModalMesure from "./ModalMesure";
import piwik from "../../piwik";

const TdStyle = styled.td`
  font-size: 1em;
  color: black;
  text-align: left;
  line-height: 40px;
  display: ${props => props.display};
`;

export const TableRowMesureView = ({
  date_ouverture,
  type,
  code_postal,
  ville,
  civilite,
  annee,
  extinction,
  openModal,
  isOpen,
  onRequestClose,
  onClick,
  onClickSubmit,
  onClickClose,
  display_ext,
  display,
  isOpenMesure,
  openModalMesure,
  onClickSubmitMesure,
  formData,
  onClickSubmitEteinte,
  display_row
}) => (
  <tr style={{ display: display_row }}>
    <TdStyle>{date_ouverture.slice(0, 10)}</TdStyle>
    <Cell>
      <b>
        {code_postal} -{ville.toUpperCase()}{" "}
      </b>
    </Cell>
    <Cell>{type}</Cell>
    <Cell>{civilite} </Cell>
    <Cell>{annee} </Cell>
    <TdStyle display={display}>
      {/*btn btn-outline-secondary*/}
      <button className={"btn btn-secondary"} onClick={openModalMesure}>
        Modifier
      </button>
      <ModalMesure
        isOpenMesure={isOpenMesure}
        onRequestClose={onRequestClose}
        onClick={onClick}
        onClickSubmitMesure={onClickSubmitMesure}
        onClickClose={onClickClose}
        formData={formData}
      />
    </TdStyle>
    <TdStyle display={display}>
      <button className={"btn btn-dark"} onClick={openModal}>
        Mettre fin au mandat
      </button>
      <ModalCloseMesure
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        onClick={onClick}
        onClickSubmit={onClickSubmit}
        onClickClose={onClickClose}
      />
    </TdStyle>
    <TdStyle display={display_ext}>{extinction && extinction.slice(0, 10)}</TdStyle>
    <TdStyle display={display_ext}>
      {/*btn btn-outline-secondary*/}
      <button className={"btn btn-success"} onClick={onClickSubmitEteinte}>
        Réactiver la mesure
      </button>
    </TdStyle>
  </tr>
);

class TableRowMesure extends React.Component {
  state = {
    mesureId: "",
    modalIsOpen: false,
    modalIsOpenMesure: false,
    showModal: false,
    showTD: false
  };

  onSubmit = ({ formData }) => {
    apiFetch(`/mandataires/1/mesures/${this.props.currentMesures.id}`, {
      method: "PUT",
      body: JSON.stringify({
        date_ouverture: formData.date_ouverture,
        code_postal: formData.code_postal,
        type_mesure: formData.type_mesure,
        genre: formData.genre,
        age: parseInt(formData.age),
        status: formData.status
      })
    }).then(json => {
      this.props.updateMadataire(json);
    });
  };

  onClick = (e, formData) => {
    console.log("formData ", formData);
    apiFetch(`/mandataires/1/mesures/${e}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Eteindre mesure",
        extinction: formData.extinction
        // longitude: this.state.postcodeCoordinates[0],
        // latitude: this.state.postcodeCoordinates[1],
      })
    })
      .then(json => {
        return apiFetch(`/mandataires/1/capacite`, {
          method: "PUT"
        }).then(() => {
          return json;
        });
      })
      .then(json2 => {
        this.closeModal();
        this.props.updateMesureEteinte(); // callback parent with data
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };

  onClickEteinte = e => {
    apiFetch(`/mandataires/1/mesures/${e}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Mesure en cours",
        extinction: null
        // longitude: this.state.postcodeCoordinates[0],
        // latitude: this.state.postcodeCoordinates[1],
      })
    })
      .then(json => {
        return apiFetch(`/mandataires/1/capacite`, {
          method: "PUT"
        }).then(() => {
          return json;
        });
      })
      .then(json2 => {
        this.props.updateMesureEteinte(); // callback parent with data
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };

  onClickMesure = (e, formData) => {
    apiFetch(`/mandataires/1/mesures/${e}`, {
      method: "PUT",
      body: JSON.stringify({
        date_ouverture: formData.ouverture,
        code_postal: formData.codePostal,
        type: formData.type,
        civilite: formData.civilite,
        annee: parseInt(formData.annee),
        residence: formData.residence,
        ville: formData.commune
        // longitude: this.state.postcodeCoordinates[0],
        // latitude: this.state.postcodeCoordinates[1],
      })
    })
      .then(json => {
        return apiFetch(`/mandataires/1/capacite`, {
          method: "PUT"
        }).then(() => {
          return json;
        });
      })
      .then(json2 => {
        this.closeModal();
        this.props.updateMesureEteinte(); // callback parent with data
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };

  openModal = ({ mandataire }) => {
    this.setState({ modalIsOpen: true, mesureId: mandataire });
  };

  handleOpenModal = mandataire => {
    this.setState({ modalIsOpenMesure: true, mesureId: mandataire });
  };

  closeModalAnnuler = ({ formData }) => {
    piwik.push(["trackEvent", "mesures", "Suppression d'une mesure"]);
    this.onClick(this.props.mesure.id, formData);
  };

  closeModalAnnulerMesure = ({ formData }) => {
    this.onClickMesure(this.props.mesure.id, formData);
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalIsOpenMesure: false });
  };

  showTr = mesure => {
    if (mesure.status === "Mesure en cours") {
      this.setState({ showTD: true });
    } else {
      this.setState({ showTD: false });
    }
  };

  render() {
    const {
      ville,
      type,
      residence,
      code_postal,
      date_ouverture,
      annee,
      civilite,
      extinction
    } = this.props.mesure;

    const formData = {
      ouverture: `${date_ouverture}`,
      codePostal: `${code_postal}`,
      civilite: `${civilite}`,
      annee: `${parseInt(annee)}`,
      commune: `${ville}`,
      residence: `${residence}`,
      type: `${type}`
    };

    return (
      <TableRowMesureView
        openModal={() => this.openModal(this.props.mesure.id)}
        openModalMesure={() => this.handleOpenModal(this.props.mesure.id)}
        date_ouverture={date_ouverture}
        code_postal={code_postal}
        ville={ville}
        formData={formData}
        civilite={civilite}
        annee={parseInt(annee)}
        type={type}
        residence={residence}
        extinction={extinction}
        display_ext={this.props.display_ext}
        display={this.props.display}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        onClick={this.closeModal}
        onClickSubmit={this.closeModalAnnuler}
        onClickClose={this.closeModal}
        isOpenMesure={this.state.modalIsOpenMesure}
        onClickSubmitMesure={this.closeModalAnnulerMesure}
        onClickSubmitEteinte={() => this.onClickEteinte(this.props.mesure.id)}
        display_row={this.state.showTD}
      />
    );
  }
}

export default TableRowMesure;
