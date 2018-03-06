import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import geolib from "geolib";

import TableMandataire from "../src/components/TableMandataire";
import CodePostalMandataire from "../src/components/CodePostalMandataire";
import Navigation from "../src/components/Navigation";
import RowModal from "../src/components/RowModal";

import "bootstrap/dist/css/bootstrap.css";

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

// postCode => [lat, lon]
const getPostCodeCoordinates = postCode => {
  // return null if no input
  if (!postCode || !postCode.trim()) {
    return Promise.resolve(null);
  }
  return fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${postCode}`)
    .then(response => response.json())
    .then(json => json.features[0].geometry.coordinates);
};

// filter and sort list of mandataires
const filterMandataires = (mandataires, filters) => {
  let filteredMandataires = mandataires.filter(mandataire => {
    return (
      mandataire.properties.type.toLowerCase().indexOf(filters.searchType.toLowerCase()) !== -1 &&
      mandataire.properties.nom.toLowerCase().indexOf(filters.searchNom.toLowerCase()) !== -1 &&
      mandataire.properties.ville.toLowerCase().indexOf(filters.searchVille.toLowerCase()) !== -1
    );
  });

  filteredMandataires.sort((a, b) =>
    sortByDispo(a.properties.disponibilite, b.properties.disponibilite)
  );

  if (filters.postcodeCoordinates) {
    filteredMandataires = geolib.orderByDistance(
      {
        latitude: filters.postcodeCoordinates[0],
        longitude: filters.postcodeCoordinates[1]
      },
      // add lat/lng properties to mandataires data so they can be sorted and returned as is
      filteredMandataires.map(mandataire => ({
        latitude: mandataire.geometry.coordinates[0],
        longitude: mandataire.geometry.coordinates[1],
        ...mandataire
      }))
    );
  }

  return filteredMandataires;
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
    postcodeCoordinates: ""
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
  findPostcode = postCode =>
    getPostCodeCoordinates(postCode).then(coordinates =>
      this.setState({
        postcodeCoordinates: coordinates
      })
    );

  render() {
    const filteredMandataires = filterMandataires(this.state.data, {
      searchType: this.state.searchType,
      searchNom: this.state.searchNom,
      searchVille: this.state.searchVille,
      postcodeCoordinates: this.state.postcodeCoordinates
    });

    const currentMandataireModal = this.state.currentMandataire.properties;

    return (
      <div>
        <CodePostalMandataire findPostcode={this.findPostcode} />
        <br />
        <div className="container">
          <TableMandataire
            rows={filteredMandataires}
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
                <h2 style={{ textAlign: "center" }}>
                  {this.state.currentMandataire.properties.nom}
                </h2>
                <RowModal label="Type:" value={currentMandataireModal.type} />
                <RowModal label="Contact:" value={currentMandataireModal.contact} />
                <RowModal label="Adresse:" value={currentMandataireModal.adresse} />
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
