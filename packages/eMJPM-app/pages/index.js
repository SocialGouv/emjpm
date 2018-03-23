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
import dynamic from 'next/dynamic'
// import { Map, Marker, Popup, TileLayer } from "react-leaflet-universal";
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
require("leaflet/dist/leaflet.css");
import "bootstrap/dist/css/bootstrap.css";
import "../static/css/hero.css";
import "../static/css/panel.css";
import "../static/css/footer.css";
import "../static/css/custom.css";


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

const MapSearch = dynamic(import('../src/components/Map'), {
    ssr: false,
    loading: () => (
        <div style={{textAlign: 'center', paddingTop: 20}}>
            Chargement…
        </div>
    )
});

// postCode => [lat, lon]
const getPostCodeCoordinates = postCode => {
    // return null if no input
    if (!postCode || !postCode.trim()) {
        return Promise.resolve(null);
    }
    return fetch(
        `https://api-adresse.data.gouv.fr/search/?q=postcode=${postCode}`
    )
        .then(response => response.json())
        .then(json => json.features[0].geometry.coordinates);
};

// filter and sort list of mandataires
const filterMandataires = (mandataires, filters) => {
    let filteredMandataires = mandataires.filter(mandataire => {
        if (filters.specialite === ""){
            return mandataire.properties.type
                    .toLowerCase()
                    .indexOf(filters.searchType.toLowerCase()) !== -1 &&
                (mandataire.properties.type
                    .toLowerCase()
                    .indexOf(filters.searchTypeIn.toLowerCase()) !== -1 &&
                mandataire.properties.type
                    .toLowerCase()
                    .indexOf(filters.searchTypePr.toLowerCase()) !== -1 &&
                mandataire.properties.type
                    .toLowerCase()
                    .indexOf(filters.searchTypeSe.toLowerCase()) !== -1) &&
                (mandataire.properties.contact
                    .toLowerCase()
                    .indexOf(filters.searchNom.toLowerCase()) !== -1 ||
                mandataire.properties.nom
                    .toLowerCase()
                    .indexOf(filters.searchNom.toLowerCase()) !== -1 ) &&
                mandataire.properties.ville
                    .toLowerCase()
                    .indexOf(filters.searchVille.toLowerCase()) !== -1
        }
        else {
           return mandataire.properties.type
                .toLowerCase()
                .indexOf(filters.searchType.toLowerCase()) !== -1 &&
               (mandataire.properties.type
                   .toLowerCase()
                   .indexOf(filters.searchTypeIn.toLowerCase()) !== -1 ||
               mandataire.properties.type
                   .toLowerCase()
                   .indexOf(filters.searchTypePr.toLowerCase()) !== -1 ||
               mandataire.properties.type
                   .toLowerCase()
                   .indexOf(filters.searchTypeSe.toLowerCase()) !== -1) &&
               (mandataire.properties.contact
                       .toLowerCase()
                       .indexOf(filters.searchNom.toLowerCase()) !== -1 ||
                   mandataire.properties.nom
                       .toLowerCase()
                       .indexOf(filters.searchNom.toLowerCase()) !== -1 ) &&
            mandataire.properties.ville
                .toLowerCase()
                .indexOf(filters.searchVille.toLowerCase()) !== -1 &&
            mandataire.properties.specialites
                .indexOf(filters.specialite) !== -1

        }
    });

    filteredMandataires.sort((a, b) =>
        sortByDispo(a.properties.dispo_max - a.properties.disponibilite , b.properties.dispo_max - b.properties.disponibilite)
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


const filterMesures = (mesures, filters) => {
    let filteredMesures = mesures.filter(mesure => {
            return mesure.properties.type
                    .toLowerCase()
                    .indexOf(filters.searchType.toLowerCase()) !== -1 &&
                (mesure.properties.type
                        .toLowerCase()
                        .indexOf(filters.searchTypeIn.toLowerCase()) !== -1 &&
                    mesure.properties.type
                        .toLowerCase()
                        .indexOf(filters.searchTypePr.toLowerCase()) !== -1 &&
                    mesure.properties.type
                        .toLowerCase()
                        .indexOf(filters.searchTypeSe.toLowerCase()) !== -1) &&
                    mesure.properties.nom
                        .toLowerCase()
                        .indexOf(filters.searchNom.toLowerCase()) !== -1  &&
                mesure.properties.ville
                    .toLowerCase()
                    .indexOf(filters.searchVille.toLowerCase()) !== -1

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

    componentDidMount() {
        const url = "/static/info.json";
        fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    data: json.features
                });
            });
        const urlmesure = "/static/mesures.json";
        fetch(urlmesure)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    datamesure: json.features
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
            searchTypeIn: this.state.searchTypeIn,
            searchTypePr: this.state.searchTypePr,
            searchTypeSe: this.state.searchTypeSe,
            searchNom: this.state.searchNom,
            searchVille: this.state.searchVille,
            postcodeCoordinates: this.state.postcodeCoordinates,
            specialite: this.state.specialite
        },this.state.specialite);

        const filteredMesures = filterMesures(this.state.datamesure, {
            searchType: this.state.searchType,
            searchTypeIn: this.state.searchTypeIn,
            searchTypePr: this.state.searchTypePr,
            searchTypeSe: this.state.searchTypeSe,
            searchNom: this.state.searchNom,
            searchVille: this.state.searchVille,
        });


console.log(this.state.datamesure)
        console.log(filteredMesures)
        console.log(filteredMandataires)
        const mandatairesCount = filteredMandataires.length;

        const currentMandataireModal = this.state.currentMandataire.properties;

        return (
            <div>
                <PanelGris
                    findPostcode={this.findPostcode}
                    updateFilters={this.updateFilters}
                    type={this.state.type}
                />
                < MapSearch
                    mesure = {filteredMesures}
                    postccodeMandataire = {this.state.postcodeCoordinates}
                />
                <br />
                <div className="container">
                    <div style={{ textAlign: "left", fontSize: "2em",padding: "15px" }}>
                        <b> {mandatairesCount} Professionels référencés </b>
                    </div>
                    <br />
                    <TableMandataire
                        rows={filteredMandataires}
                        updateFilters={this.updateFilters}
                        openModal={this.openModal}
                    />

                    <div >

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="mandataire"
                        background= "#e9ecef"
                        className="Modal"
                        overlayClassName="Overlay"

                    >
                        {this.state.currentMandataire && (
                            <div className="container" style={{marginTop: "30px"}}>
                                <div className="row">
                                    <div className="col-6">
                                        <b style={{ textAlign: "left",fontSize: "1.5em" }}>
                                            {this.state.currentMandataire.properties.nom}
                                        </b>
                                        <div style={{ textAlign: "left" }}>
                                            {currentMandataireModal.type.toUpperCase()}
                                        </div>
                                        <RowModal value={currentMandataireModal.adresse} />
                                        <div style={{ textAlign: "left" }}>
                                            {currentMandataireModal.codepostal}  {currentMandataireModal.ville.toUpperCase()}
                                        </div>
                                        <br />
                                        <RowModal
                                            label="Contact"
                                            value={currentMandataireModal.contact}
                                        />
                                        <div style={{ textAlign: "left" }}>
                                            {currentMandataireModal.tel}
                                        </div>
                                        <div style={{ textAlign: "left"}}>
                                            {currentMandataireModal.email}
                                        </div>
                                        <br />

                                        <RowModal
                                            label="Tribunal Instance"
                                            value={currentMandataireModal.ti}
                                        />
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
                                        <div className="greenrectangleModal" style={{verticalAlign: "middle",textAlign: "center", borderBottom: "20px", lineHeight: "40px"}} >
                                            <div>Mesures en cours : {currentMandataireModal.disponibilite} / {currentMandataireModal.dispo_max}</div>
                                        </div>
                                        <div style={{ fontSize: "0.8em", verticalAlign: "middle",display: "flex"}}>
                                            {currentMandataireModal.specialites.map(spe => (
                                                <div  style={{backgroundColor: "#b5b5b5",marginTop: "2px",padding: "4px",marginRight: "3px",color: "white"}} key = {spe}> {spe} </div>
                                            ))}
                                        </div>
                                        <br />
                                        <Commentaire />
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
