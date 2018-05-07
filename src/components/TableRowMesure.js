import FaSearch from "react-icons/lib/fa/search";
import "../../static/css/custom.css";
import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.css";
import "../../static/css/hero.css";
import "../../static/css/panel.css";
import "../../static/css/footer.css";
import "../../node_modules/react-tabs/style/react-tabs.css";
import Form from "react-jsonschema-form";
import apiFetch from "./Api";
import ModalCloseMesure from "./ModalCloseMesure";
import Cell from "./Cell"

const schema = {
  title: "Se connecter",
  type: "object",
  required: [],
  properties: {
    date_ouverture: { type: "string", title: "date_ouverture", default: "" },
    code_postal: { type: "string", title: "code_postal", default: "" },
    genre: { type: "string", title: "genre", default: "" },
    age: { type: "string", title: "age", default: "" },
    ville: { type: "string", title: "ville", default: "" },
    status: { type: "string", title: "status", default: "" }
  }
};
const formData = {};

export const TableRowMesureView = ({
  date_ouverture,
  type,
  code_postal,
  ville,
  civilite,
  annee,
  openModal,
  isOpen,
  onRequestClose,
  onClick,
  onClickSubmit,
  onClickClose
}) => (
  <tr>
    <td
      style={{
        fontSize: "0.8em",
        color: "rgb(204, 204, 204)",
        textAlign: "left",
        lineHeight: "40px"
      }}
    >
      {date_ouverture.slice(0, 10)}
    </td>
    <Cell>
      <b>
        {code_postal} -{ville}{" "}
      </b>
    </Cell>
    <Cell>{type}</Cell>
    <Cell>{civilite} </Cell>
    <Cell>{annee} </Cell>
    <td>
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
    </td>
  </tr>
);

class TableRowMesure extends React.Component {
  state = {
    mesureId: "",
    modalIsOpen: false
  };

      onSubmit = ({ formData }) => {
          apiFetch(`/mandataires/1/mesures/${this.props.currentMesures.id}`, {
              method: "PUT",
              body: JSON.stringify({
                  date_ouverture: formData.date_ouverture,
                  code_postal: formData.code_postal,
                  type_mesure: formData.type_mesure,
                  genre: formData.genre,
                  age: formData.age,
                  status: formData.status
              })
          }).then(json => {
              this.props.updateMadataire(json);
          });
  };

  onClick = e => {
    apiFetch(`/mandataires/1/mesures/${e}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Eteindre mesure"
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
        this.props.updateMesure(json2); // callback parent with data
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };
  openModal = mandataire => {
    this.setState({ modalIsOpen: true, mesureId: mandataire });
  };
  closeModalAnnuler = () => {
    this.onClick(this.state.mesureId);
    this.closeModal();
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const {
      ville,
      type,
      nom,
      contact,
      code_postal,
      dispo_max,
      date_ouverture,
      type_mesure,
      genre,
      age,
      status,
      annee,
      civilite
    } = this.props.mesure;

    const formData = {
      date_ouverture: `${date_ouverture}`,
      code_postal: `${code_postal}`,
      genre: `${genre}`,
      age: `${age}`,
      ville: `${ville}`,
      status: `${status}`
    };

    return (
      <TableRowMesureView
        openModal={() => this.openModal(this.props.mesure.id)}
        date_ouverture={date_ouverture}
        code_postal={code_postal}
        ville={ville}
        civilite={civilite}
        annee={annee}
        type={type}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        onClick={this.closeModal}
        onClickSubmit={this.closeModalAnnuler}
        onClickClose={this.closeModal}
      />
    );
  }
}

export default TableRowMesure;
