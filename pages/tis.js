import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import styled from "styled-components";
import geolib from "geolib";
import dynamic from "next/dynamic";

import PanelFilterMandataires from "../src/components/PanelFilterMandataires";
import TableMandataire from "../src/components/TableMandataire";
import Navigation from "../src/components/Navigation";
import RowModal from "../src/components/RowModal";
import Footer from "../src/components/Footer";
import Commentaire from "../src/components/Commentaire";
import apiFetch from "../src/components/Api";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const OpenStreeMap = dynamic(import("../src/components/Map"), {
  ssr: false,
  loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
});

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

const stringMatch = (str, needle) => str.toLowerCase().indexOf(needle.toLowerCase()) !== -1;

// filter and sort list of mandataires
const filterMandataires = (mandataires, filters) => {
  let filteredMandataires = mandataires.filter(mandataire => {
    return (
      stringMatch(mandataire.type, filters.searchType) &&
      (stringMatch(mandataire.type, filters.searchTypeIn) &&
        stringMatch(mandataire.type, filters.searchTypePr) &&
        stringMatch(mandataire.type, filters.searchTypeSe)) &&
      stringMatch(mandataire.etablissement, filters.searchNom) &&
      stringMatch(mandataire.ville, filters.searchVille)
    );
  });

  filteredMandataires.sort((a, b) =>
    sortByDispo(a.dispo_max - a.disponibilite, b.dispo_max - b.disponibilite)
  );

  // add lat/lon
  if (filters.postcodeCoordinates) {
    filteredMandataires = geolib.orderByDistance(
      {
        latitude: filters.postcodeCoordinates[0],
        longitude: filters.postcodeCoordinates[1]
      },
      // add lat/lng properties to mandataires data so they can be sorted and returned as is
      filteredMandataires.map(mandataire => ({
        latitude: mandataire.latitude,
        longitude: mandataire.longitude,
        ...mandataire
      }))
    );
  }

  return filteredMandataires;
};

const filterMesures = (mesures, filters) =>
  mesures.filter(
    mesure =>
      stringMatch(mesure.type, filters.searchType) &&
      stringMatch(mesure.type, filters.searchTypeIn) &&
      stringMatch(mesure.type, filters.searchTypePr) &&
      stringMatch(mesure.type, filters.searchTypeSe) &&
      stringMatch(mesure.type, filters.searchVille)
  );

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

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

const ModalMandataire = ({ isOpen, closeModal, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    style={modalStyles}
    contentLabel="mandataire"
    background="#e9ecef"
    className="Modal"
    overlayClassName="Overlay"
  >
    <button onClick={closeModal}>X</button>
    {children}
  </Modal>
);

const TitleMandataire = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: bold;
`;

export const FicheMandataire = ({ style, mandataire }) => (
  <div className="container" style={style}>
    <div className="row">
      <div className="col-6">
        <TitleMandataire>{mandataire.etablissement}</TitleMandataire>
        <div>{mandataire.type.toUpperCase()}</div>
        <RowModal value={mandataire.adresse} />
        <div>
          {mandataire.code_postal} {mandataire.ville.toUpperCase()}
        </div>
        <br />
        <RowModal label="Contact" value={mandataire.referent} />
        <div>{mandataire.telephone}</div>
        <div>{mandataire.email}</div>
        <br />
        {<RowModal label="Tribunal Instance" value={mandataire.ti} />}
      </div>
      <div className="col-6">
        <div
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            borderBottom: "20px",
            lineHeight: "40px"
          }}
        >
          <div>
            Mesures en cours : {mandataire.disponibilite} / {mandataire.dispo_max}
          </div>
        </div>
        <br />
        <Commentaire currentMandataire={mandataire} />
      </div>
    </div>
  </div>
);

class Ti extends React.Component {
  state = {
    data: [],
    datamesure: [],
    searchType: "",
    searchTypeIn: "",
    searchTypePr: "",
    searchTypeSe: "",
    searchNom: "",
    searchVille: "",
    currentMandataire: "",
    modalIsOpen: false,
    postcodeCoordinates: "",
    specialite: ""
  };

  componentDidMount() {
    apiFetch("/mandataires").then(mandataires =>
      apiFetch("/mesures").then(mesures => {
        this.setState({
          data: mandataires,
          datamesure: mesures
        });
      })
    );
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
    const filteredMandataires = filterMandataires(
      this.state.data,
      {
        searchType: this.state.searchType,
        searchTypeIn: this.state.searchTypeIn,
        searchTypePr: this.state.searchTypePr,
        searchTypeSe: this.state.searchTypeSe,
        searchNom: this.state.searchNom,
        searchVille: this.state.searchVille,
        postcodeCoordinates: this.state.postcodeCoordinates,
        specialite: this.state.specialite
      },
      this.state.specialite
    );
    const filteredMesures = filterMesures(this.state.datamesure, {
      searchType: this.state.searchType,
      searchTypeIn: this.state.searchTypeIn,
      searchTypePr: this.state.searchTypePr,
      searchTypeSe: this.state.searchTypeSe,
      searchNom: this.state.searchNom,
      searchVille: this.state.searchVille
    });

    const mandatairesCount = filteredMandataires.length;

    return (
      <div>
        <PanelFilterMandataires
          findPostcode={this.findPostcode}
          updateFilters={this.updateFilters}
        />
        <OpenStreeMap
          mesure={filteredMesures}
          postcodeMandataire={this.state.postcodeCoordinates}
        />
        <div className="container">
          <Title>
            {mandatairesCount} Professionel{(mandatairesCount > 1 && "s") || null} référencé{(mandatairesCount > 1 && "s") || null}{" "}
          </Title>
          <TableMandataire rows={filteredMandataires} openModal={this.openModal} />
          <ModalMandataire isOpen={this.state.modalIsOpen} closeModal={this.closeModal}>
            {this.state.currentMandataire && (
              <FicheMandataire
                mandataire={this.state.currentMandataire}
                style={{ textAlign: "left" }}
              />
            )}
          </ModalMandataire>
        </div>
      </div>
    );
  }
}

const TiPage = () => (
  <div style={{ minHeight: "100%" }}>
    <Navigation logout />
    <Ti style={{ marginTop: 100 }} />
    <Footer />
  </div>
);

export default TiPage;
