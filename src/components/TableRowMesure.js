import FaSearch from "react-icons/lib/fa/search";
import "../../static/css/custom.css";
import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.css";
import "../../static/css/hero.css";
import "../../static/css/panel.css";
import "../../static/css/footer.css";
import "../../static/css/custom.css";
import "../../node_modules/react-tabs/style/react-tabs.css";
import Form from "react-jsonschema-form";
import apiFetch from "./Api";
// todo: improve tel parsing
const cleanTels = tel => {
  const tel2 = tel.replace(/[.-\s]/g, "");
  if (tel2.length > 10) {
    return [tel2.substring(0, 10), tel2.substring(10, 20), tel2.substring(20)].filter(Boolean);
  }
  return [tel2];
};

const Phone = ({ num }) => {
  return (
    <a href={`tel://${num}`} style={{ display: "block" }} title={`Téléphoner au ${num}`}>
      {num.substring(0, 2)} {num.substring(2, 4)} {num.substring(4, 6)} {num.substring(6, 8)}{" "}
      {num.substring(8, 10)}
    </a>
  );
};

const Cell = ({ style, title, children, value }) => (
  <td
    className={`pagination-centered ${colorMandatairesRetangle(value)}`}
    style={{ fontSize: "0.8em", textAlign: "left", ...style }}
    title={title}
  >
    <style jsx>{`
      td {
        vertical-align: middle !important;
        textalign: "left";
      }
    `}</style>
    {children}
  </td>
);

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
// const colorMatch =(disponibilite) => {
// if (isponibilite > 5 && disponibilite < 600)
//     if (disponibilite > 5 && disponibilite < 600)
//     '0-19'     : 'red',
//     '20-59'    : 'orange',
//     '60-100'   : 'green'
// };
const colorMandataires = value => {
  if (value && value < 1) {
    return "red";
  } else if (value && value > 5) {
    return "green";
  } else if (value && value < 6 && value > 0) {
    return "orange";
  } else {
    return "gris";
  }
};

const colorMandatairesRetangle = value => {
  if (value && value < 1) {
    return "redrectangle";
  } else if (value && value > 5) {
    return "greenrectangle";
  } else if (value && value < 6 && value > 0) {
    return "orangerectangle";
  }
};

const schema = {
  title: "Se connecter",
  type: "object",
  required: [],
  properties: {
    date_ouverture: { type: "string", title: "date_ouverture", default: "" },
    code_postal: { type: "string", title: "code_postal", default: "" },
    genre: { type: "string", title: "genre", default: "" },
    age: { type: "string", title: "age", default: "" },
    status: { type: "string", title: "status", default: "" }
  }
};
const formData = {};

class TableRowMesure extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMesure: "",
    mesureId: ""
  };

  onSubmit = ({ formData }) => {
    const url = `http://localhost:3005/api/v1/mesures/${this.props.currentMesures.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date_ouverture: formData.date_ouverture,
        code_postal: formData.code_postal,
        type_mesure: formData.type_mesure,
        genre: formData.genre,
        age: formData.age,
        status: formData.status
      })
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          datamesure: json
        });
      });
  };



    onClick = (e) => {
    apiFetch(`/mandataires/1/mesures/${e}`, {
        method: "PUT",
        body: JSON.stringify({
           status: "Eteindre mesure"
            // longitude: this.state.postcodeCoordinates[0],
            // latitude: this.state.postcodeCoordinates[1],
        })
    }).then(json => {
            return apiFetch(`/mandataires/1/capacite`, {
                method: "PUT"
            }).then(() => {
                return json
            })
        }).then(json2 => {
console.log(123);
            console.log(json2);
        this.props.updateMesure(json2);  // callback parent with data
        }).catch(e => {
            console.log(e)
            throw e
        })
    };
  openModal = mandataire => {
    this.setState({ modalIsOpen: true, mesureId: mandataire });
  };
  closeModalAnnuler = () => {
      this.onClick(this.state.mesureId);
      this.closeModal()
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
      status: `${status}`
    };

    return (
        <tr >
          <td
            className={`pagination-centered`}
            style={{
              fontSize: "0.8em",
              color: "rgb(204, 204, 204)",
              textAlign: "left",
                lineHeight: "40px"
            }}
          >
            {date_ouverture.slice(0,10)}
          </td>
          <Cell>
            <b>
              {code_postal} - {ville}{" "}
            </b>
          </Cell>
          <Cell>{type}</Cell>
          <Cell>{civilite} </Cell>
          <Cell>{annee} </Cell>
          <td>
              <button className={"btn btn-dark"} onClick={() => this.openModal(this.props.mesure.id)} >
                  Eteindre la mesure
              </button>
              {/*<DropdownMenu userName="Chris Smith">*/}
                  {/*<MenuItem text="Home" location="/home" />*/}
                  {/*<MenuItem text="Edit Profile" location="/profile" />*/}
                  {/*<MenuItem text="Change Password" location="/change-password" />*/}
                  {/*<MenuItem text="Privacy Settings" location="/privacy-settings" />*/}
                  {/*<MenuItem text="Delete Account" onClick={this.deleteAccount} />*/}
                  {/*<MenuItem text="Logout" onClick={this.logout} />*/}
              {/*</DropdownMenu>*/}
          </td>
          {/*<Cell>{cleanTels(tel).map(t => <Phone key={t} num={t} />)}</Cell>*/}
          {/*<Cell style={{ width: "10% !important" }} title="Voir les détails du mandataire">*/}
          {/*<FaSearch onClick={onClick} style={{ cursor: "pointer" }} />*/}
          {/*</Cell>*/}
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="mandataire"
                background="#e9ecef"
                className="ModalMesure"
                overlayClassName="Overlay"
            >
                <button onClick={this.closeModal}>X</button>
                <div style={{ textAlign: "center" }}>
                    <b>
                Eteindre la mesure? <br />

              Etes vous sur de vouloir eteind cette mesure
                    </b>
                    <br />
                <button type="submit" onClick={this.closeModalAnnuler} className="btn btn-success">
                    Valider
                </button>{" "}
                    <button onClick={this.closeModal} className="btn btn-success">
                        Annuler
                    </button>
                </div>
            </Modal>
          </tr>






    ) }
}

export default TableRowMesure;
