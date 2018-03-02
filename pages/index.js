import fetch from "isomorphic-fetch";
import TableRowMandataire from "../src/components/TableRowMandataire";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.css";
import TableMandataire from "../src/components/TableMandataire";
import CodePostalMandataire from "../src/components/CodePostalMandataire";
import Navigation from "../src/components/Navigation";
import geolib from "geolib";
import RowModal from "../src/components/RowModal";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
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

const sortByDispo = (a, b) => {
  const dispoA = parseInt(a, 10) || -Infinity;
  const dispoB = parseInt(b, 10) || -Infinity;
  if (dispoA < dispoB) {
    return 1;
  }
  if (dispoA > dispoB) {
    return -1;
  }
  // names must be equal
  return 0;
};

class Mandataires extends React.Component {
  state = {
    data: [],
    searchType: "",
    searchNom: "",
    searchVille: "",
    currentMandataire: "",
    modalIsOpen: false,
    postcodeData: ""
  };

  componentDidMount() {
    const url = "/static/info.json";
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json.features
        });
      });
  }

  openModal = mandataire => {
    this.setState({ modalIsOpen: true, currentMandataire: mandataire });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  updateFilters = filters => {
    this.setState(filters);
  };
  findPostcode = postcode => {
    const postUrl =
      "https://api-adresse.data.gouv.fr/search/?q=postcode=" +
      postcode.postcode.toString();
    return fetch(postUrl)
      .then(response => response.json())
      .then(json => {
        this.setState({
          postcodeData: json.features
        });
      });
  };

  render() {
    let filteredMandataires = this.state.data.filter(mandataire => {
      return (
        mandataire.properties.type
          .toLowerCase()
          .indexOf(this.state.searchType.toLowerCase()) !== -1 &&
        mandataire.properties.nom
          .toLowerCase()
          .indexOf(this.state.searchNom.toLowerCase()) !== -1 &&
        mandataire.properties.ville
          .toLowerCase()
          .indexOf(this.state.searchVille.toLowerCase()) !== -1
      );
    });
    filteredMandataires.sort((a, b) =>
      sortByDispo(a.properties.disponibilite, b.properties.disponibilite)
    );
    let s = [];
    if (!this.state.postcodeData) {
      s = filteredMandataires;
    } else {
      if (this.state.postcodeData.length) {
        const testGeolib = geolib.orderByDistance(
          {
            latitude: this.state.postcodeData[0].geometry.coordinates[0],
            longitude: this.state.postcodeData[0].geometry.coordinates[1]
          },
          filteredMandataires.map(mandataire => ({
            latitude: mandataire.geometry.coordinates[0],
            longitude: mandataire.geometry.coordinates[1],
            ...mandataire
          }))
        );
        s = testGeolib;
      } else {
        s = filteredMandataires;
      }
    }
    const currentMandataireModal = this.state.currentMandataire.properties;
    return (
      <div>
        <br />
        <div>
          <CodePostalMandataire findPostcode={this.findPostcode} />
        </div>
        <div className="container">
          <TableMandataire
            rows={s}
            updateFilters={this.updateFilters}
            openModal={this.openModal}
          />

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="mandataire"
          >
            {this.state.currentMandataire && (
              <div>
                <h2
                  style={{ textAlign: "center" }}
                  ref={subtitle => (this.subtitle = subtitle)}
                >
                  {this.state.currentMandataire.properties.nom}
                </h2>

                <RowModal label="Type:" value={currentMandataireModal.type} />
                <RowModal
                  label="Contact:"
                  value={currentMandataireModal.contact}
                />
                <RowModal
                  label="Adresse:"
                  value={currentMandataireModal.adresse}
                />
                <RowModal label="Type:" value={currentMandataireModal.type} />
                <RowModal label="Ville:" value={currentMandataireModal.ville} />
                <RowModal label="Tel:" value={currentMandataireModal.tel} />
                <RowModal label="Email:" value={currentMandataireModal.email} />
                <RowModal label="Ti:" value={currentMandataireModal.ti} />
                <br />
                <div style={{ align: "center" }}>
                  <button className={"btn btn-dark"} onClick={this.closeModal}>
                    close
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    );
  }
}

const App = () => (
  <div style={styles}>
    <Navigation />
    <Mandataires />
  </div>
);

export default App;
