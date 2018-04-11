import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import geolib from "geolib";
import TableMandataire from "../src/components/TableMandataire";
import Navigation from "../src/components/Navigation";
import RowModal from "../src/components/RowModal";
import ImageBandeau from "../src/components/ImageBandeau";
import PanelGris from "../src/components/PanelGris";
import Footer from "../src/components/Footer";
import Commentaire from "../src/components/Commentaire";
import dynamic from "next/dynamic";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet-universal";
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
require("leaflet/dist/leaflet.css");
import "bootstrap/dist/css/bootstrap.css";
import "../static/css/hero.css";
import "../static/css/panel.css";
import "../static/css/footer.css";
import "../static/css/custom.css";
// import { redirectIfNotAuthenticated, getJwt } from "../lib/auth";
// import { getUser, getCurrentUser } from "../services/userApi";

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

const MapSearch = dynamic(import("../src/components/Map"), {
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
    .then(json => json);
};

// filter and sort list of mandataires
const filterMandataires = (mandataires, filters) => {
  let filteredMandataires = mandataires.filter(mandataire => {
    if (filters.specialite === "") {
      return (
        mandataire.type.toLowerCase().indexOf(filters.searchType.toLowerCase()) !== -1 &&
        (mandataire.type.toLowerCase().indexOf(filters.searchTypeIn.toLowerCase()) !== -1 &&
          mandataire.type.toLowerCase().indexOf(filters.searchTypePr.toLowerCase()) !== -1 &&
          mandataire.type.toLowerCase().indexOf(filters.searchTypeSe.toLowerCase()) !== -1) &&
        (mandataire.referent.toLowerCase().indexOf(filters.searchNom.toLowerCase()) !== -1 ||
          mandataire.etablissement.toLowerCase().indexOf(filters.searchNom.toLowerCase()) !== -1) &&
        mandataire.ville.toLowerCase().indexOf(filters.searchVille.toLowerCase()) !== -1
      );
    } else {
      return (
        mandataire.type.toLowerCase().indexOf(filters.searchType.toLowerCase()) !== -1 &&
        (mandataire.type.toLowerCase().indexOf(filters.searchTypeIn.toLowerCase()) !== -1 ||
          mandataire.type.toLowerCase().indexOf(filters.searchTypePr.toLowerCase()) !== -1 ||
          mandataire.type.toLowerCase().indexOf(filters.searchTypeSe.toLowerCase()) !== -1) &&
        (mandataire.referent.toLowerCase().indexOf(filters.searchNom.toLowerCase()) !== -1 ||
          mandataire.etablissement.toLowerCase().indexOf(filters.searchNom.toLowerCase()) !== -1) &&
        mandataire.ville.toLowerCase().indexOf(filters.searchVille.toLowerCase()) !== -1 &&
        mandataire.specialites.indexOf(filters.specialite) !== -1
      );
    }
  });

  filteredMandataires.sort((a, b) =>
    sortByDispo(a.dispo_max - a.disponibilite, b.dispo_max - b.disponibilite)
  );

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

const filterMesures = (mesures, filters) => {
  let filteredMesures = mesures.filter(mesure => {
    return (
      mesure.type.toLowerCase().indexOf(filters.searchType.toLowerCase()) !== -1 &&
      (mesure.type.toLowerCase().indexOf(filters.searchTypeIn.toLowerCase()) !== -1 &&
        mesure.type.toLowerCase().indexOf(filters.searchTypePr.toLowerCase()) !== -1 &&
        mesure.type.toLowerCase().indexOf(filters.searchTypeSe.toLowerCase()) !== -1) &&
      mesure.nom.toLowerCase().indexOf(filters.searchNom.toLowerCase()) !== -1 &&
      mesure.ville.toLowerCase().indexOf(filters.searchVille.toLowerCase()) !== -1
    );
  });
  return filteredMesures;
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

const API_URL = process.env.API_URL;

class Mandataires extends React.Component {
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

  // static async getInitialProps(ctx) {
  //     // If it does not exist session, it gets redirected
  //     if (redirectIfNotAuthenticated(ctx)) {
  //         return {};
  //     }
  //
  //     const id = ctx.query && ctx.query.id;
  //     const jwt = getJwt(ctx);
  //     const res = await (id ? getUser(jwt, id) : getCurrentUser(jwt));
  //     return {
  //         user: res.data,
  //         authenticated: !!jwt,
  //         query: !!id
  //     };
  // }

  componentDidMount() {
    const url = `${API_URL}/api/v1/mandataires`;
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify({
      //   ti_id: 1
      // })
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        });
      });
    // const urlmesure = "/static/mesures.json";
    // fetch(urlmesure)
    //     .then(response => response.json())
    //     .then(json => {
    //         this.setState({
    //             datamesure: json
    //         });
    //     });
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
    console.log(this.state.data);
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

    const currentMandataireModal = this.state.currentMandataire;

    return (
      <div>
        <PanelGris
          findPostcode={this.findPostcode}
          updateFilters={this.updateFilters}
          type={this.state.type}
        />
        <MapSearch mesure={filteredMesures} postccodeMandataire={this.state.postcodeCoordinates} />
        <br />
        <div className="container">
          <div style={{ textAlign: "left", fontSize: "2em", padding: "15px" }}>
            <b> {mandatairesCount} Professionels référencés </b>
          </div>
          <br />
          <TableMandataire
            rows={filteredMandataires}
            updateFilters={this.updateFilters}
            openModal={this.openModal}
          />

          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="mandataire"
              background="#e9ecef"
              className="Modal"
              overlayClassName="Overlay"
            >
              {this.state.currentMandataire && (
                <div className="container" style={{ marginTop: "30px" }}>
                  <div className="row">
                    <div className="col-6">
                      <b style={{ textAlign: "left", fontSize: "1.5em" }}>
                        {this.state.currentMandataire.etablissement}
                      </b>
                      <div style={{ textAlign: "left" }}>
                        {currentMandataireModal.type.toUpperCase()}
                      </div>
                      <RowModal value={currentMandataireModal.adresse} />
                      <div style={{ textAlign: "left" }}>
                        {currentMandataireModal.code_postal}{" "}
                        {currentMandataireModal.ville.toUpperCase()}
                      </div>
                      <br />
                      <RowModal label="Contact" value={currentMandataireModal.referent} />
                      <div style={{ textAlign: "left" }}>{currentMandataireModal.telephone}</div>
                      <div style={{ textAlign: "left" }}>{currentMandataireModal.email}</div>
                      <br />

                      <RowModal label="Tribunal Instance" value={currentMandataireModal.ti} />
                      <br />
                      <div style={{ align: "center" }}>
                        {/*<button*/}
                        {/*className={"btn btn-dark"}*/}
                        {/*onClick={this.closeModal}*/}
                        {/*>*/}
                        {/*close*/}
                        {/*</button>*/}
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
                          Mesures en cours : {currentMandataireModal.disponibilite} /{" "}
                          {currentMandataireModal.dispo_max}
                        </div>
                      </div>
                      <br />
                      <Commentaire currentMandataire={this.state.currentMandataire} />
                    </div>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>

        <div>
          <Footer />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

const App = () => (
  <div style={styles}>
    <Navigation />
    <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
      <Mandataires />
    </div>
  </div>
);

export default App;
